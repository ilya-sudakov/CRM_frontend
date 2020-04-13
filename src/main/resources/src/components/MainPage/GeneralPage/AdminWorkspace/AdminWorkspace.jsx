import React, { useEffect, useState } from 'react';
import './AdminWorkspace.scss';
// import XLSX from 'xlsx';
import { Notifications, WorkManagement } from '../../lazyImports.jsx';
import Chart from 'chart.js';
import { getRecordedWorkByDateRange } from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import { formatDateStringNoYear } from '../../../../utils/functions.jsx';
import TableLoading from '../../../../utils/TableView/TableLoading/TableLoading.jsx';

const AdminWorkspace = (props) => {
    const loadCanvas = (className) => {
        let canvas = document.createElement('canvas');
        let div = document.getElementsByClassName(className)[0];
        canvas.className = "admin-workspace__chart";
        canvas.id = "myChart";
        div.appendChild(canvas);
        setCanvasLoaded(true);
        // console.log(div);
    };

    const createGraph = (options) => {
        const ctx = document.getElementById('myChart').getContext('2d');
        return new Chart(ctx, options);
    };

    const lemz = "#1b4e6b";
    const lepsari = "#5c63a2";
    const ligovskiy = "#c068a8";
    const office = "#ec7176";
    const weekdays = [
        'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
    ]

    const [weekOffset, setWeekOffset] = useState(0);
    const [graph, setGraph] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [canvasLoaded, setCanvasLoaded] = useState(false);
    const [workshops, setWorkshops] = useState([
        {
            label: 'ЦехЛЭМЗ',
            backgroundColor: lemz,
            data: [],
            borderWidth: 1
        },
        {
            label: 'ЦехЛепсари',
            backgroundColor: lepsari,
            data: [],
            borderWidth: 1
        },
        {
            label: 'ЦехЛиговский',
            backgroundColor: ligovskiy,
            data: [],
            borderWidth: 1
        },
        {
            label: 'Офис',
            backgroundColor: office,
            data: [],
            borderWidth: 1
        }
    ]);

    useEffect(() => {
        const curDay = new Date(new Date().setDate(new Date().getDate() + (- 7 * weekOffset)));
        let week = [];
        for (let i = 1; i <= 7; i++) {
            let first = curDay.getDate() - curDay.getDay() + i
            let day = new Date(curDay.setDate(first))
            week.push(day)
        }
        // console.log(week);
        workshops.map((workshop, index) => {
            let temp = workshops;
            temp.splice(index, 1, {
                ...workshop,
                data: []
            })
        });
        setIsLoading(true);
        getRecordedWorkByDateRange(week[0].getDate(), week[0].getMonth() + 1, week[5].getDate(), week[5].getMonth() + 1)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                week.map(day => {
                    workshops.map((workshop, index) => {
                        let temp = workshops;
                        let oldData = workshop.data;
                        oldData.push(res.reduce((sum, cur) => {
                            if (workshop.label === cur.employee.workshop && new Date(day).getDate() === new Date(cur.year, cur.month + 1, cur.day).getDate()) {
                                return sum + cur.hours;
                            }
                            else return sum;
                        }, 0))
                        temp.splice(index, 1, {
                            ...workshop,
                            data: oldData
                        })
                    })
                })
                console.log(workshops);
                if (props.userHasAccess(['ROLE_ADMIN'])) {
                    !canvasLoaded && loadCanvas("admin-workspace__chart-wrapper");
                    const options = {
                        type: (window.innerWidth
                            || document.documentElement.clientWidth
                            || document.body.clientWidth) > 500 ? 'bar' : 'horizontalBar',
                        data: {
                            labels: [...week.map((day, index) => weekdays[index] + ' ' + formatDateStringNoYear(day))],
                            datasets: [...workshops],
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: (window.innerWidth
                                || document.documentElement.clientWidth
                                || document.body.clientWidth) > 500 ? true : false,
                            animation: {
                                easing: 'easeInOutCirc'
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Часы',
                                        fontStyle: 'italic'
                                    }
                                }],
                                xAxes: [{
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Дни недели',
                                        fontStyle: 'italic'
                                    }
                                }],
                            }
                        }
                    };
                    setTimeout(() => {
                        setIsLoading(false);
                        canvasLoaded && graph.destroy();
                        setGraph(createGraph(options));
                    }, 150)
                }
            })
    }, [weekOffset, workshops]);

    return (
        <div className="admin-workspace">
            <WorkManagement
                userHasAccess={props.userHasAccess}
            />
            {/* {props.userHasAccess(['ROLE_ADMIN']) && <Notifications
                userHasAccess={props.userHasAccess}
            />} */}
            {props.userHasAccess(['ROLE_ADMIN']) && <div className="admin-workspace__chart-wrapper">
                <TableLoading
                    isLoading={isLoading}
                />
                <div className="admin-workspace__header">
                    <button className="admin-workspace__button" onClick={(event) => {
                        event.preventDefault();
                        setWeekOffset(weekOffset + 1);
                    }}>Пред. неделя</button>
                    <div className="admin-workspace__title">Сводка за неделю</div>
                    <button className="admin-workspace__button" onClick={(event) => {
                        event.preventDefault();
                        setWeekOffset(0);
                    }}>Тек. неделя</button>
                </div>
            </div>}
            {/* <canvas id="myChart" className="admin-workspace__chart"></canvas> */}
        </div>
    );
};

export default AdminWorkspace;
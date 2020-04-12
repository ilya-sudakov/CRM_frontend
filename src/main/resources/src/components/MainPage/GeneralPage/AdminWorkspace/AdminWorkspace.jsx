import React, { useEffect, useState } from 'react';
import './AdminWorkspace.scss';
// import XLSX from 'xlsx';
import { Notifications, WorkManagement } from '../../lazyImports.jsx';
import Chart from 'chart.js';
import { getRecordedWorkByDateRange } from '../../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import { formatDateStringNoYear } from '../../../../utils/functions.jsx';

const AdminWorkspace = (props) => {
    const loadCanvas = (className) => {
        let canvas = document.createElement('canvas');
        let div = document.getElementsByClassName(className)[0];
        canvas.className = "admin-workspace__chart";
        canvas.id = "myChart";
        div.appendChild(canvas);
        console.log(div);
    };

    const createGraph = (options) => {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, options);
    };

    const lemz = "#1b4e6b";
    const lepsari = "#5c63a2";
    const ligovskiy = "#c068a8";
    const office = "#ec7176";

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
        //мб сделать за пред неделю
        const curDay = new Date();
        let week = [];
        let first = curDay.getDate() - curDay.getDay() + (curDay.getDay() === 0 ? -6 : 1);
        for (let i = 0; i <= 6; i++) {
            let day = new Date(curDay.setDate(first + i));
            week.push(day);
        };
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
                // console.log(workshops);
                if (props.userHasAccess(['ROLE_ADMIN'])) {
                    loadCanvas("admin-workspace__chart-wrapper");
                    const options = {
                        type: (window.innerWidth
                            || document.documentElement.clientWidth
                            || document.body.clientWidth) > 500 ? 'bar' : 'horizontalBar',
                        data: {
                            labels: [...week.map(day => formatDateStringNoYear(day))],
                            datasets: [...workshops],
                        },
                        options: {
                            responsive: true,
                            // maintainAspectRatio: false,
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
                        createGraph(options);
                    }, 150)
                }
            })
    }, []);

    return (
        <div className="admin-workspace">
            <WorkManagement
                userHasAccess={props.userHasAccess}
            />
            {/* {props.userHasAccess(['ROLE_ADMIN']) && <Notifications
                userHasAccess={props.userHasAccess}
            />} */}
            {props.userHasAccess(['ROLE_ADMIN']) && <div className="admin-workspace__chart-wrapper">
                <div className="admin-workspace__title">Сводка за неделю</div>
            </div>}
            {/* <canvas id="myChart" className="admin-workspace__chart"></canvas> */}
        </div>
    );
};

export default AdminWorkspace;
import React, { useEffect } from 'react';
import './AdminWorkspace.scss';
// import XLSX from 'xlsx';
import { Notifications, WorkManagement } from '../../lazyImports.jsx';
import Chart from 'chart.js';

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
    }

    const lemz = "#e76565";
    const lepsari = "#399639";
    const ligovskiy = "#28868a";
    const office = "#bdbd41";
    const testData = [
        {
            label: 'ЦехЛЭМЗ',
            data: [8, 19, 3, 5, 2, 3],
            backgroundColor: lemz,
            borderWidth: 1
        },
        {
            label: 'ЦехЛепсари',
            data: [12, 5, 3, 5, 2, 3],
            backgroundColor: lepsari,
            borderWidth: 1
        },
        {
            label: 'ЦехЛиговский',
            data: [6, 11, 3, 5, 2, 3],
            backgroundColor: ligovskiy,
            borderWidth: 1
        },
        {
            label: 'Офис',
            data: [7, 10, 3, 5, 2, 3],
            backgroundColor: office,
            borderWidth: 1
        },
    ];

    useEffect(() => {
        if (props.userHasAccess(['ROLE_ADMIN'])) {
            loadCanvas("admin-workspace__chart-wrapper");
            const options = {
                type: (window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth) > 500 ? 'bar' : 'horizontalBar',
                data: {
                    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    datasets: [...testData],
                },
                options: {
                    responsive: true,
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
            createGraph(options);
        }
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
                <div className="admin-workspace__title">Кол-во часов за неделю (Тест UI)</div>
            </div>}
            {/* <canvas id="myChart" className="admin-workspace__chart"></canvas> */}
        </div>
    );
};

export default AdminWorkspace;
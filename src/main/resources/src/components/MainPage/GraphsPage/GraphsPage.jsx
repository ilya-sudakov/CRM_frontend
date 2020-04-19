import React, { useEffect, useState } from 'react';
import './GraphsPage.scss';
import '../../../utils/MainWindow/MainWindow.scss';
import TableLoading from '../../../utils/TableView/TableLoading/TableLoading.jsx';
import Chart from 'chart.js';
import { getRecordedWorkByDateRange } from '../../../utils/RequestsAPI/WorkManaging/WorkControl.jsx';
import { formatDateStringNoYear } from '../../../utils/functions.jsx';
import { createGraph, loadCanvas } from '../../../utils/graphs.js';

const GraphsPage = (props) => {
    const lemz = "#1b4e6b";
    const lepsari = "#5c63a2";
    const ligovskiy = "#c068a8";
    const office = "#ec7176";
    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const [curWeek, setCurWeek] = useState([]);
    const [weekOffset, setWeekOffset] = useState(0);
    const [graph, setGraph] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [canvasLoaded, setCanvasLoaded] = useState(false);
    const [curGraph, setCurGraph] = useState('workControlWeeky');
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

    const loadWorkControl = (week, signal) => {
        getRecordedWorkByDateRange(week[0].getDate(), week[0].getMonth() + 1, week[6].getDate(), week[6].getMonth() + 1,
            signal)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                week.map(day => {
                    workshops.map((workshop, index) => {
                        let temp = workshops;
                        let oldData = workshop.data;
                        oldData.push(res.reduce((sum, cur) => {
                            if (workshop.label === cur.employee.workshop && new Date(day).getDate() === new Date(cur.year, cur.month + 1, cur.day).getDate()) {
                                return Math.ceil((sum + cur.hours) * 10) / 10;
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
                    !canvasLoaded && loadCanvas("graphs-page__chart-wrapper");
                    setCanvasLoaded(true);
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
                            tooltips: {
                                mode: 'index'
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
    }

    const loadProductAnalysis = (signal) => {
        !canvasLoaded && loadCanvas("graphs-page__chart-wrapper");
        setCanvasLoaded(true);
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
                tooltips: {
                    mode: 'index'
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


    useEffect(() => {
        let abortController = new AbortController();
        const curDay = new Date(new Date().setDate(new Date().getDate() + (- 7 * weekOffset)));
        let week = [];
        for (let i = 1; i <= 7; i++) {
            let first = curDay.getDate() - curDay.getDay() + i
            let day = new Date(curDay.setDate(first))
            week.push(day)
        }
        workshops.map((workshop, index) => {
            let temp = workshops;
            temp.splice(index, 1, {
                ...workshop,
                data: []
            })
        });
        setCurWeek(week);
        console.log(week);

        setIsLoading(true);
        switch (curGraph) {
            case 'workControlWeeky':
                loadWorkControl(week, abortController.signal);
                break;
            case 'productAnalysis':
                loadProductAnalysis(abortController.signal);
                break;
        }
        return function cancel() {
            abortController.abort();
        };
    }, [weekOffset, workshops, curGraph]);

    return (
        <div className="graphs-page">
            <div className="main-window">
                <div className="main-window__title">Графики</div>
                <div className="main-window__sort-panel">
                    <span>Выбрать график: </span>
                    <select onChange={(event) => {
                        setCurGraph(event.target.value);
                    }}>
                        <option value="workControlWeeky">Сводка за неделю</option>
                        {/* <option value="productAnalysis">Анализ продукции</option> */}
                    </select>
                </div>
                <div className="graphs-page__chart-wrapper">
                    <TableLoading
                        isLoading={isLoading}
                    />
                    <div className="graphs-page__header">
                        <div className="graphs-page__title">{curWeek.length > 0 && ('Отчет (' + formatDateStringNoYear(curWeek[0]) + ' - ' + formatDateStringNoYear(curWeek[6]) + ')')}</div>
                    </div>
                </div>
                <div className="main-window__control-panel">
                    <button className="main-window__button" onClick={(event) => {
                        event.preventDefault();
                        setWeekOffset(weekOffset + 1);
                    }}>Пред. неделя</button>
                    <button className="main-window__button" onClick={(event) => {
                        event.preventDefault();
                        setWeekOffset(0);
                    }}>Тек. неделя</button>
                </div>
            </div>
        </div>
    );
};

export default GraphsPage;
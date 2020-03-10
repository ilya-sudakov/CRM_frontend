import React, { useState, useEffect } from 'react';
import './TableView.scss';

const TableView = (props) => {

    useEffect(() => {
        props.setShowWindow && props.setShowWindow(false);
    }, [props.closeWindow])

    return (
        <div className="tableview-employees">

        </div>
    )
}

export default TableView;
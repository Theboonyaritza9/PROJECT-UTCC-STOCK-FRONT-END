import React from 'react'

// Components
import DescriptionHistory from '../../shared/components/UIElements/DescriptionHistory'
import TableHistoryBoard from '../components/TableHistoryBoard';

// CSS
import "./HistoryBoard.css";

function HistoryBoard() {
    return (
        <div className="Container-historyboard">
            <h1>ประวัติการเบิก/เพิ่มบอร์ด</h1>
            <TableHistoryBoard />
            <DescriptionHistory />
        </div>
    )
}

export default HistoryBoard

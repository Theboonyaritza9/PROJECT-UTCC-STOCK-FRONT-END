import React from 'react'
import DescriptionHistory from '../../shared/components/UIElements/DescriptionHistory'
import TableHistoryTool from '../components/TableHistoryTool'
import './HistoryTool.css'

function HistoryTool() {
    return (
        <div className="Container-historytool">
            <h1>ประวัติการเบิก/เพิ่มอุปกรณ์</h1>
            <TableHistoryTool />
            <DescriptionHistory />
        </div>
    )
}

export default HistoryTool

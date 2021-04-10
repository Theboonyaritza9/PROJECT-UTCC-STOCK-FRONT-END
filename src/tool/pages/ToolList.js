import React from 'react'
import TableTool from '../components/TableTool'

import "./ToolList.css"

function ToolList() {

    // Example 1

    const ex1 = (income, debt) => {
        let cal = income - debt
        let vat = cal - (cal * 0.007)
        return vat
    }

    const ex11 = (income) => {
        let vat = income - (income * 0.007)
        return vat
    }

    // console.log(ex1(10000, 1000))
    // console.log(ex11(20000))


    // Example 2

    // ค่าหาภาษี 7 %
    const calVat = (num) => {
        let cal = num - (num * 0.007)
        return cal
    }

    // คำนวณเงินต้นกับหนี้สิ้น
    const calMoneyAndDebt = (income, debt) => {
        return income - debt
    }

    const calIncome = (income) => {
        let sum = calVat(income)
        return sum
    }

    // let result = calMoneyAndDebt(10000, 1000)
    // console.log(calVat(result))

    // console.log(calVat(calMoneyAndDebt(10000, 1000)))

    // console.log(calIncome(10000))





    // Example 3
    const calVat1 = (num) => {
        let cal = num - (num * 0.007)
        return cal
    }
    // คำนวณเงินต้นกับหนี้สิ้น
    const calMoneyAndDebt2 = (income, debt, callback) => {
        let sum = income - debt;
        let result = callback(sum)
        // let result = sum - (sum * 0.07)
        return result
    }

    console.log(calMoneyAndDebt2(10000, 1000, calVat1))

    return (
        <div className="container-toollist">
            <h1>รายการอุปกรณ์</h1>
            <TableTool />
        </div>
    )
}

export default ToolList

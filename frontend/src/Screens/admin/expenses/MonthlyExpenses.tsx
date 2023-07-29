import React from 'react'
import { getExpensesPerMonth } from '../../../features/expenses/expenses_actions_creators'
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useEffect, useState } from 'react';
import Downloader from '../../../components/Downloader';
import { headingRow, descriptionRow } from '../../../components/ExcelMeta/MonthlyExpenses';
export default function MonthlyExpenses() {
    const dispatch = useAppDispatch();


    const today = new Date().toISOString().slice(0, 7);
    const [date, setDate] = useState(today)
    const month = (date.slice(5, 7)) //1
    const year = (today.slice(0, 4)) //2023 

    const [totalExpensesFirst, setTotalExpensesFirst] = useState(0);
    const [totalExpensesSecond, setTotalExpensesSecond] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);


    const { expensesPerMonth, loading, success } = useAppSelector(state => state.getExpensesPerMonth)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        dispatch(getExpensesPerMonth(year, month))

        calculateTotalExpenses()

    }

    const data = expensesPerMonth?.map((expense) => ({
        date: expense.date,
        attendance_first_time: expense.attendance_first_time,
        attendance_second_time: expense.attendance_second_time,
        total_attendances: expense.total_attendances,

        expenses_total: expense.expenses_total,
    }));
    // Custom headings and description


    const dataWithHeaders = [
        // Add the heading row
        headingRow,

        descriptionRow,


        [],
        // Heading row
        ['Date', 'First Time Attendances', "Second Time Attendances", "Total Attendances", 'Total Expenses'],
        // Original Data
        ...data.map((expense) => [
            expense.date,
            expense.attendance_first_time,
            expense.attendance_second_time,
            expense.total_attendances,

            expense.expenses_total,
        ]),
    ];
    useEffect(
        () => {
            dispatch(getExpensesPerMonth(year, month))
            success && calculateTotalExpenses()


        }, [date, year, month, success, dispatch])

    const calculateTotalExpenses = () => {
        let TotalExpensesFirst = expensesPerMonth?.reduce(function (acc: any, cur: any) {
            return acc + Number(cur.expenses_first_time)
        }, 0)

        setTotalExpensesFirst(TotalExpensesFirst)

        let TotalExpensesSecond = expensesPerMonth?.reduce(function (acc: any, cur: any) {
            return acc + Number(cur.expenses_second_time)
        }, 0)

        setTotalExpensesSecond(TotalExpensesSecond)

        let TotalExpenses = expensesPerMonth?.reduce(function (acc: any, cur: any) {
            return acc + Number(cur.expenses_total)
        }, 0)

        setTotalExpenses(TotalExpenses)

        console.log(TotalExpenses)


    }
    return (

        <div className='container'>

            <div >

                <div className="h1 text-center text-dark" id="expensesPageHeaderTitle">
                    Get Expenses of

                    <form className="form form-control" onSubmit={handleSubmit} >

                        <input type="month" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />


                        <button className="button " type="submit">Get</button>
                    </form>
                </div>

            </div >

            <Downloader tableData={dataWithHeaders} htmlInputId={`expensesPageHeaderTitle`} name={"Expenses-sheet"} />

            < div id="expensesPageHeaderTitle" >


                {loading ? (<Loader></Loader >) :

                    <table className="table table-striped table-hover">

                        <thead>

                            <tr>

                                <th scope="col">#</th>

                                <th scope="col">Date</th>

                                <th scope="col">Total Attendances First Time</th>
                                <th scope="col">Total Attendances Second Time</th>
                                <th scope="col">Total Attendances</th>

                                <th scope="col">Expenses First Time</th>
                                <th scope="col">Expenses Second Time</th>
                                <th scope="col">Expenses Total</th>
                            </tr>
                        </thead>


                        {expensesPerMonth?.map((item, index) => <tbody>

                            <tr key={item.id}>

                                <th scope="row">{index}</th>

                                <td>{item.date}</td>

                                <td>{item.attendance_first_time}</td>
                                <td>{item.attendance_second_time}</td>
                                <td>{item.total_attendances}</td>

                                <td>{item.expenses_first_time}</td>
                                <td>{item.expenses_second_time}</td>
                                <td>{item.expenses_total}</td>
                            </tr>
                        </tbody>)
                        }



                        <thead>

                            <tr>


                                <th scope="row">Total Expenses First Time</th>
                                <th scope="row">Total Expenses Second Time</th>
                                <th scope="row">Total Expenses </th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>


                                <td scope="row" > {totalExpensesFirst && totalExpensesFirst}</td>
                                <td scope="row" >{totalExpensesSecond && totalExpensesSecond}</td>
                                <td scope="row" >{totalExpenses && totalExpenses}</td>
                            </tr>

                        </tbody>
                    </table>
                }

            </div >




        </div >
    );
}

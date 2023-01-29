import React from 'react'
import { getExpensesPerMonth } from '../../../features/expenses/expenses_actions_creators'
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import ConvertToMonth from '../../../components/ConvertToMonth';
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useEffect, useState } from 'react';
import Downloader from '../../../components/Downloader';

export default function MonthlyExpenses() {
    const dispatch = useAppDispatch();
    const today = new Date().toISOString().slice(0, 7);
    const [date, setDate] = useState(today)


    const month = Number(date.slice(5, 7)) //1
    const year = Number(today.slice(0, 4)) //2023

    const [totalExpensesFirst, setTotalExpensesFirst] = useState(0);
    const [totalExpensesSecond, setTotalExpensesSecond] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);


    const { expensesPerMonth, loading, success } = useAppSelector(state => state.getExpensesPerMonth)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        dispatch(getExpensesPerMonth(year, month))

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

    useEffect(
        () => {
            dispatch(getExpensesPerMonth(year, month))

            console.log(today)
        }, [date])

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

            <Downloader htmlInputId={`expensesPageHeaderTitle`} name={"Expenses-sheet"} />

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


                        {expensesPerMonth?.map((item: any) => <tbody>

                            <tr key={item.id}>

                                <th scope="row">{item.id}</th>

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


                                <td scope="row" >{totalExpensesFirst}</td>
                                <td scope="row" >{totalExpensesSecond}</td>
                                <td scope="row" >{totalExpenses}</td>
                            </tr>

                        </tbody>
                    </table>
                }

            </div >




        </div >
    );
}

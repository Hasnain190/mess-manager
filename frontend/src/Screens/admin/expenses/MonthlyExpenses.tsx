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
    const today = new Date().toISOString().substring(0, 7);




    const { expensesPerMonth, loading, success } = useAppSelector(state => state.getExpensesPerMonth)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        dispatch(getExpensesPerMonth(date.substring(5, 7)))

        let TotalExpenses = expensesPerMonth?.reduce(function (acc: any, cur: any) {
            return acc + cur.expenses_per_day
        }, 0)

        setTotalExpenses(TotalExpenses)

        console.log(TotalExpenses)
    }
    const [date, setDate] = useState(today)
    const [totalExpenses, setTotalExpenses] = useState();

    useEffect(
        () => {
            dispatch(getExpensesPerMonth(date.substring(5, 7)))

            console.log(today)
        }, [date, expensesPerMonth])

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

                                <th scope="col">Total Attendances</th>

                                <th scope="col">Expenses(PKR)</th>
                            </tr>
                        </thead>


                        {expensesPerMonth?.map((item: any) => <tbody>

                            <tr key={item.id}>

                                <th scope="row">{item.id}</th>

                                <td>{item.date}</td>

                                <td>{item.total_attendances}</td>

                                <td>{item.expenses_per_day}</td>
                            </tr>
                        </tbody>)}



                        <thead>

                            <tr>


                                <th scope="row">Total Expenses</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>


                                <td scope="row" >{totalExpenses}</td>
                            </tr>

                        </tbody>
                    </table>
                }

            </div >




        </div >
    );
}

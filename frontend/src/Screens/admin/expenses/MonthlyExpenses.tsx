import React from 'react'
import { getExpensesPerMonth } from '../../../actions/expenses_actions'
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import ConvertToMonth from '../../../components/ConvertToMonth';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import Downloader from '../../../components/Downloader';

export default function MonthlyExpenses() {
    const dispatch = useDispatch();
    const today = new Date().toISOString().substring(0, 7);


    useEffect(
        () => {
            dispatch(getExpensesPerMonth(date.substring(5, 7)))

            console.log(today)
            // @ts-expect-error TS(2448): Block-scoped variable 'date' used before its decla... Remove this comment to see the full error message
        }, [date, expensesPerMonth])


    // @ts-expect-error TS(2339): Property 'getExpensesPerMonth' does not exist on t... Remove this comment to see the full error message
    const { expensesPerMonth, loading, success } = useSelector(state => state.getExpensesPerMonth)

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

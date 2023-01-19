import React from 'react'
import { getExpensesPerMonth } from '../../../actions/expenses_actions'
// @ts-expect-error TS(6142): Module '../../../components/Loader' was resolved t... Remove this comment to see the full error message
import Loader from "../../../components/Loader";
// @ts-expect-error TS(6142): Module '../../../components/Message' was resolved ... Remove this comment to see the full error message
import Message from "../../../components/Message";
// @ts-expect-error TS(6142): Module '../../../components/ConvertToMonth' was re... Remove this comment to see the full error message
import ConvertToMonth from '../../../components/ConvertToMonth';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
// @ts-expect-error TS(6142): Module '../../../components/Downloader' was resolv... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className='container'>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div >
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div class="h1 text-center text-dark" id="expensesPageHeaderTitle">
                    Get Expenses of



                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <form className="form form-control" onSubmit={handleSubmit} >
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <input type="month" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />

                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <button className="button " type="submit">Get</button>
                    </form>
                </div>

            </div >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Downloader htmlInputId={`expensesPageHeaderTitle`} name={"Expenses-sheet"} />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            < div id="expensesPageHeaderTitle" >

                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                {loading ? (<Loader></Loader >) :
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <table class="table table-striped table-hover">
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <thead>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <tr>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <th scope="col">#</th>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <th scope="col">Date</th>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <th scope="col">Total Attendances</th>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <th scope="col">Expenses(PKR)</th>
                            </tr>
                        </thead>

                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        {expensesPerMonth?.map((item: any) => <tbody>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <tr key={item.id}>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <th scope="row">{item.id}</th>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <td>{item.date}</td>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <td>{item.total_attendances}</td>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <td>{item.expenses_per_day}</td>
                            </tr>
                        </tbody>)}


                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <thead>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <tr>

                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <th scope="row">Total Expenses</th>
                            </tr>
                        </thead>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <tbody>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <tr>

                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <td scope="row" >{totalExpenses}</td>
                            </tr>

                        </tbody>
                    </table>
                }

            </div >




        </div >
    );
}

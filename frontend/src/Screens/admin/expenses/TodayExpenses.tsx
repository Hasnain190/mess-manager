// for this month bill
import React, { useEffect, useState } from "react";
import { counter } from "../../../components/counter"

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getDailyAttendance } from '../../../features/attendance/attendance_actions_creators'
import { addExpenses } from '../../../features/expenses/expenses_actions_creators'
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";


function TodayExpenses() {
    const dispatch = useAppDispatch()

    const [todayExpensesFirst, setTodayExpensesFirst] = useState(0)
    const [todayExpensesSecond, setTodayExpensesSecond] = useState(0)

    const [todayExpenses, setTodayExpenses] = useState(todayExpensesFirst + todayExpensesSecond)

    const { attendance: getAttendanceLi, error: getAttendanceError, loading: getAttendanceLoading } = useAppSelector(state => state.getDailyAttendance)

    const { success: successExpenses, error: errorExpenses } = useAppSelector(state => state.addExpenses)
    const submitHandler = (e: any) => {
        e.preventDefault();

        let expenses = {
            date: date,
            attendance_first_time: countFirstTimePrs ? countFirstTimePrs : 1,
            attendance_second_time: countSecondTimePrs ? countSecondTimePrs : 1,
            total_attendances: (countFirstTimePrs + countSecondTimePrs),
            expenses_first_time: todayExpensesFirst,
            expenses_second_time: todayExpensesSecond,
            expenses_total: (todayExpensesFirst + todayExpensesSecond)


        }
        dispatch(addExpenses(expenses))
        console.log(todayExpenses)
    }



    const today = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState(today)
    const {
        countFirstTimePrs,
        countSecondTimePrs,

    } = counter(getAttendanceLi, date)
    console.log({ getAttendanceLi, date })
    console.log(counter(getAttendanceLi, date))

    const [message, setMessage] = useState('')


    // const expensePerAttendance = (todayExpenses / count).toFixed(2);
    useEffect(() => { setTodayExpenses(todayExpensesFirst + todayExpensesSecond) }, [todayExpensesFirst, todayExpensesSecond])


    useEffect(() => {
        dispatch(getDailyAttendance(today));

        if (successExpenses) {
            setMessage("The expense is added successfully")
            // empty all the inputs
            setTodayExpensesFirst(0)
            setTodayExpensesSecond(0)
            setTodayExpenses(0)
        }

        if (errorExpenses) {
            setMessage(String(errorExpenses))
        }

    }, [date, errorExpenses, successExpenses])
    return (

        <div className="container">

            {getAttendanceLoading ? (

                <Loader />
            ) : errorExpenses ? (

                <Message variant="danger">{errorExpenses}</Message>
            ) : (
                <>
                    <div className="h1 text-center text-dark" id="pageHeaderTitle">

                        Enter <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />'s Expenses
                    </div><div className="row">
                        {successExpenses && <Message variant="success">{Message}</Message>}
                        <div className="col-md-6 mx-auto">

                            <div className="card card-body">

                                <h1>Today's Expenses</h1>
                                <form onSubmit={submitHandler}>


                                    <div className="form-group">

                                        <label htmlFor="name">First Time:</label>

                                        <input
                                            type="number"
                                            className="form-group"
                                            id="first_time"
                                            placeholder="Enter value"
                                            value={todayExpensesFirst}
                                            onChange={(e) => setTodayExpensesFirst(Number(e.target.value))} />
                                    </div>
                                    <div className="form-group">

                                        <label htmlFor="name">Second Time Expenses:</label>

                                        <input
                                            type="number"
                                            className="form-group"
                                            id="second_time"
                                            placeholder="Enter value"
                                            value={todayExpensesSecond}
                                            onChange={(e) => setTodayExpensesSecond(Number(e.target.value))} />
                                    </div>

                                    <div className="form-group">

                                        <label htmlFor="name">Total Expenses:</label>

                                        <input

                                            className="form-group"
                                            id="total"
                                            value={todayExpenses}
                                        />
                                    </div>



                                    <ul className="list-group list-group-flush">

                                        <label className="list-group-item  card-header">Total Attendances For First Time</label>

                                        <li className="list-group-item">{countFirstTimePrs}</li>

                                        <label className="list-group-item  card-header">Total Attendances For Second Time</label>

                                        <li className="list-group-item">{countSecondTimePrs}</li>


                                    </ul>


                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>



                                </form>

                            </div>

                        </div>

                    </div></>
            )}
        </div>
    );
}

export default TodayExpenses;

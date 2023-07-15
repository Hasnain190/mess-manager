
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

    const [todayExpenses, setTodayExpenses] = useState(0)

    const { attendance: getAttendanceLi, error: getAttendanceError, loading: getAttendanceLoading } = useAppSelector(state => state.getDailyAttendance)

    const { success: successExpenses, error: errorExpenses } = useAppSelector(state => state.addExpenses)



    const submitHandler = (e: any) => {
        e.preventDefault();


        if ((countFirstTimePrs !== 0 && countSecondTimePrs !== 0) && todayExpensesFirst !== 0) {
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
        } else {

            setMessage("No attendance today or some other error")

        }

    }




    const today = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState(today)
    const {
        countFirstTimePrs,
        countSecondTimePrs,

    } = counter(getAttendanceLi, date)


    const [message, setMessage] = useState('')
    // factor
    const [factor, setFactor] = useState(0.6)

    // const expensePerAttendance = (todayExpenses / count).toFixed(2);
    useEffect(() => {
        setTodayExpensesFirst(parseFloat((todayExpenses * factor).toFixed(2))); setTodayExpensesSecond(parseFloat((todayExpenses * (1 - factor)).toFixed(2)))
        setMessage("")
    }, [todayExpenses, factor, message])


    useEffect(() => {
        dispatch(getDailyAttendance(date));

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

    }, [date, errorExpenses, successExpenses, message])
    return (

        <div className="container">

            {getAttendanceLoading ? (

                <Loader />
            ) : errorExpenses ? (

                <Message variant="danger">{errorExpenses}</Message>
            ) : (
                <>
                    <div className="h1 text-center text-dark" id="pageHeaderTitle">

                        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} /> Expenses
                    </div><div className="row">
                        {message && <Message variant="success">{message}</Message>}
                        {/* {successExpenses && <Message variant="success">{message}</Message>} */}
                        <div className="col-md-6 mx-auto">

                            <div className="card card-body">

                                <h1>Set Expenses</h1>
                                <form onSubmit={submitHandler}>

                                    <div className="form-group">

                                        <label htmlFor="name">Total Expenses:</label>

                                        <input

                                            className="form-group"
                                            id="total"
                                            value={todayExpenses}
                                            onChange={(e) => setTodayExpenses(Number(e.target.value))}
                                            required
                                            min={1}
                                        />
                                    </div>

                                    <div className="form-group">

                                        <label htmlFor="name">Set Factor For First Time</label>

                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="any"

                                            list="markers"
                                            className="form-group"
                                            id="total"
                                            value={factor}

                                            onChange={(e) => setFactor(parseFloat(Number(e.target.value).toFixed(2)))}
                                        />
                                        <span>{factor}</span>

                                        <datalist id="markers">
                                            <option value="0" label="0">0</option>
                                            <option value="0.25" label="1/4">1/4</option>
                                            <option value="0.33" label="1/3">1/3</option>
                                            <option value="0.5" label="1/2">1/2</option>
                                            <option value="0.6" label="2/3">2/3</option>
                                            <option value="1" label="1">1</option>
                                        </datalist>
                                    </div>


                                    <ul className="list-group list-group-flush">

                                        <label htmlFor="name">First Time:</label>

                                        <li className="list-group-item card-header"
                                            id="first_time"
                                        >{todayExpensesFirst}</li>


                                        <label htmlFor="name">Second Time Expenses:</label>

                                        <li
                                            className="list-group-item card-header"
                                            id="second_time"

                                        >{todayExpensesSecond}</li>
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

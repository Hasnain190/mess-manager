// for this month bill
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { counter } from "../../../components/counter"

import { useDispatch, useSelector } from "react-redux";
import { getAttendance } from '../../../actions/attendance_actions'
import { addExpenses } from '../../../actions/expenses_actions'
// @ts-expect-error TS(6142): Module '../../../components/Message' was resolved ... Remove this comment to see the full error message
import Message from "../../../components/Message";
// @ts-expect-error TS(6142): Module '../../../components/Loader' was resolved t... Remove this comment to see the full error message
import Loader from "../../../components/Loader";


function TodayExpenses() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAttendance());

        if (errorExpenses) {
            setMessage(errorExpenses)
        }
        if (successExpenses) {
            // @ts-expect-error TS(2345): Argument of type '"The expense is added successful... Remove this comment to see the full error message
            setMessage("The expense is added successfully")
        }

    // @ts-expect-error TS(2448): Block-scoped variable 'date' used before its decla... Remove this comment to see the full error message
    }, [date, getAttendanceObj, errorExpenses, successExpenses])

    const [todayExpenses, setTodayExpenses] = useState(0)
    // @ts-expect-error TS(2339): Property 'getAttendance' does not exist on type 'D... Remove this comment to see the full error message
    const { attendance: getAttendanceObj, error: getAttendanceError, loading: getAttendanceLoading } = useSelector(state => state.getAttendance)

    // @ts-expect-error TS(2339): Property 'addExpenses' does not exist on type 'Def... Remove this comment to see the full error message
    const { success: successExpenses, error: errorExpenses } = useSelector(state => state.addExpenses)
    const submitHandler = (e: any) => {
        e.preventDefault();

        let expenses = {
            date: date,
            total_attendances: count,
            expenses_per_day: todayExpenses,
            expenses_per_attendance: expensePerAttendance,
        }
        dispatch(addExpenses(expenses))

        console.log(todayExpenses)
    }



    const today = new Date().toISOString().substr(0, 10);
    const [date, setDate] = useState(today)
    const count = counter(getAttendanceObj, date)
    const [message, setMessage] = useState()



    const expensePerAttendance = (todayExpenses / count).toFixed(2);
    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="container">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            {message ? (<Message >{message}</Message>) : null}

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div class="h1 text-center text-dark" id="pageHeaderTitle">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                Enter <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />'s Expenses
            </div>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="row">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="col-md-6 mx-auto">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className="card card-body">

                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <form onSubmit={submitHandler}>


                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <label htmlFor="name">Today's Expenses:</label>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <input
                                type="number"
                                className="form-group"
                                id="name"
                                placeholder="Enter value"
                                value={todayExpenses}
                                // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                                onChange={(e) => setTodayExpenses(e.target.value)}
                            />

                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <ul class="list-group list-group-flush">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <label class="list-group-item  card-header">Total Attendances</label>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <li class="list-group-item">{count}</li>

                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <label class="list-group-item  card-header">Expense Per Attendance</label>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <li class="list-group-item">{expensePerAttendance}</li>
                            </ul>

                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>



                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodayExpenses;

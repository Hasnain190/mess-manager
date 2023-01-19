// for this month bill
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { counter } from "../../../components/counter"

import { useDispatch, useSelector } from "react-redux";
import { getAttendance } from '../../../actions/attendance_actions'
import { addExpenses } from '../../../actions/expenses_actions'
import Message from "../../../components/Message";
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

        <div className="container">

            {message ? (<Message >{message}</Message>) : null}


            <div className="h1 text-center text-dark" id="pageHeaderTitle">

                Enter <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />'s Expenses
            </div>

            <div className="row">

                <div className="col-md-6 mx-auto">

                    <div className="card card-body">


                        <form onSubmit={submitHandler}>



                            <label htmlFor="name">Today's Expenses:</label>

                            <input
                                type="number"
                                className="form-group"
                                id="name"
                                placeholder="Enter value"
                                value={todayExpenses}
                                // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                                onChange={(e) => setTodayExpenses(e.target.value)}
                            />


                            <ul className="list-group list-group-flush">

                                <label className="list-group-item  card-header">Total Attendances</label>

                                <li className="list-group-item">{count}</li>


                                <label className="list-group-item  card-header">Expense Per Attendance</label>

                                <li className="list-group-item">{expensePerAttendance}</li>
                            </ul>


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

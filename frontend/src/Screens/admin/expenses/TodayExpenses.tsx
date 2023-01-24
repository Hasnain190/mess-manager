// for this month bill
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { counter } from "../../../components/counter"

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getAttendance } from '../../../features/attendance/attendance_actions_creators'
import { addExpenses } from '../../../features/expenses/expenses_actions_creators'
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";


function TodayExpenses() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const [todayExpenses, setTodayExpenses] = useState(0)
    const { attendance: getAttendanceObj, error: getAttendanceError, loading: getAttendanceLoading } = useAppSelector(state => state.getAttendance)

    const { success: successExpenses, error: errorExpenses } = useAppSelector(state => state.addExpenses)
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
    const [message, setMessage] = useState('')



    const expensePerAttendance = (todayExpenses / count).toFixed(2);

    useEffect(() => {
        dispatch(getAttendance());

        if (errorExpenses) {
            setMessage(errorExpenses)
        }
        if (successExpenses) {
            setMessage("The expense is added successfully")
        }

    }, [date, getAttendanceObj, errorExpenses, successExpenses])
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
                                onChange={(e) => setTodayExpenses(Number(e.target.value))}
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

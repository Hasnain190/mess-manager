// for this month bill
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { counter } from "../../components/counter"

import { useDispatch, useSelector } from "react-redux";
import { getAttendance } from '../../actions/attendance_actions'
function TodayExpenses() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAttendance());
    }, [date, getAttendanceObj])

    const [todayExpenses, setTodayExpenses] = useState(0)
    const { attendance: getAttendanceObj, error: getAttendanceError, loading: getAttendanceLoading } = useSelector(state => state.getAttendance)

    const submitHandler = () => {
        console.log(todayExpenses)
    }

    const totalAttendance = 50

    const today = new Date().toISOString().substr(0, 10);
    const [date, setDate] = useState(today)
    const count = counter(getAttendanceObj, date)


    const expensePerCapita = todayExpenses / count;
    return (
        <div className="container">
            <div class="h1 text-center text-dark" id="pageHeaderTitle">
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
                                onChange={(e) => setTodayExpenses(e.target.value)}
                            />

                            <ul class="list-group list-group-flush">
                                <label class="list-group-item  card-header">Total Attendances</label>
                                <li class="list-group-item">{count}</li>
                                <label class="list-group-item  card-header">Total Users Present</label>
                                <li class="list-group-item">{totalAttendance}</li>
                                <label class="list-group-item  card-header">Expense Per Capita</label>
                                <li class="list-group-item">{expensePerCapita}</li>
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

// for this month bill
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { counter } from "../../../components/counter"

import { useDispatch, useSelector } from "react-redux";
import { getAttendance } from '../../../actions/attendance_actions'
import { addExpenses } from '../../../actions/expenses_actions'

function TodayExpenses() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAttendance());
        if (success) {
            navigate('admin/expenses/monthly')
        }

    }, [date, getAttendanceObj, dispatch])

    const [todayExpenses, setTodayExpenses] = useState(0)
    const { attendance: getAttendanceObj, error: getAttendanceError, loading: getAttendanceLoading } = useSelector(state => state.getAttendance)

    const { success } = useSelector(state => state.addExpenses)
    const submitHandler = (e) => {
        e.preventDefault();

        // let expenses = {

        //     date: date,
        //     total_attendances: count,
        //     expenses_per_day: todayExpenses,
        //     expenses_per_capita: expensePerCapita,


        // }
        try {

            dispatch(addExpenses({

                date: date,
                total_attendances: count,
                expenses_per_day: todayExpenses,
                expenses_per_capita: expensePerCapita,


            }))
            console.log(todayExpenses)
        } catch (error) {
            console.log(error)
        }


    }



    const today = new Date().toISOString().substr(0, 10);
    const [date, setDate] = useState(today)
    const count = counter(getAttendanceObj, date)


    const expensePerCapita = (todayExpenses / count).toFixed(2);
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

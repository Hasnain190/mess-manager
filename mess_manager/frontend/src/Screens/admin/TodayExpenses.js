// for this month bill
import React, { useState } from "react";
import { Link } from "react-router-dom";

function TodayExpenses() {

    const [todayExpenses, setTodayExpenses] = useState(3222)

    const submitHandler = () => {
        console.log(todayExpenses)
    }

    const totalAttendance = 50


    const expensePerCapita = todayExpenses / totalAttendance

    return (
        <div className="container">
            <div class="h1 text-center text-dark" id="pageHeaderTitle">
                Enter Today's Expenses
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

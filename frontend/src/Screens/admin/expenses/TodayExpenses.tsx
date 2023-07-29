
import React, { useEffect, useState } from "react";
import { counter } from "../../../components/counter"

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getDailyAttendance, getFirstAndSecond } from '../../../features/attendance/attendance_actions_creators'
import { addExpenses } from '../../../features/expenses/expenses_actions_creators'
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { getSum } from "../../../features/expenses/expenses_actions_creators";
import { useSelector } from "react-redux";

function TodayExpenses() {
    const dispatch = useAppDispatch()


    const { getSum: sum, loading: sumLoading, success: sumSuccess, error: sumError } = useAppSelector(state => state.getSum)

    const [meat, setMeat] = useState(0)
    const [vegetables, setVegetables] = useState(0)
    const [groceryAndOthers, setGroceryAndOthers] = useState(0)




    const [todayExpensesFirst, setTodayExpensesFirst] = useState(0)
    const [todayExpensesSecond, setTodayExpensesSecond] = useState(0)

    const [todayExpenses, setTodayExpenses] = useState(0)

    const { attendance: getAttendanceLi, error: getAttendanceError, loading: getAttendanceLoading } = useAppSelector(state => state.getDailyAttendance)

    const { success: successExpenses, error: errorExpenses } = useAppSelector(state => state.addExpenses)

    const { attendances } = useAppSelector(state => state.getFirstAndSecond)

    const {
        attendances_first_all,
        attendances_second_all,

    } = attendances
    const submitHandler = (e: any) => {
        e.preventDefault();


        if ((Number(attendances_first_all) !== 0 && Number(attendances_second_all) !== 0) && todayExpensesFirst !== 0) {
            let expenses = {
                date: date,


                expenses_meat: meat,
                expenses_vegetables: vegetables,
                expenses_grocery_and_other: groceryAndOthers,
                expenses_first_time: todayExpensesFirst,
                expenses_second_time: todayExpensesSecond,
                expenses_total: (todayExpensesFirst + todayExpensesSecond)


            }

            dispatch(addExpenses(expenses))

        } else {

            setMessage("No attendance today or some other error")

        }

    }




    const today = new Date().toISOString().slice(0, 10);
    const [date, setDate] = useState(today)


    const [message, setMessage] = useState('')
    // factor
    const [factor, setFactor] = useState(0.6)



    const totalMeatExpenses = sum.meat_sum || 0;
    const totalVegetableExpenses = sum.vegetable_sum || 0
    const totalGroceryExpenses = sum.grocery_and_other_sum || 0;




    useEffect(() => {

        setTodayExpenses(parseFloat((meat + vegetables + groceryAndOthers).toFixed(2)))

        setTodayExpensesFirst(parseFloat((todayExpenses * factor).toFixed(2))); setTodayExpensesSecond(parseFloat((todayExpenses * (1 - factor)).toFixed(2)))



    }, [todayExpenses, factor, meat, vegetables, groceryAndOthers])


    useEffect(() => {
        dispatch(getDailyAttendance(date));

        dispatch(getSum(date))
        dispatch(getFirstAndSecond(date))

        if (successExpenses) {
            setMessage("The expense is added successfully")
            // empty all the inputs
            setTodayExpensesFirst(0)
            setTodayExpensesSecond(0)
            setTodayExpenses(0)
            setMeat(0)
            setVegetables(0)
            setGroceryAndOthers(0)

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
                    </div>
                    <div className="row">
                        {message && <Message variant="success">{message}</Message>}
                        {/* {successExpenses && <Message variant="success">{message}</Message>} */}
                        <div className="col-md-6 mx-auto">

                            <div className="card card-body">

                                <h2>Set Expenses</h2>
                                <form onSubmit={submitHandler}>

                                    <div className="form-group d-flex justify-content-between">

                                        <label htmlFor="name">Meat:</label>

                                        <input

                                            className="form-group"
                                            id="meat"
                                            value={meat}
                                            onChange={(e) => setMeat(Number(e.target.value))}
                                            required
                                            min={1}
                                        />
                                    </div>
                                    <div className="form-group d-flex justify-content-between">


                                        <label htmlFor="name">Vegetables:</label>

                                        <input

                                            className="form-group"
                                            id="vegetables"
                                            value={vegetables}
                                            onChange={(e) => setVegetables(Number(e.target.value))}
                                            required
                                            min={1}
                                        />
                                    </div>
                                    <div className="form-group d-flex justify-content-between">

                                        <label htmlFor="name">Grocery + Others:</label>

                                        <input

                                            className="form-group"
                                            id="grocery_others"
                                            value={groceryAndOthers}
                                            onChange={(e) => setGroceryAndOthers(Number(e.target.value))}
                                            required
                                            min={1}
                                        />
                                    </div>
                                    <div className="form-group d-flex justify-content-between">

                                        <label htmlFor="name">Total Expenses:</label>

                                        <input

                                            className="form-group"
                                            id="total"
                                            value={todayExpenses}
                                            // onChange={(e) => setTodayExpenses(Number(e.target.value))}
                                            required
                                            min={1}
                                        />
                                    </div>

                                    <div className="form-group d-flex justify-content-between">

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
                                            <option value="0.66" label="2/3">2/3</option>
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

                                        <li className="list-group-item">{attendances_first_all}</li>

                                        <label className="list-group-item  card-header">Total Attendances For Second Time</label>

                                        <li className="list-group-item">{attendances_second_all}</li>


                                    </ul>


                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>



                                </form>

                            </div>

                        </div>
                        <div className="col-md-6 mx-auto">
                            <div className="container">
                                <div className="row">
                                    <div className="card">
                                        {sumLoading ? <Loader /> : sumError ? <Message>{String(sumError)}</Message> :
                                            <div className="card-body">
                                                <h2>Get Sum of Previous Expenses</h2>
                                                <h5 className="card-title">Meat Expenses</h5>
                                                <p className="card-text">{totalMeatExpenses} PKR</p>
                                                <h5 className="card-title">Vegetable Expenses</h5>
                                                <p className="card-text">{totalVegetableExpenses} PKR</p>

                                                <h5 className="card-title">Grocery Expenses</h5>
                                                <p className="card-text">{totalGroceryExpenses} PKR</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            )}

        </div>
    )
}



export default TodayExpenses;

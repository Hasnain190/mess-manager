// for this month bill
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { counter } from "../../../components/counter"

import { useDispatch, useSelector } from "react-redux";
import { getBill } from '../../../actions/expenses_actions'
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Downloader from '../../../components/Downloader';
import { listUsers } from "../../../actions/user_actions";

import { addBill } from '../../../actions/expenses_actions';

function BillForm() {

    const dispatch = useDispatch();
    const today = new Date().toISOString().substring(0, 7);
    let myRef = useRef()

    useEffect(() => {
        dispatch(listUsers())
        dispatch(getBill(date.substring(5, 7)))
    }, [date, bill])

    const { users } = useSelector(state => state.userList)
    const { bill, loading } = useSelector(state => state.getBill)
    const [date, setDate] = useState(today)


    const [billPayed, setBillPayed] = useState(0)



    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getBill(date.substring(5, 7)))
    }
    function IdToStudent({ id }) {
        const name = users?.find(user => user.id === id).username
        return (
            <div>{name}</div>
        )
    }

    const buttonClick = (e) => {

        e.preventDefault()

        // let billPayed = e.target.elements[`bill-payed-${id}`].value;

        let month = date.substring(5, 7)
        let id = e.target[0].id.split("-").at(-1)

        let billPayed = {

        }



        console.log(month, id, e)

    }
    return (
        <div className="container">
            <div class="h1 text-center text-dark" id="mess-bill">
                Bill Form
                <form className="form form-control" onSubmit={handleSubmit} >
                    <input type="month" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />

                    <button className="btn btn-primary" type="submit">Get</button>
                </form>
            </div>


            <Downloader htmlInputId={`mess-bill`} name={"Expenses-sheet"} />

            {loading ? (<Loader ></Loader>) :



                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Room No</th>
                            <th scope="col">This Month's Bill</th>
                            <th scope="col">Due Bill</th>
                            <th scope="col">Total to be Paid</th>
                            <th scope="col">Paid Payed</th>
                        </tr>
                    </thead>
                    {bill?.map(item =>
                        <tbody>
                            <tr>
                                <th scope="row" key={item.id} >{item.id}</th>
                                <td><IdToStudent id={(item.student)} /></td>
                                <td>{item.room}</td>
                                <td>{item.bill.toFixed(2)}</td>
                                <td>{item.dues.toFixed(2)}</td>
                                <td>{item.total.toFixed(2)}</td>
                                <td>

                                    <form className="form" onSubmit={buttonClick}>
                                        <input className="form-control" id={`bill-payed-${item.id}`} type="number" onChange={(e) => (e.target.value)}></input>
                                        <button className='btn btn-primary' type="submit" name={`id-input-${item.student}`} > Add Bill</button>
                                    </form>
                                </td>
                            </tr>


                        </tbody>
                    )}
                </table>
            }
        </div>
    );
}

export default BillForm;

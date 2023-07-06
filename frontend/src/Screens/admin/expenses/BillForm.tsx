// for this month bill
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getMessBill } from '../../../features/expenses/expenses_actions_creators'
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Downloader from '../../../components/Downloader';
import { listUsers } from "../../../features/user/user_actions_creators";
import { payBill } from '../../../features/expenses/expenses_actions_creators';


function BillForm() {
    const dispatch = useAppDispatch();


    const today = new Date().toISOString().slice(0, 7);
    const [date, setDate] = useState(today)
    const month = (date.slice(5, 7)) //1
    const year = (today.slice(0, 4)) //2023 

    const { messBill, loading } = useAppSelector(state => state.getMessBill)
    const { loading: addBillLoading, success: addBillSuccess } = useAppSelector(state => state.addBill)

    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        dispatch(listUsers())
        dispatch(getMessBill(year, month))


    }, [date, addBillSuccess])

    useEffect(() => {
        setMessage("Bill is added")

        setInterval(() =>

            setMessage(""),
            2000
        )
    }, [addBillSuccess])





    const handleSubmit = (e: any) => {
        e.preventDefault()
        dispatch(getMessBill(year, month))
    }

    const saveHandler = (e: any) => {

        e.preventDefault()

        let billId = e.target[0].id.split("-").at(-1);
        let billPayed = Number(e.target.elements[`bill-payed-${billId}`].value);

        let studentId = e.target[1].id.split("-").at(-1);
        let payingBill = {
            paying_bill: billPayed
        }

        dispatch(payBill(year, month, studentId, payingBill))

    }
    return (

        <div id="mess-bill" className="container">
            {addBillSuccess && <Message variant="success">{message}</Message>}

            <div className="h1 text-center text-dark" >
                Bill Form

                <form className="form form-control" onSubmit={handleSubmit} >

                    <input type="month" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />


                    <button className="btn btn-primary" type="submit">Get</button>
                </form>
            </div>






            {loading || addBillLoading ? (<Loader ></Loader>) :




                <table className="table table-striped">

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

                    {messBill?.bills.map((bill) => <tbody>

                        <tr>

                            <th scope="row" key={bill.id} >{bill.id}</th>

                            <td>{bill.student}</td>

                            <td>{bill.room}</td>

                            <td>{bill.bill}</td>

                            <td>{bill.dues}</td>

                            <td>{bill.total}</td>


                            <td>


                                <form className="form" onSubmit={saveHandler}>

                                    <input className="form-control" id={`bill-payed-${bill.id}`} type="number" onChange={(e) => (e.target.value)}></input>

                                    <button className='btn btn-primary'
                                        disabled={Number(bill.total) === 0}

                                        type="submit" id={`student-input-id-${bill.student_id}`} name={`id-input-${bill.student}`} >Pay Bill</button>
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

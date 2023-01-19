// for this month bill
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { counter } from "../../../components/counter"

import { useDispatch, useSelector } from "react-redux";
import { getBill } from '../../../actions/expenses_actions'
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Downloader from '../../../components/Downloader';
import { listUsers } from "../../../actions/user_actions";

function ThisMonthBill() {
  const dispatch = useDispatch();
  const today = new Date().toISOString().substring(0, 7);
  useEffect(() => {
    dispatch(listUsers())
    dispatch(getBill(date.substring(5, 7)))
    // @ts-expect-error TS(2448): Block-scoped variable 'date' used before its decla... Remove this comment to see the full error message
  }, [date, bill])

  // @ts-expect-error TS(2339): Property 'userList' does not exist on type 'Defaul... Remove this comment to see the full error message
  const { users } = useSelector(state => state.userList)
  // @ts-expect-error TS(2339): Property 'getBill' does not exist on type 'Default... Remove this comment to see the full error message
  const { bill, loading } = useSelector(state => state.getBill)
  const [date, setDate] = useState(today)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(getBill(date.substring(5, 7)))
  }
  function IdToStudent({
    id
  }: any) {


    const name = users?.find((user: any) => user.id === id).username

    return (
      <div>{name}</div>
    )
  }
  return (
    <div className="container">
      <div className="h1 text-center text-dark" id="mess-bill">
        Mess Bill




        <form className="form form-control" onSubmit={handleSubmit} >

          <input type="month" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />


          <button className="btn btn-primary" type="submit">Get</button>
        </form>
      </div>



      <Downloader htmlInputId={`mess-bill`} name={"Expenses-sheet"} />


      {loading ? (<Loader ></Loader>) :




        <table className="table table-striped">

          <thead>

            <tr>

              <th scope="col">#</th>

              <th scope="col">Name</th>

              <th scope="col">Room No</th>

              <th scope="col">This Month's Bill</th>

              <th scope="col">Due Bill</th>

              <th scope="col">Total to be Paid</th>
            </tr>
          </thead>

          {bill?.map((item: any) => <tbody>

            <tr>

              <th scope="row" key={item.id} >{item.id}</th>

              <td><IdToStudent id={(item.student)} /></td>

              <td>{item.room}</td>

              <td>{item.bill.toFixed(2)}</td>

              <td>{item.dues.toFixed(2)}</td>

              <td>{item.total.toFixed(2)}</td>
            </tr>


          </tbody>
          )}
        </table>
      }
    </div>
  );
}

export default ThisMonthBill;

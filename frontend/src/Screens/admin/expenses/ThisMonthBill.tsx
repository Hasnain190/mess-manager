// for this month bill
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { counter } from "../../../components/counter"

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getMessBill } from '../../../features/expenses/expenses_actions_creators'
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Downloader from '../../../components/Downloader';
import { listUsers } from "../../../features/user/user_actions_creators";
import IdToStudent from "../../../components/IdToStudent";

function ThisMonthBill() {
  const dispatch = useAppDispatch();
  const today = new Date().toISOString().substring(0, 7);
  const [date, setDate] = useState(today)
  const month = Number(date.slice(5, 7)) //1
  const year = Number(today.slice(0, 4)) //2023


  const { users } = useAppSelector(state => state.userList)
  const { messBill, loading } = useAppSelector(state => state.getMessBill)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(getMessBill(year, month))
  }

  useEffect(() => {
    dispatch(listUsers())
    dispatch(getMessBill(year, month))
  }, [date, messBill])
  return (
    <div className="container">
      <div className="h1 text-center text-dark" id="mess-bill">
        This Month's Bill

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

          {messBill?.map((item: any) => <tbody>

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

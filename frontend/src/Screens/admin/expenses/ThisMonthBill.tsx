// for this month bill
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getMessBill } from '../../../features/expenses/expenses_actions_creators'
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Downloader from '../../../components/Downloader';

function ThisMonthBill() {
  const dispatch = useAppDispatch();
  const { messBill, loading, error } = useAppSelector(state => state.getMessBill)
  const today = new Date().toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState(today)

  let year = new Date().getFullYear()
  let month = new Date().getMonth()
  const handleSelectRange = (e: any) => {

    const selectedRange = e.target.value;

    if (selectedRange === "this_month") {

      let firstDay = new Date(Date.UTC(year, month, 1)).toISOString().slice(0, 10)

      setStartDate(firstDay)
      setEndDate(today)

      if (selectedRange === "prev_30_days") {

        //    new Date().getDate() is today
        let back30Days = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 7)
        setStartDate(back30Days)
        setEndDate(today)



      }
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(getMessBill(startDate, endDate))
  }

  useEffect(() => {
    dispatch(getMessBill(startDate, endDate))
  }, [startDate, endDate])
  return (
    <div className="container">
      <div className="h1 text-center text-dark" id="mess-bill">
        Calculate Bill for Mess
        <form onChange={handleSelectRange}>

          <fieldset>
            <legend>Select a range:</legend>

            <div>
              <input type="radio" id="this_month" name="range"
                checked />
              <label htmlFor="this_month">This Month</label>
            </div>

            <div>
              <input type="radio" id="prev_30_days" name="range" />
              <label htmlFor="prev_30_days">Previous 30 days</label>
            </div>


          </fieldset>
        </form>


        <form className="form form-control" onSubmit={handleSubmit} >
          <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(String(e.target.value))} max={today} />
          <label htmlFor="start-date">Start Date</label>


          <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(String(e.target.value))} max={today} />
          <label htmlFor="end-date">End Date</label>


          <button className="btn btn-primary" type="submit">Get</button>
        </form>
      </div>

      <Downloader tableData={messBill.bills} htmlInputId={`mess-bill`} name={"Expenses-sheet"} />

      {loading ? (<Loader ></Loader>) :
        error ? (<Message variant={"danger"}>There is some error</Message>)
          :
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

            {messBill.bills?.map((bill) => <tbody>

              <tr>

                <th scope="row" key={bill.id} >{bill.id}</th>

                <td>{bill.student}</td>

                <td>{bill.room}</td>

                <td>{bill.bill}</td>

                <td>{bill.dues}</td>

                <td>{bill.total}</td>
              </tr>


            </tbody>
            )}
          </table>
      }
    </div>
  );
}

export default ThisMonthBill;

// for this month bill
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { counter } from "../../../components/counter"

import { useDispatch, useSelector } from "react-redux";
import { getBill } from '../../../actions/expenses_actions'
// @ts-expect-error TS(6142): Module '../../../components/Message' was resolved ... Remove this comment to see the full error message
import Message from "../../../components/Message";
// @ts-expect-error TS(6142): Module '../../../components/Loader' was resolved t... Remove this comment to see the full error message
import Loader from "../../../components/Loader";
// @ts-expect-error TS(6142): Module '../../../components/Downloader' was resolv... Remove this comment to see the full error message
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
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div>{name}</div>
    )
  }
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="container">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div class="h1 text-center text-dark" id="mess-bill">
        Mess Bill



        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <form className="form form-control" onSubmit={handleSubmit} >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <input type="month" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />

          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <button className="btn btn-primary" type="submit">Get</button>
        </form>
      </div>


      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Downloader htmlInputId={`mess-bill`} name={"Expenses-sheet"} />

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      {loading ? (<Loader ></Loader>) :



        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <table class="table table-striped">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <thead>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <tr>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <th scope="col">#</th>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <th scope="col">Name</th>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <th scope="col">Room No</th>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <th scope="col">This Month's Bill</th>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <th scope="col">Due Bill</th>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <th scope="col">Total to be Paid</th>
            </tr>
          </thead>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          {bill?.map((item: any) => <tbody>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <tr>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <th scope="row" key={item.id} >{item.id}</th>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <td><IdToStudent id={(item.student)} /></td>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <td>{item.room}</td>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <td>{item.bill.toFixed(2)}</td>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <td>{item.dues.toFixed(2)}</td>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

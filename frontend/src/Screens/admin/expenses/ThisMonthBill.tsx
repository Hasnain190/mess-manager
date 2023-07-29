// for this month bill
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getMessBill } from '../../../features/expenses/expenses_actions_creators'
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import Downloader from '../../../components/Downloader';
import { descriptionRow } from '../../../components/ExcelMeta/ThisMonthBill'
import convertToMonth from '../../../components/ConvertToMonth'
function ThisMonthBill() {
  const dispatch = useAppDispatch();
  const { messBill, loading, error } = useAppSelector(state => state.getMessBill)
  const today = new Date().toISOString().slice(0, 7);
  const [date, setDate] = useState(today)
  const month = (date.slice(5, 7)) //1
  const year = (today.slice(0, 4)) //2023 


  const month_long = convertToMonth(month)




  const handleSubmit = (e: any) => {
    e.preventDefault()
    dispatch(getMessBill(year, month))
  }
  const data = messBill.bills?.map((bill) => ({
    student: bill.student,
    room: bill.room,
    totalAttendances: bill.total_attendances,
    bill: bill.bill,
    total: bill.total
  }));
  // Custom headings and description
  const headingRow = [`${month_long} Mess Bill`];

  const dataWithHeaders = [
    // Add the heading row
    headingRow,

    descriptionRow,
    ,

    [],
    // Heading row
    ['Student', 'Room', "Bill", 'Total Attendances', 'Total'],
    // Original Data
    ...data.map((bill) => [
      bill.student,
      bill.room,
      bill.totalAttendances,
      bill.bill,
      bill.total,
    ]),
  ];

  useEffect(() => {
    dispatch(getMessBill(year, month))


  }, [date])


  return (
    <div className="container">
      <div className="h1 text-center text-dark" id="mess-bill">
        Calculate Bill for Mess




        <form className="form form-control" onSubmit={handleSubmit} >



          <label htmlFor="month-date">Month </label>
          <input type="month" id="month-date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />


          <button className="btn btn-primary" type="submit">Get</button>
        </form>
      </div>

      <Downloader tableData={dataWithHeaders} htmlInputId={`mess-bill`} name={"Expenses-sheet"} />

      {loading ? (<Loader ></Loader>) :
        error ? (<Message variant={"danger"}>There is some error</Message>)
          :
          <table className="table table-striped">

            <thead>

              <tr>

                <th scope="col">#</th>

                <th scope="col">Name</th>
                <th scope="col">Room No</th>
                <th scope="col">Total Attendances</th>



                <th scope="col">{month_long}'s Bill</th>

                {/* <th scope="col">Due Bill</th> */}

                <th scope="col">Total to be Paid</th>
              </tr>
            </thead>

            {messBill.bills?.map((bill, index) => <tbody>

              <tr>

                <th scope="row" key={bill.id} >{index}</th>

                <td>{bill.student}</td>
                <td>{bill.room}</td>
                <td>{bill.total_attendances}</td>


                <td>{bill.bill}</td>

                {/* <td>{bill.dues}</td> */}

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

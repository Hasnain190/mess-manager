
// @ts-expect-error TS(6142): Module '../../../components/Button' was resolved t... Remove this comment to see the full error message
import Button from "../../../components/Button";
import { listUsers, deleteUser } from "../../../actions/user_actions";
import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
// @ts-expect-error TS(6142): Module '../../../components/Loader' was resolved t... Remove this comment to see the full error message
import Loader from "../../../components/Loader";
// @ts-expect-error TS(6142): Module '../../../components/Message' was resolved ... Remove this comment to see the full error message
import Message from "../../../components/Message";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postAttendance, getAttendance } from "../../../actions/attendance_actions";
import { counter } from "../../../components/counter";


export default function MarkAttendance() {

  const dispatch = useDispatch();
  const navigate = useNavigate();





  // @ts-expect-error TS(2339): Property 'userList' does not exist on type 'Defaul... Remove this comment to see the full error message
  const { users, loading, error } = useSelector((state) => state.userList);
  const today = new Date().toISOString().substr(0, 10);
  // @ts-expect-error TS(2339): Property 'userLogin' does not exist on type 'Defau... Remove this comment to see the full error message
  const { userInfo } = useSelector((state) => state.userLogin);


  // @ts-expect-error TS(2339): Property 'attendance' does not exist on type 'Defa... Remove this comment to see the full error message
  const { success: attendanceSuccess, error: attendanceError, loading: attendanceLoading } = useSelector((state) => state.attendance)

  // @ts-expect-error TS(2339): Property 'getAttendance' does not exist on type 'D... Remove this comment to see the full error message
  const { attendance: getAttendanceObj, error: getAttendanceError, loading: getAttendanceLoading } = useSelector(state => state.getAttendance)





  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());

    } else {
      navigate("/login");
    }

  }, [dispatch, userInfo, navigate]);




  const userIds = users?.map((user: any) => user.id)


  const [total, setTotal] = useState(0)



  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      const attendanceExtractor = (e: any, id: any) => {
        let first_time = e.target.elements[`first-attendance-${id}`].value;
        let second_time = e.target.elements[`second-attendance-${id}`].value;

        return [first_time, second_time]
      }



      for (let index = 0; index < userIds.length; index++) {
        let id = userIds[index];

        const attendance = {
          student: id,
          date: date,
          first_time: attendanceExtractor(e, id)[0],
          second_time: attendanceExtractor(e, id)[1]
        }
        dispatch(postAttendance(attendance, id))
      }
      alert("All the attendance is submitted successfully")
      dispatch(getAttendance());
      let count = counter(getAttendanceObj, date);
      setTotal(count)

      console.log(count)
    } catch (error) {

    }
  }







  const [date, setDate] = useState(today)

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <section>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="row">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="col-md-12 text-dark text-center">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <h3 >Mark Attendance</h3> for <label for="date">The Date:</label><h4><input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} /></h4>'s meal
        </div>
      </div>
      {loading ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Loader />
      ) : error ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Message variant="danger">{error}</Message>
      ) :
        (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <form className="form" onSubmit={handleSubmit}>

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <table className="table table-bordered">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <thead>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <tr>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <th scope="col">#</th>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <th scope="col">Name</th>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <th scope="col">Room no.</th>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <th scope="col">First Time</th>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <th scope="col">Second Time</th>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <th scope="col">Status</th>
                </tr>
              </thead>

              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              {users.map((user: any) => <tbody>




                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <tr key={user.id}>


                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <th scope="row" id={`user-id-${user.id}}`}>{user.id}</th>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <td className="form-group">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input

                      type="text"
                      className="form-control"
                      id={`table-name-${user.id}`}
                      name="username"
                      value={user.username}

                    />
                  </td>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <td className="form-group">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <input
                      type="text"
                      className="form-control"
                      id={`table-ropm-${user.id}`}
                      name="room"
                      value={user.room}

                    />

                  </td>

                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <td>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <select id={`first-attendance-${user.id}`} onChange={(e) => (e.target.value)} className="form-control" >
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <option value="present">Present ✓</option>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <option value="absent">Absent X</option>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <option value="double">Double 2</option>
                    </select>

                  </td>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <td>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <select id={`second-attendance-${user.id}`} onChange={(e) => (e.target.value)} className="form-control" >
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <option value="present">Present ✓</option>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <option value="absent">Absent X</option>
                      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <option value="double">Double 2</option>
                    </select>

                  </td>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <td>
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <i class="bi bi-check" ></i>
                  </td>
                </tr>

              </tbody>)
              }

            </table>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

          </form>

        )


      }


    </section>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <section>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="row">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="col-md-12 text-dark">
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <h3>{today}'s totals </h3>
        </div>
      </div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <table className="table table-bordered">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <thead>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <tr>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">#</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">Total Members</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">Total Absentees</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">Total Attendences</th>
          </tr>
        </thead>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <tbody>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <tr>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="row">1</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <td>{users?.length}</td>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <td></td>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <td>{total}</td>

          </tr>
        </tbody>
      </table>


    </section>
  </>;
}




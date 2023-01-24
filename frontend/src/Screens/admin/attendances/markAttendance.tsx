
import Button from "../../../components/Button";
import { listUsers, deleteUser } from "../../../features/user/user_actions_creators";
import React, { useState, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postAttendance, getAttendance } from "../../../features/attendance/attendance_actions_creators";
import { counter } from "../../../components/counter";


export default function MarkAttendance() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();






  const { users, loading, error } = useAppSelector((state) => state.userList);
  const today = new Date().toISOString().substr(0, 10);

  const { userInfo } = useAppSelector((state) => state.userLogin);



  const { success: attendanceSuccess, error: attendanceError, loading: attendanceLoading } = useAppSelector((state) => state.attendance)


  const { attendance: getAttendanceObj, error: getAttendanceError, loading: getAttendanceLoading } = useAppSelector(state => state.getAttendance)





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
        alert("All the attendance is submitted successfully")
      }
      dispatch(getAttendance());
      let count = counter(getAttendanceObj, date);
      setTotal(count)

      console.log(count)
    } catch (error) {

    }
  }







  const [date, setDate] = useState(today)


  return <>

    <section>

      <div className="row">

        <div className="col-md-12 text-dark text-center">

          <h3 >Mark Attendance</h3> for <label htmlFor="date">The Date:</label><h4><input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} /></h4>'s meal
        </div>
      </div>
      {loading ? (

        <Loader />
      ) : error ? (

        <Message variant="danger">{error}</Message>
      ) :
        (

          <form className="form" onSubmit={handleSubmit}>


            <table className="table table-bordered">

              <thead>

                <tr>

                  <th scope="col">#</th>

                  <th scope="col">Name</th>

                  <th scope="col">Room no.</th>

                  <th scope="col">First Time</th>

                  <th scope="col">Second Time</th>

                  <th scope="col">Status</th>
                </tr>
              </thead>


              {users.map((user: any) => <tbody>





                <tr key={user.id}>



                  <th scope="row" id={`user-id-${user.id}}`}>{user.id}</th>

                  <td className="form-group">

                    <input

                      type="text"
                      className="form-control"
                      id={`table-name-${user.id}`}
                      name="username"
                      value={user.username}

                    />
                  </td>

                  <td className="form-group">

                    <input
                      type="text"
                      className="form-control"
                      id={`table-room-${user.id}`}
                      name="room"
                      value={user.room}

                    />

                  </td>


                  <td>

                    <select id={`first-attendance-${user.id}`} onChange={(e) => (e.target.value)} className="form-control" >

                      <option value="present">Present ✓</option>

                      <option value="absent">Absent X</option>

                      <option value="double">Double 2</option>
                    </select>

                  </td>

                  <td>

                    <select id={`second-attendance-${user.id}`} onChange={(e) => (e.target.value)} className="form-control" >

                      <option value="present">Present ✓</option>

                      <option value="absent">Absent X</option>

                      <option value="double">Double 2</option>
                    </select>

                  </td>

                  <td>

                    <i className="bi bi-check" ></i>
                  </td>
                </tr>

              </tbody>)
              }

            </table>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

          </form>

        )


      }


    </section>

    <section>

      <div className="row">

        <div className="col-md-12 text-dark">

          <h3>{today}'s totals </h3>
        </div>
      </div>

      <table className="table table-bordered">

        <thead>

          <tr>

            <th scope="col">#</th>

            <th scope="col">Total Members</th>

            <th scope="col">Total Absentees</th>

            <th scope="col">Total Attendances</th>
          </tr>
        </thead>

        <tbody>

          <tr>

            <th scope="row">1</th>

            <td>{users?.length}</td>

            <td></td>

            <td>{total}</td>

          </tr>
        </tbody>
      </table>


    </section>
  </>;
}




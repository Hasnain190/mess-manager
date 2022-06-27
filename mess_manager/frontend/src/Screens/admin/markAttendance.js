
import Button from "../../components/Button";
import { listUsers, deleteUser } from "../../actions/user_actions";
import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postAttendance } from "../../actions/attendance_actions";



export default function MarkAttendance() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myRefForId = useRef(null)
  const myRefForFirstTime = useRef(null)
  const myRefForSecondTime = useRef(null)






  const { users, loading, error } = useSelector((state) => state.userList);
  const today = new Date().toISOString().substr(0, 10);
  const { userInfo } = useSelector((state) => state.userLogin);


  const { success: attendanceSuccess, error: attendanceError, loading: attenandanceLoading } = useSelector((state) => state.attendance)


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());

    } else {
      navigate("/login");
    }

  }, [dispatch, userInfo, navigate]);




  const userIds = users?.map((user) => user.id)
  const handleSubmit = (e) => {
    e.preventDefault();

    const attendanceExtractor = (e, id) => {
      let first_time = e.target.elements[`first-attendance-${id}`].value;
      let second_time = e.target.elements[`second-attendance-${id}`].value;
      return [first_time, second_time]

    }


    for (let index = 0; index < userIds.length; index++) {
      let id = userIds[index];

      const attendance = {
        studant: id,
        date: today,
        first_time: attendanceExtractor(e, id)[0],
        second_time: attendanceExtractor(e, id)[1]
      }

      dispatch(postAttendance(attendance, id))

    }

    alert("All the attendance is submitted successfully")

  }


  return (
    <>
      <section>
        <div className="row">
          <div className="col-md-12 text-dark text-center">
            <h3 >Mark Attendance</h3> for <h4>{today}</h4>'s meal
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

                {users.map((user) => (


                  <tbody>




                    <tr key={user.id}>


                      <th scope="row" id={`user-id-${user.id}}`} ref={myRefForId}>{user.id}</th>
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
                          id={`table-ropm-${user.id}`}
                          name="room"
                          value={user.room}

                        />

                      </td>

                      <td>
                        <select id={`first-attendance-${user.id}`} ref={myRefForFirstTime} onChange={(e) => (e.target.value)} className="form-control" >
                          <option value="present">Present ✓</option>
                          <option value="absent">Absent X</option>
                          <option value="double">Double 2</option>
                        </select>

                      </td>
                      <td>
                        <select id={`second-attendance-${user.id}`} ref={myRefForSecondTime} onChange={(e) => (e.target.value)} className="form-control" >
                          <option value="present">Present ✓</option>
                          <option value="absent">Absent X</option>
                          <option value="double">Double 2</option>
                        </select>

                      </td>
                      <td>
                        <i class="bi bi-check" ></i>
                      </td>
                    </tr>

                  </tbody>
                ))
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
              <th scope="col">Total Attendences</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{users?.length}</td>
              <td></td>
              <td>2</td>

            </tr>
          </tbody>
        </table>


      </section>
    </>
  );
}




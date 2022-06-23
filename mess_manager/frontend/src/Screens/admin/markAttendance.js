
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
  const [firstTime, setFirstTime] = useState('')
  const [secondTime, setSecondTime] = useState('')
  const [attenandance, setAttendance] = useState({ id: null, date: today, first_time: "Present", second_time: "Present" });

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());



    } else {
      navigate("/login");
    }

  }, [dispatch, userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();





    // for (let i = 0; i < users.length; i++) {
    //   setAttendance({ id: users[i].id, date: today, first_time: firstTime, second_time: secondTime });

    //   postAttendance(attenandance);



    // }

    const attenandance = {
      studant: myRefForId.current.textContent,
      date: today,
      first_time: myRefForFirstTime.current.value,
      second_time: myRefForSecondTime.current.value
    }

    dispatch(postAttendance(attenandance))

    console.log(attenandance)


  }

  const testFunction = () => {



  }

  return (
    <>
      <section>
        {/* table for all the users */}
        {/* heading for attendance */}
        <div className="row">
          <div className="col-md-12 text-dark">
            <h3>Mark Attendance</h3> for <h4>{today}</h4>'s meal
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form onSubmit={handleSubmit}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Room no.</th>
                  <th scope="col">First Time</th>
                  <th scope="col">Second Time</th>
                </tr>
              </thead>
              <tbody>

                {users.map((user) => (



                  <tr key={user.id}>


                    <th scope="row" name="userId" ref={myRefForId}>{user.id}</th>
                    <td className="form-group">
                      <input

                        type="text"
                        className="form-control"
                        id="table-name"
                        name="username"
                        value={user.username}

                      />
                    </td>
                    <td className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="table-room"
                        name="room"
                        value={user.room}

                      />

                    </td>

                    <td>
                      <select name={`firstAttendance${user.id}`} ref={myRefForFirstTime} onChange={(e) => (e.target.value)} className="form-control" id="table-first-time">
                        <option value="present">Present ✓</option>
                        <option value="absent">Absent X</option>
                        <option value="double">Double 2</option>
                      </select>

                    </td>
                    <td>
                      <select name={`secondAttendance${user.id}`} ref={myRefForSecondTime} onChange={(e) => (e.target.value)} className="form-control" id="table-second-time">
                        <option value="present">Present ✓</option>
                        <option value="absent">Absent X</option>
                        <option value="double">Double 2</option>
                      </select>

                    </td>
                  </tr>

                ))}
              </tbody>


            </table>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>


          </form>

        )}





      </section >
      <section>
        {/* bootstrap table which shows total attenandance , absentees doubles and total members  */}
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





import Button from "../../components/Button";
import { listUsers, deleteUser } from "../../actions/user_actions";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { markAttendance } from "../../actions/user_actions";




function MarkAttendance() {

  const dispatch = useDispatch();
  const navigate = useNavigate();







  const { users, loading, error } = useSelector((state) => state.userList);
  const today = new Date().toISOString().substr(0, 10);
  const { userInfo } = useSelector((state) => state.userLogin);

  const [firstTimeAtt, setFirstTimeAtt] = useState()
  const [secondTimeAtt, setSecondTimeAtt] = useState()


  // const [double ,setDouble] = useState()
  // const [present ,setPresent] = useState()
  // const [absent ,setAbsent] = useState()

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());



    } else {
      navigate("/login");
    }

  }, [dispatch, userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target)

  }


  const handleInputChange = (e) => {


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


                      <th scope="row">1</th>
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
                        <select name="firstAttendance" value={firstTimeAtt} onChange={(e) => handleInputChange(e)} className="form-control" id="table-first-time">
                          <option style={{ backgroundColor: "green" }} value="1">Present ✓</option>
                          <option style={{ backgroundColor: "red" }} value="0">Absent X</option>
                          <option value="2">Double 2</option>
                        </select>



                      </td>
                      <td>
                        <select name="secondAttendance" value={secondTimeAtt} onChange={(e) => handleInputChange(e)} className="form-control" id="table-second-time">
                          <option style={{ backgroundColor: "green" }} value="1">Present ✓</option>
                          <option style={{ backgroundColor: "red" }} value="0">Absent X</option>
                          <option value="2">Double 2</option>
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



  export default MarkAttendance;

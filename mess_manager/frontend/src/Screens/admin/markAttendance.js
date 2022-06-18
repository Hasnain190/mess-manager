
import Button from "../../components/Button";
import { listUsers, deleteUser } from "../../actions/user_actions";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link, useLocation, useNavigate } from "react-router-dom";





function MarkAttendance() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { users, loading, error } = useSelector((state) => state.userList);
  const today = new Date().toISOString().substr(0, 10);
  const { userInfo } = useSelector((state) => state.userLogin);


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);



  return (
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
                <td>{user.username}</td>
                <td>{user.room}</td>

                <td>


                  <Button />

                </td>
                <td>
                  <Button />

                </td>
              </tr>
            ))}

          </tbody>
        </table>

      )}
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
            <th scope="col">Total Doubles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>3</td>
            <td>2</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>


    </section>
  );
}



export default MarkAttendance;

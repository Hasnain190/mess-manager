// this screen displays the list of users
import { listUsers, deleteUser } from "../../../features/user/user_actions_creators";
import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { Link, useLocation, useNavigate } from "react-router-dom";


function ViewUsers() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.userLogin);

  const { users, loading, error } = useAppSelector((state) => state.userList);

  const { success: successDelete } = useAppSelector((state) => state.userDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate, successDelete]);
  const deleteHandler = (id: any) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };


  return <>

    <h1 className="text-center text-dark">View Users</h1>
    {loading ? (

      <Loader />
    ) : error ? (

      <Message variant="danger">{error}</Message>
    ) : (

      <table className="table table-striped">

        <thead>

          <tr>

            <th scope="col">#</th>

            <th scope="col">Name</th>

            <th scope="col">Email</th>

            <th scope="col">Room No</th>

            <th scope="col">Phone</th>

            <th scope="col">Admin</th>

            <th scope="col">Edit</th>

            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => <tr key={user.id}>

            <th scope="row">1</th>

            <td>{user.username}</td>

            <td>{user.email}</td>

            <td>{user.room}</td>

            <td>{user.phone}</td>

            <td>
              {user.isAdmin ? (

                <i className="fas fa-check" style={{ color: "green" }}>Yes</i>
              ) : (

                <i className="fas fa-times" style={{ color: "red" }}>No</i>
              )}
            </td>

            <td>

              <Link
                to={`/admin/user/${user.id}/edit`}
                className="btn btn-primary"
              >
                Edit
              </Link>
            </td>

            <td>

              <button
                className="btn btn-danger"
                onClick={() => deleteHandler(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>
    )}
  </>;
}

export default ViewUsers;

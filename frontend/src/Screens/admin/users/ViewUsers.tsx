// this screen displays the list of users
import { listUsers, deleteUser } from "../../../actions/user_actions";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// @ts-expect-error TS(6142): Module '../../../components/Loader' was resolved t... Remove this comment to see the full error message
import Loader from "../../../components/Loader";
// @ts-expect-error TS(6142): Module '../../../components/Message' was resolved ... Remove this comment to see the full error message
import Message from "../../../components/Message";
import { Link, useLocation, useNavigate } from "react-router-dom";


function ViewUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // @ts-expect-error TS(2339): Property 'userLogin' does not exist on type 'Defau... Remove this comment to see the full error message
  const { userInfo } = useSelector((state) => state.userLogin);

  // @ts-expect-error TS(2339): Property 'userList' does not exist on type 'Defaul... Remove this comment to see the full error message
  const { users, loading, error } = useSelector((state) => state.userList);

  // @ts-expect-error TS(2339): Property 'userDelete' does not exist on type 'Defa... Remove this comment to see the full error message
  const { success: successDelete } = useSelector((state) => state.userDelete);

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

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <h1 className="text-center text-dark">View Users</h1>
    {loading ? (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Loader />
    ) : error ? (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Message variant="danger">{error}</Message>
    ) : (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <table className="table table-striped">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <thead>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <tr>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">#</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">Name</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">Email</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">Room No</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">Phone</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">Admin</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">Edit</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="col">Delete</th>
          </tr>
        </thead>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <tbody>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          {users.map((user: any) => <tr key={user.id}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <th scope="row">1</th>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <td>{user.username}</td>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <td>{user.email}</td>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <td>{user.room}</td>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <td>{user.phone}</td>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <td>
              {user.isAdmin ? (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <i className="fas fa-check" style={{ color: "green" }}>Yes</i>
              ) : (
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <i className="fas fa-times" style={{ color: "red" }}>No</i>
              )}
            </td>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <td>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Link
                to={`/admin/user/${user.id}/edit`}
                className="btn btn-primary"
              >
                Edit
              </Link>
            </td>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <td>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

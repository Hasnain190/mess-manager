// make a react component for navbar
import { useSelector } from "react-redux";
import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
// import { logout } from '../actions/user_actions';
// import dispatch
// import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from '../app/hooks'


import { logout } from "../features/user/user_actions_creators";
function Navbar() {
  const { userInfo } = useAppSelector((state) => state.userLogin);
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <Link className="navbar-brand" to="/">
        Mess Manager
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >

        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">

        <ul className="navbar-nav">

          {!userInfo && (


            <li className="nav-item">

              <Link className="nav-link" to="/login">
                Login
              </Link>

            </li>
          )

          }

          {userInfo && (

            <>

              <li className="nav-item">

                <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
              </li>


              <li className="nav-item">

                <Link className="nav-link" to="/dashboard">
                  Your Dash Board
                </Link>
              </li>

              <Link className="dropdown-item" to="/admin/view-mess">
                View Mess
              </Link>
            </>
          )}

          {userInfo && userInfo.isAdmin && (

            <>
              {/* make a drop down menu */}

              <div className="dropdown">

                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Admin
                </button>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                  <Link className="dropdown-item" to="/admin/add-user">
                    Add User
                  </Link>

                  <Link className="dropdown-item" to="/admin/view-users">
                    View Users
                  </Link>


                  <div className="dropdown-divider"></div>


                  <Link className="dropdown-item" to="/admin/view-mess">
                    View Mess
                  </Link>


                  <Link className="dropdown-item" to="/admin/mark-attendance">
                    Mark Attendance
                  </Link>

                  <div className="dropdown-divider"></div>


                  <Link
                    className="dropdown-item"
                    to="/admin/monthly-attendance"
                  >
                    See Monthly Attendances
                  </Link>

                  <div className="dropdown-divider"></div>


                  <Link className="dropdown-item" to="/admin/expenses/today">
                    Today's Expenses
                  </Link>


                  <Link className="dropdown-item" to="/admin/expenses/monthly">
                    Expenses By Month
                  </Link>

                  <Link className="dropdown-item" to="/admin/bill-of-month">
                    This Month's Bill
                  </Link>

                  <div className="dropdown-divider"></div>


                  <Link className="dropdown-item" to="/admin/expenses/bill-form/">
                    Bill Form
                  </Link>
                </div>
              </div>

            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

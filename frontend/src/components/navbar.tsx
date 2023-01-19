// make a react component for navbar
import { useSelector } from "react-redux";
import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { logout } from '../actions/user_actions';
// import dispatch
import { useDispatch } from "react-redux";


function Navbar() {
  // @ts-expect-error TS(2339): Property 'userLogin' does not exist on type 'Defau... Remove this comment to see the full error message
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Link className="navbar-brand" to="/">
        Mess Manager
      </Link>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <span className="navbar-toggler-icon" />
      </button>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="collapse navbar-collapse" id="navbarNav">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ul className="navbar-nav">

          {!userInfo && (

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <li className="nav-item">
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Link className="nav-link" to="/login">
                Login
              </Link>

            </li>
          )

          }

          {userInfo && (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <li className="nav-item">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
              </li>

              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <li className="nav-item">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Link className="nav-link" to="/dashboard">
                  Your Dash Board
                </Link>
              </li>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Link className="dropdown-item" to="/admin/view-mess">
                View Mess
              </Link>
            </>
          )}

          {userInfo && userInfo.isAdmin && (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
              {/* make a drop down menu */}
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div class="dropdown">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <button
                  // @ts-expect-error TS(2322): Type '{ children: string; class: string; type: "bu... Remove this comment to see the full error message
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Admin
                </button>
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link className="dropdown-item" to="/admin/add-user">
                    Add User
                  </Link>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link className="dropdown-item" to="/admin/view-users">
                    View Users
                  </Link>

                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="dropdown-divider"></div>

                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link className="dropdown-item" to="/admin/view-mess">
                    View Mess
                  </Link>

                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link className="dropdown-item" to="/admin/mark-attendance">
                    Mark Attendance
                  </Link>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="dropdown-divider"></div>

                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link
                    className="dropdown-item"
                    to="/admin/monthly-attendance"
                  >
                    See Monthly Attendances
                  </Link>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="dropdown-divider"></div>

                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link className="dropdown-item" to="/admin/expenses/today">
                    Today's Expenses
                  </Link>

                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link className="dropdown-item" to="/admin/expenses/monthly">
                    Expenses By Month
                  </Link>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Link className="dropdown-item" to="/admin/bill-of-month">
                    This Month's Bill
                  </Link>
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <div className="dropdown-divider"></div>

                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

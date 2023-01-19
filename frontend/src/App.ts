// @ts-expect-error TS(6142): Module './components/navbar' was resolved to 'F:/m... Remove this comment to see the full error message
import Navbar from "./components/navbar";
// @ts-expect-error TS(6142): Module './Screens/Home' was resolved to 'F:/mess-m... Remove this comment to see the full error message
import Home from "./Screens/Home";
// @ts-expect-error TS(6142): Module './Screens/login' was resolved to 'F:/mess-... Remove this comment to see the full error message
import Login from "./Screens/login";

// @ts-expect-error TS(6142): Module './Screens/normal/dashboard' was resolved t... Remove this comment to see the full error message
import Dashboard from "./Screens/normal/dashboard";

// @ts-expect-error TS(6142): Module './Screens/admin/users/EditUser' was resolv... Remove this comment to see the full error message
import EditUser from "./Screens/admin/users/EditUser";
// @ts-expect-error TS(6142): Module './Screens/admin/users/AddUsers' was resolv... Remove this comment to see the full error message
import AddUsers from "./Screens/admin/users/AddUsers";
// @ts-expect-error TS(6142): Module './Screens/admin/users/ViewUsers' was resol... Remove this comment to see the full error message
import ViewUsers from "./Screens/admin/users/ViewUsers";

// @ts-expect-error TS(6142): Module './Screens/admin/expenses/ThisMonthBill' wa... Remove this comment to see the full error message
import ThisMonthBill from "./Screens/admin/expenses/ThisMonthBill";
// @ts-expect-error TS(6142): Module './Screens/admin/expenses/TodayExpenses' wa... Remove this comment to see the full error message
import TodayExpenses from "./Screens/admin/expenses/TodayExpenses";
// @ts-expect-error TS(6142): Module './Screens/admin/expenses/MonthlyExpenses' ... Remove this comment to see the full error message
import MonthlyExpenses from "./Screens/admin/expenses/MonthlyExpenses";
// @ts-expect-error TS(6142): Module './Screens/admin/expenses/BillForm' was res... Remove this comment to see the full error message
import BillForm from "./Screens/admin/expenses/BillForm";

// @ts-expect-error TS(6142): Module './Screens/admin/attendances/markAttendance... Remove this comment to see the full error message
import MarkAttendance from "./Screens/admin/attendances/markAttendance";
// @ts-expect-error TS(6142): Module './Screens/admin/attendances/MonthlyAttenda... Remove this comment to see the full error message
import MonthlyAttendance from "./Screens/admin/attendances/MonthlyAttendance";

// @ts-expect-error TS(6142): Module './Screens/admin/mess/ViewMess' was resolve... Remove this comment to see the full error message
import ViewMess from "./Screens/admin/mess/ViewMess";
// @ts-expect-error TS(6142): Module './Screens/admin/mess/UpdateMess' was resol... Remove this comment to see the full error message
import UpdateMess from "./Screens/admin/mess/UpdateMess";



import {
  HashRouter as Router,
  Route,
  Routes,

} from "react-router-dom";

function App() {

  return (
    // @ts-expect-error TS(2749): 'Router' refers to a value, but is being used as a... Remove this comment to see the full error message
    <Router>
      // @ts-expect-error TS(2304): Cannot find name 'div'.
      <div className="App">
        // @ts-expect-error TS(2749): 'Navbar' refers to a value, but is being used as a... Remove this comment to see the full error message
        <Navbar />

        <Routes>
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route path="/" element={<Home />} exact />

          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route path="/login" element={<Login />} />

          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/dashboard" element={<Dashboard />} />


          {/* for admin */}
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route path="/admin/user/:id/edit" element={<EditUser />} exact />

          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route path="/admin/mark-attendance" element={<MarkAttendance />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/admin/bill-of-month" element={<ThisMonthBill />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/admin/expenses/today" element={<TodayExpenses />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/admin/expenses/monthly" element={<MonthlyExpenses />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/admin/expenses/bill-form" element={<BillForm />} />

          {/* <Route path="/admin/previous-attendance" element={<PreviousAttendance />} /> */}
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route path="/admin/monthly-attendance" element={<MonthlyAttendance />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/admin/view-mess" element={<ViewMess />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/admin/update-mess/:day/" element={<UpdateMess />} />

          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/admin/view-users" element={<ViewUsers />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/admin/add-user" element={<AddUsers />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

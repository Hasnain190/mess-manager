import Navbar from "./components/navbar";
import Home from "./Screens/Home";
import Login from "./Screens/login";

import Dashboard from "./Screens/normal/dashboard";

import EditUser from "./Screens/admin/users/EditUser";
import AddUsers from "./Screens/admin/users/AddUsers";
import ViewUsers from "./Screens/admin/users/ViewUsers";

import ThisMonthBill from "./Screens/admin/expenses/ThisMonthBill";
import TodayExpenses from "./Screens/admin/expenses/TodayExpenses";
import MonthlyExpenses from "./Screens/admin/expenses/MonthlyExpenses";
import BillForm from "./Screens/admin/expenses/BillForm";

import MarkAttendance from "./Screens/admin/attendances/markAttendance";
import MonthlyAttendance from "./Screens/admin/attendances/MonthlyAttendance";

import ViewMess from "./Screens/admin/mess/ViewMess";
import UpdateMess from "./Screens/admin/mess/UpdateMess";



import {
  HashRouter as Router,
  Route,
  Routes,

} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} exact />

          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />


          {/* for admin */}
          <Route path="/admin/user/:id/edit" element={<EditUser />} exact />

          <Route path="/admin/mark-attendance" element={<MarkAttendance />} />
          <Route path="/admin/bill-of-month" element={<ThisMonthBill />} />
          <Route path="/admin/expenses/today" element={<TodayExpenses />} />
          <Route path="/admin/expenses/monthly" element={<MonthlyExpenses />} />
          <Route path="/admin/expenses/bill-form" element={<BillForm />} />

          {/* <Route path="/admin/previous-attendance" element={<PreviousAttendance />} /> */}
          <Route path="/admin/monthly-attendance" element={<MonthlyAttendance />} />
          <Route path="/admin/view-mess" element={<ViewMess />} />
          <Route path="/admin/update-mess/:day/" element={<UpdateMess />} />

          <Route path="/admin/view-users" element={<ViewUsers />} />
          <Route path="/admin/add-user" element={<AddUsers />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

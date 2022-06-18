import Navbar from "./components/navbar";
import Home from "./Screens/Home";
import Login from "./Screens/login";

import Dashboard from "./Screens/normal/dashboard";

import EditUser from "./Screens/admin/EditUser";
import MarkAttendance from "./Screens/admin/markAttendance";
import ThisMonthBill from "./Screens/admin/ThisMonthBill";
import TodayExpenses from "./Screens/admin/PreviousAttendance";
import PreviousAttendance from "./Screens/admin/PreviousAttendance";
import ViewMess from "./Screens/admin/ViewMess";
import AddMess from "./Screens/admin/AddMess";
import ViewUsers from "./Screens/admin/ViewUsers";
import AddUsers from "./Screens/admin/AddUsers";



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
          <Route path="/admin/previous-attendance" element={<PreviousAttendance />} />
          <Route path="/admin/view-mess" element={<ViewMess />} />
          <Route path="/admin/add-mess" element={<AddMess />} />
          <Route path="/admin/view-users" element={<ViewUsers />} />
          <Route path="/admin/add-user" element={<AddUsers />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

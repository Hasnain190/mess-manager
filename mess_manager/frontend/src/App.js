import Navbar from "./components/navbar";
import Home from "./Screens/Home";
import Register from "./Screens/Register";
import Login from "./Screens/login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element ={<Home/>} exact />
          <Route  path="/register" element={<Register/>} />
          <Route  path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

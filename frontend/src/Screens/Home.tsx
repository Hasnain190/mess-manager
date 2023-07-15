import React from "react";

import './home.css'
import { Link } from "react-router-dom";

function Home() {
  return (

    <div className="body">
      {/* <!-- Main Content --> */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to Mess Manager</h1>
          <p className="lead">Manage your mess for Eice Muhammad Hostel efficiently</p>
          <Link to={'/login'} className="btn btn-light btn-lg">
            Login Get Started
          </Link>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Manage Users</h5>
                  <p className="card-text">Add, remove, and update users in your mess</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Attendance</h5>
                  <p className="card-text">Keep track of attendance for your mess members</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Bills</h5>
                  <p className="card-text">Calculate and manage bills for your mess</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>



  );
}

export default Home;

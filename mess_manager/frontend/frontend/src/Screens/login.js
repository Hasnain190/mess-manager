import React from 'react'
import './login.css'
function login() {
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-6 mx-auto">
                <div className="card card-body">
                    <h3 className="text-center mb-4">
                        <i className="fas fa-user-plus"></i> Login</h3>
                    <form>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter Password" />
                        </div>
                        
                        <button type="submit" className="btn btn-primary btn-block">
                            login</button>
                    </form>
                </div>
            </div>
        </div>

    </div>



       
    )
}

export default login

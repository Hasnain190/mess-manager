import React from 'react'
// register card



function Register() {
    return (
        // sign up form
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card card-body">
                        <h3 className="text-center mb-4">
                            <i className="fas fa-user-plus"></i> Register</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter Password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Confirm Password</label>
                                <input type="password" className="form-control" id="password2" placeholder="Confirm Password" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                Register</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register

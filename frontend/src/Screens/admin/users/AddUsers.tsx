import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { register } from "../../../actions/user_actions";

function AddUsers({ history }) {

    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();





    // credentiasls
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [room, setRoom] = useState("");
    const [hostel, setHostel] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const redirect = location.search ? location.search.split("=")[1] : "/";

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo, success } = userRegister;


    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(register(name, room, password, hostel, phone));


        }
    };

    useEffect(() => {
        if (success) {
            setMessage("The user added successfully")
        }
    }, [error, success])

    return (
        // sign up form
        <div className="container">
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card card-body">
                        <h3 className="text-center mb-4">
                            <i className="fas fa-user-plus"></i> Register
                        </h3>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="room">Your Room no.</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="room"
                                    placeholder="Enter room"
                                    required
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="room"> Hostel.</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="hostel"
                                    placeholder="Enter Hostel"
                                    required
                                    value={hostel}
                                    onChange={(e) => setHostel(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="room"> Phone Number</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Enter Your Phone"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password2"
                                    required
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                Register
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}


export default AddUsers

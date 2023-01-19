import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// @ts-expect-error TS(6142): Module '../../../components/Loader' was resolved t... Remove this comment to see the full error message
import Loader from "../../../components/Loader";
// @ts-expect-error TS(6142): Module '../../../components/Message' was resolved ... Remove this comment to see the full error message
import Message from "../../../components/Message";
import { register } from "../../../actions/user_actions";

function AddUsers({
    history
}: any) {

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

    // @ts-expect-error TS(2339): Property 'userRegister' does not exist on type 'De... Remove this comment to see the full error message
    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo, success } = userRegister;


    const submitHandler = (e: any) => {
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="container">
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            {message && <Message variant="danger">{message}</Message>}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            {error && <Message variant="danger">{error}</Message>}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            {loading && <Loader />}
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="row">
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="col-md-6 mx-auto">
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className="card card-body">
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <h3 className="text-center mb-4">
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <i className="fas fa-user-plus"></i> Register
                        </h3>
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <form onSubmit={submitHandler}>
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="form-group">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <label htmlFor="name">Name</label>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="form-group">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <label htmlFor="room">Your Room no.</label>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="form-group">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <label htmlFor="room"> Hostel.</label>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="form-group">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <label htmlFor="room"> Phone Number</label>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="form-group">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <label htmlFor="password">Password</label>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <div className="form-group">
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                <label htmlFor="password2">Confirm Password</label>
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

import React, { useState, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { register } from "../../../features/user/user_actions_creators";



function AddUsers() {

    const hostelName = "Eice Muhammad"
    const [message, setMessage] = useState("");
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();





    // credentials
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [room, setRoom] = useState<string>("");
    const [hostel, setHostel] = useState(hostelName);
    const [phone, setPhone] = useState("");

    const [securityFee, setSecurityFee] = useState(7000)

    const [isRegistered, setIsRegistered] = useState(false);

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const userRegister = useAppSelector((state) => state.userRegister);
    const { error, loading, userInfo, success } = userRegister;


    const submitHandler = (e: any) => {
        e.preventDefault();

        name.includes(" ") && setName(name.split(" ").join("_"))







        try {
            setPassword(name)

            dispatch(register(name, room, password, hostel, phone, securityFee));
            setMessage("The user added successfully")
            setIsRegistered(true)
        } catch (error) {
            setMessage(`There is some error: ${error}`)


        }


    };

    useEffect(() => {
        if (isRegistered) {
            navigate("/admin/view-users");
        }
    }, [isRegistered])

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

                            <i className="fas fa-user-plus"></i> Add a New Student
                        </h3>

                        <form onSubmit={submitHandler}>

                            <div className="form-group">

                                <label htmlFor="name">Username(must be unique)</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter Username"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </div>


                            <div className="form-group">

                                <label htmlFor="room">Room No.</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="room"
                                    placeholder="Enter room"
                                    required
                                    value={room}
                                    onChange={(e) => setRoom((e.target.value))}
                                />
                            </div>




                            <div className="form-group">

                                <label htmlFor="room">Security Deposit</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    id="security-fee"
                                    placeholder="Initial Security Deposits"
                                    required
                                    value={securityFee}
                                    onChange={(e) => setSecurityFee(Number(e.target.value))}
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

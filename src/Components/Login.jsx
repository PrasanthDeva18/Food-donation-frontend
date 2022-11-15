import React, { useState, useContext } from 'react';
import Axios from 'axios';
import userContext from '../Context/UserContext';
import Donor from './Donor/Donor';
import Admin from './admin/Admin';
import Reciever from './Receiver/Reciever'
import ErrorNotice from './ErrorNotice';
import './login.css'
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Login = ({ styleform }) => {
    
    const [userlogin, setUserlogin] = useState({
        email: '',
        password: ''
    });
    let { loggedInUser, setLoggedInUser } = useContext(userContext);
    const { role, setRole } = useContext(userContext);
    const [error, setError] = useState();



    const clearInput = () => {
        setUserlogin({

            email: '',
            password: ''
        });
    }
    const loginUser = (e) => {
        try {
            e.preventDefault();
            Axios.post('http://localhost:4000/users/login', userlogin)
                .then(res => {
                    // console.log('login user is',res.data[0]);
                    const loginUser = res.data[0];
                    setLoggedInUser({
                        token: loginUser.token,
                        firstname: loginUser.firstname,
                        lastname: loginUser.lastname,
                        email: loginUser.email,
                        role: loginUser.role,
                        id: loginUser.id
                    });
                    setRole(loginUser.role);

                    localStorage.setItem("auth-token", loginUser.token);


                    // console.log('logged in user',loggedInUser);
                }).catch(err => {
                    console.log(err);
                    err.response.data.msg && setError(err.response.data.msg);

                });
            clearInput();
        }
        catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }
    const updateField = e => {

        setUserlogin({
            ...userlogin,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            {
                role === 'Admin' ?
                    <Admin /> :
                    role === 'Donor' ?
                        <Donor styleform={styleform} /> :
                        role === 'Reciever' ?
                            <Reciever /> :
                            <div className='outer'>
                            <form className='components log' onSubmit={loginUser}>
                                <div className="top-label">
                                    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}

                                    <h1>Sign In</h1>
                                </div>
                                <br />
                                <div>
                                    <label className='text-label' htmlFor="email">Email</label>
                                </div>
                                <div>
                                    <input
                                        className='input-box'
                                        id="email"
                                        value={userlogin.email}
                                        onChange={(e) => updateField(e)}
                                        placeholder="Email address"
                                        type="email"
                                        name="email"
                                        required
                                    />
                                </div>
                                <br />
                                <div>
                                    <label className='text-label' htmlFor="password">Password</label>
                                </div>
                                <div>
                                    <input
                                        className='input-box'
                                        id="password"
                                        value={userlogin.password}
                                        onChange={(e) => updateField(e)}
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        required
                                    />
                                </div>
                                <br />
                                <div>
                                    <button type="submit" className="btn-submit btn btn-primary">Login</button>
                                </div>
                                <p>New user<Link to="/signup">Signup</Link></p>
                            </form>
                            </div>
            }
            <Footer/>
        </>

    )
}
export default Login;
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Axios from 'axios';
import Navbar from './Components/navbar/Navbar'
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home/Home';
import userContext from './Context/UserContext';
import Footer from './Components/Footer';
import About from './Components/about/About';
import Contactus from './Components/Conatus';

const App = () => {

    let [registereduser, setRegisteredUser] = useState({
        token: undefined,
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        role: undefined,
        id: undefined
    });
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    let [userregistered, setUserRegistered] = useState('');
    let [role, setRole] = useState('');
    const [loggedInUser, setLoggedInUser] = useState('');
    const [modal, setModal] = useState({
        show: false
    });

    const [usersdata, setUsersData] = useState([]);
    const [recieverusers, setrecieverUsers] = useState([]);

    console.log(recieverusers)



    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            console.log('auth-token', token);
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post('http://localhost:4000/users/tokenIsValid',
                null,
                { headers: { "x-auth-token": token } }
            );
            if (tokenRes.data) {
                const userRes = await Axios.get('http://localhost:4000/users/user',
                    { headers: { "x-auth-token": token } }
                );
                setUserData({
                    token,
                    user: userRes.data,
                })
                console.log('setuserdata', userData)
            }
        }
        checkLoggedIn();

    }, [])
    return (

       
            <userContext.Provider
                value={{
                    userData,
                    setUserData,
                    userregistered,
                    setUserRegistered,
                    role,
                    setRole,
                    registereduser,
                    setRegisteredUser,
                    loggedInUser,
                    setLoggedInUser,
                    modal,
                    setModal,
                    usersdata,
                    setUsersData,
                    recieverusers,
                    setrecieverUsers
                }}>
                <Navbar />
              
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path='/contact' element={<Contactus/>}/>
                </Routes>
                {/* <Footer/> */}
               
            </userContext.Provider>



    )

}
export default App;
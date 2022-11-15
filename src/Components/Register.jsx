import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Donor from './Donor/Donor'
import Admin from './admin/Admin';
import Reciever from './Receiver/Reciever';
import userContext from '../Context/UserContext';
import ErrorNotice from './ErrorNotice';
import './register.css'
import { Link } from 'react-router-dom';
import Footer from './Footer';
const Register = () =>{
    let {  setUserRegistered} = useContext(userContext);
    const [error, setError] = useState();
    let { registereduser} = useContext(userContext);

    const styleform = {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'50px'
    }
    const [userinfo, setUserinfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
        role: ''
    });
    const { role, setRole } = useContext(userContext);


   
        const clearInput = () => {
            setUserinfo({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirm_password: '',
                role:''
              });
        }
        const saveUser = (e) => {
            try{
            e.preventDefault();
            const headers = {
                'Content-Type': 'application/json'
              }
              axios.post('http://localhost:4000/users/createUser', userinfo,{
                headers: headers
            }).then(res => {
                // console.log('users are',res.data);  
                // console.log('users are',res.data[0].id);                
                const user_id = res.data[0].id;
                let users = [];
                const Token = res.data[0].token;
                localStorage.setItem("auth-token", Token);

                axios.get(`http://localhost:4000/users/fetchUser/${user_id}`,
                { headers: { "x-auth-token": Token } })
                .then(res => {
                    // console.log('users are',res);
                    // users = JSON.stringify(res.data);
                    users = res.data[0];
                    // console.log('bd',users);
                    registereduser = ({
                        token: users.token,
                        firstname: users.firstname,
                        lastname: users.lastname,
                        email: users.email,
                        role:users.role,
                        id: users._id

                    });  
                    setRole(registereduser.role);
                    setUserRegistered( registereduser);
                    // console.log('userRegistered....',userregistered);
                    // console.log('role',role);
                    // console.log('state',registereduser); 
                    // console.log('userrrr',registereduser.firstname,registereduser.token);   
                    
                }).catch(err => {
                     console.log(err);
                    err.response.data.msg && setError(err.response.data.msg);

                }) ;
                
            }).catch(err => {
                 console.log(err);
                err.response.data.msg && setError(err.response.data.msg);

            }) ; 
        
            clearInput();
        }
        catch(err)
        {
            err.response.data.msg && setError(err.response.data.msg);
        }
        }
        const updateField = e => {

            setUserinfo({
              ...userinfo,
              [e.target.name]: e.target.value
            });
          };
          useEffect(()=>{
            // console.log('role useEffect',role);

       },[role])
    return(
        
        <>
            {
             role === 'Admin' ? 
             <Admin /> :
             role === 'Donor' ?
             <Donor /> :
             role === 'Reciever' ? 
             <Reciever styleform={styleform} /> :
              
            <form className='components back signup-component ' style={styleform}   onSubmit={saveUser}>
                <div className="top-label ">
                    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                    <h1 > Register </h1>

                </div>  
                    <div>
                    <label className='text-label ln form-label' htmlFor="firstname">First Name</label>
                    </div>
                    <div>
                     <input
                        className='input-box ib'
                        id="firstname"
                        value={userinfo.firstname}
                        onChange={(e) => updateField(e)}
                        placeholder="First name"
                        type="text"
                        name="firstname"
                        required
                />
              
              
                </div>
                <br/>
                    <div>
                        <label className='text-label' htmlFor="lastname">Last Name</label>
                    </div>
                <div>   
                <input
                    className='input-box'
                    id="lastname"
                    value={userinfo.lastname}
                    onChange={(e) => updateField(e)}
                    placeholder="Last name"
                    type="text"
                    name="lastname"
                    required
                />
                </div>
                <br/>
                <div>
                    <label className='text-label' htmlFor="email">Email</label>
                </div>
                <div>
                <input
                    className='input-box'
                    id="email"
                    value={userinfo.email}
                    onChange={(e) => updateField(e)}
                    placeholder="Email address"
                    type="email"
                    name="email"
                    required
                />
                </div>
                <br/>
               
                <div>
                    <label className='text-label' htmlFor="password">Password</label>
                </div>
                <div>
                <input
                    className='input-box'
                    id="password"
                    value={userinfo.password}
                    onChange={(e) => updateField(e)}
                    placeholder="Password"
                    type="password"
                    name="password"
                    required
                />
                </div>
                <br/>
              
                <div>
                    <label className='text-label' htmlFor="confirm_password">Confirm-Password</label>
                </div>
                <div>
                <input
                    className='input-box'
                    id="confirm_password"
                    value={userinfo.confirm_password}
                    onChange={(e) => updateField(e)}
                    placeholder="Confirm-Password"
                    type="password"
                    name="confirm_password"
                    required
                />
                </div>
                <br/>
              
                <div>
                    <label className='text-label' htmlFor="role">Role</label>
                </div>
                
                <div>
                    <select 
                    value={userinfo.role} 
                    className='input-box' 
                    name="role" id="role" 
                    onChange={(e) => updateField(e)}
                    required>
                        
                        <option value="Select">Select</option>
                        {/* <option value="Admin">Admin</option> */}
                        <option value="Donor">Donor</option>
                        <option value="Reciever">Reciever</option>
                    </select>
                </div>
                <br/>
                <br/>
                <div >
                <button type="submit" className="btn-submit btn btn-primary">Sign Up</button>
                </div>
                <p>Already registered user <Link to='/login'>Login</Link></p>
            </form>
           
            
            }
            <Footer/>
        </>
        
    )
}
export default Register;
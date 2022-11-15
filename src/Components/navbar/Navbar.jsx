import React, { useContext, useEffect } from 'react';
import userContext from '../../Context/UserContext'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  const { userData, setUserData } = useContext(userContext);
  const { role, setRole } = useContext(userContext);
  let { userregistered, setUserRegistered } = useContext(userContext);
  let { setRegisteredUser } = useContext(userContext);
  let { loggedInUser, setLoggedInUser } = useContext(userContext);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    setUserRegistered(undefined);
    setRole(undefined);
    setRegisteredUser(undefined);
    setLoggedInUser(undefined);
    localStorage.setItem('auth-token', '');
  }
  useEffect(() => {
    // console.log('userregistered useEffect',userregistered);
  }, [userregistered]);

  useEffect(() => {
    // console.log('logged in user useEffect',loggedInUser);
  }, [loggedInUser]);

  useEffect(() => {
    // console.log('logged in user useEffect',loggedInUser);
  }, [role]);



  return (
    <div className='nav-items'>
      <nav class="navbar navbar-expand-lg navbar-light  fixed-top" style={{ 'backgroundColor': '#96e0a8' }}>
        <div class="container-fluid">
          <Link class="navbar-brand" to='/'>  Donation Website</Link >
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul class="navbar-nav ">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to='/'>Home</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to='/about'>About us</Link >
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to='/contact'>Contact us</Link>
              </li>
              {/* <li className='nav-item'>
              <Link className='nav-link active' to="/model">View</Link>
              </li> */}
              {
                userData.user || userregistered || loggedInUser ? (
                  <button className='btn btn-danger' onClick={logout}>Log out</button>
                ) : (
                  <>
                    <li class="nav-item">
                      <Link class="nav-link active" to='/login'>Login</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link active" to='/signup'>Register</Link>
                    </li>
                    {localStorage.setItem('auth-token', '')}
                  </>
                )

              }

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar


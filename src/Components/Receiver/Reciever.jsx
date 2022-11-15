import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../Context/UserContext';
import axios from 'axios';

const Customer = () => {
    const { recieverusers, setrecieverUsers } = useContext(userContext);
    let { loggedInUser } = useContext(userContext);
    let { userregistered } = useContext(userContext);
    const [userInfo, setUserInfo] = useState({
        firstname: undefined,
        id: undefined
    })
    let Token = localStorage.getItem("auth-token");



    let RecieverData = [];
    const getRecieverUser = () => {
        axios.get(`http://localhost:4000/users/getRecieverUsers`,
            { headers: { "x-auth-token": Token } })
            .then(res => {
                RecieverData = res.data;
                setrecieverUsers(RecieverData);
            }).catch(err => {
                console.log(err);
            })

    }
    // const handleDeleteProperty = async (id) => {
    //     try{
    //         const res = await axios.delete(`http://localhost:4000/users/deletedonation`, id);
    //         if(res.data.success){
    //             alert(res.data.msg);
    //         }
    //     }
    //     catch(err){
    //         console.error(err);
    //     }
    // }

    const deletepro = (id) => {
        axios.delete(`http://localhost:4000/users/deletedonation/${id}`).then(
            setrecieverUsers(
                recieverusers.filter((val) => {
                    return val._id !== id;
                })
            )
        )
        alert("succesfully deleted")
    }

    useEffect(() => {
        getRecieverUser()
        if (loggedInUser) {
            setUserInfo({
                firstname: loggedInUser.firstname,
                id: loggedInUser.id
            });

        }
        if (userregistered) {
            setUserInfo({
                firstname: userregistered.firstname,
                id: userregistered.id
            });

        }

    }, [loggedInUser, userregistered])


    return (
        <div className="components admin-component customer-component">
            <h3 className="top-label">Welcome
                <span
                    style={{
                        fontSize: '2rem',
                        color: '#7c0b0b',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        marginLeft: '1rem'
                    }}>

                    {userInfo.firstname}
                </span>
            </h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Foodtype</th>
                        <th>Address</th>
                        <th>PhoneNumber</th>
                        <th>Quality</th>
                        <th>Cooking Time</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recieverusers.map(user => user.customerId === userInfo.id && user.state === 'Approved' ?
                            <tr>
                                <td style={{ 'color': '#08eb00' }}>{user.state}</td>
                                <td>{user.foodtype}</td>
                                <td>{user.address}</td>
                                <td>{user.phonenumber}</td>
                                <td>{user.quality}</td>
                                <td>{user.date}</td>
                                <td><button className='btn btn-danger' onClick={(e) => {
                                    e.preventDefault();
                                    deletepro(user._id)
                                }}>delete</button></td>
                            </tr>
                            :
                            ''
                        )
                    }
                </tbody>

            </table>

        </div>
    )
}
export default Customer;
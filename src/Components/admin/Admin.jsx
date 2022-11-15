import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import DonationModal from '../DonationModal';
import userContext from '../../Context/UserContext';


const Admin = () => {

    const { usersdata, setUsersData } = useContext(userContext);
    const { recieverusers, setrecieverUsers } = useContext(userContext);
    const { setModal } = useContext(userContext);

    const [customerId, setcustomerId] = useState('')

    let users = [];
    const getUsers = () => {
        let Token = localStorage.getItem("auth-token");

        axios.get('http://localhost:4000/users/',
            { headers: { "x-auth-token": Token } })
            .then(res => {
                users = res.data;
                setUsersData(users);

            }).catch(err => {
                console.log(err);
            });
    }
    let RecieverData = [];
    const getRecieverUsers = () => {
        let Token = localStorage.getItem("auth-token");

        axios.get(`http://localhost:4000/users/getRecieverUsers`,
            { headers: { "x-auth-token": Token } })
            .then(res => {
                // console.log('loan users are',res);  
                RecieverData = res.data;
                setrecieverUsers(RecieverData);
                // console.log(loanusers);  
            }).catch(err => {
                console.log(err);
            })

    }
    const FoodApproval = (customerId) => {
        let Token = localStorage.getItem("auth-token");

        axios.patch(`http://localhost:4000/users/approveFood/${customerId}`, null,
            { headers: { "x-auth-token": Token } })
            .then(res => {

                RecieverData = res.data;
                setrecieverUsers(RecieverData);
                alert('Food has been successfully approved...');
            }).catch(err => {
                console.log(err);
            })
    }
    const DonationRejection = (customerId) => {
        let Token = localStorage.getItem("auth-token");

        axios.patch(`http://localhost:4000/users/rejectFood/${customerId}`, null,
            { headers: { "x-auth-token": Token } })
            .then(res => {
                RecieverData = res.data;
                setrecieverUsers(RecieverData);
                alert('Food has been successfully rejected...');

            }).catch(err => {
                console.log(err);
            })
    }
    const showModal = (userid) => {
        setModal({
            show: true
        });
        setcustomerId(userid);
    }
    useEffect(() => {
        getUsers();
        getRecieverUsers();
    }, [setrecieverUsers])
    return (
        <div className='table'>
           <DonationModal donationid={customerId} />
            <h1>Donor Requests</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Email</th>
                        <th scope='col'>View Details</th>
                        <th scope="col">Accept</th>
                        <th scope='col'>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersdata.map(user => user.role === 'Reciever' ?
                            <tr>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                {/* {
                                    recieverusers.map(donation=>donation.customerId === customerId ?
                                        <tr>
                                        <td>{donation.foodtype}</td>
                                        <td>{donation.phonenumber}</td>
                                        <td>{donation.address}</td>
                                        <td>{donation.quality}</td>
                                        </tr>
                                        :'' )
                                } */}
                                <td style={{ textAlign: 'center' }}>
                                    <button className="edit-btn btn btn-dark" onClick={() => showModal(user._id)}>View</button>
                                </td>
                                {
                                    recieverusers.map(Dusers => Dusers.customerId === user._id ?
                                        Dusers.state === 'New' ?
                                            <>
                                                <td><button className="edit-btn btn btn-success" onClick={() => FoodApproval(Dusers.customerId)}>Approve Food</button></td>
                                                <td><button className="edit-btn btn btn-danger" onClick={() => DonationRejection(Dusers.customerId)}>Reject Food</button></td>
                                            </>
                                            : ''
                                        : '')
                                }
                            </tr>


                            : '')
                    }

                </tbody>
            </table>

        </div>
    )

}





export default Admin
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import userContext from '../../Context/UserContext';
import DonationModal from '../DonationModal';
import ErrorNotice from '../ErrorNotice';

function Donor() {

    const { modal, setModal } = useContext(userContext);
    const [recieverCustId, setrecieverCustId] = useState('');
    const [error, setError] = useState();
    const [usersdata, setUsersData] = useState([]);
    const [userDonation, setUserDonation] = useState({
        foodtype: '',
        phonenumber: '',
        address: '',
        quality: '',
        date: '',
        customerId: ''
    });
    let [donationusers, setdonationusers] = useState([]);

    let users = [];
    const getUsers = () => {
        let Token = localStorage.getItem("auth-token");

        axios.get('http://localhost:4000/users/',
            { headers: { "x-auth-token": Token } })
            .then(res => {
                // console.log('users are',res);
                users = res.data;
                setUsersData(users);

            }).catch(err => {
                console.log(err);
                err.response.data.msg && setError(err.response.data.msg);

            });

    }

    let recieverdata = [];

    const getrecieverdata = () => {

        let Token = localStorage.getItem("auth-token");

        axios.get(`http://localhost:4000/users/getRecieverUsers`,
            { headers: { "x-auth-token": Token } })
            .then(res => {
                recieverdata = JSON.stringify(res.data);
                donationusers = recieverdata;

            }).catch(err => {
                console.log(err);
                err.response.data.msg && setError(err.response.data.msg);

            })

    }

    const showModal = (userid) => {
        setModal({
            show: true
        });
        setrecieverCustId(userid);
    }
    useEffect(() => {
        getUsers();
        getrecieverdata()
    }, [donationusers])

    const clearInput = () => {
        setUserDonation({
            foodtype: '',
            phonenumber: '',
            address: '',
            quality: '',
            date: '',
            customerId: ''

        });
    }

    const updateField = e => {
        // console.log(e.target.name)
        // console.log(e.target.value)

        setUserDonation({

            ...userDonation,
            [e.target.name]: e.target.value
        });
    };

    const saveDonationData = (e) => {
        e.preventDefault();
        let Token = localStorage.getItem("auth-token");

        axios.post('http://localhost:4000/users/donatefood', userDonation,
            { headers: { "x-auth-token": Token } })
            .then(res => {
                // console.log('users are',res);  
                console.log('users are',res.data);
                // console.log(res.message);
                alert('Donation has been done successfully ..');

            }).catch(err => {
                console.log(err);
                err.response.data.msg && setError(err.response.data.msg);

            });

        clearInput();
    }
    return (
        <div>
            <DonationModal donationid={recieverCustId} />
            <div>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                <span >Reciever Details :</span>
            </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">Firstname</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Donate Food</th>
                            <th scope='col'>Donation Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersdata.map((user) => user.role === 'Reciever' ?
                                <tr className='table'>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button className="edit-btn btn btn-dark" onClick={() => showModal(user._id)}>View</button>
                                    </td>
                                    <td>
                                        <form className='for'>
                                            <div>
                                                <label  class="form-label">Food Type</label>
                                                <input
                                                    className='input-box form-control'
                                                    id="foodtype"
                                                    value={userDonation.foodtype}
                                                    onChange={(e) => updateField(e)}
                                                    type="text"
                                                    name="foodtype"
                                                    required
                                                />
                                            </div>
                                            <br />
                                            <div>
                                                <label className="form-label">Address</label>
                                                <input  className='input-box form-control' type="text" name="address" id='address' value={userDonation.address} onChange={(e) => updateField(e)} />
                                            </div>
                                            <div>
                                                <label className='form-label'>Phone number</label>
                                                <input  className='input-box form-control' type="text" name="phonenumber" id='phonenumber' value={userDonation.phonenumber} onChange={(e) => updateField(e)} />
                                            </div>
                                            <br />
                                            <div>
                                                <label className='form-label'>Date and Time</label>
                                                <input  className='input-box form-control' type="datetime-local" name="date" id='date' value={userDonation.date} onChange={(e) => updateField(e)} />
                                            </div>
                                            <br />
                                            <div>
                                                <label className='form-label'>Quality</label>
                                                <select
                                                    value={userDonation.quality}
                                                    onChange={(e) => {
                                                        setUserDonation({ ...userDonation, [userDonation.customerId]: user._id });
                                                        userDonation.customerId = user._id;
                                                        updateField(e);
                                                    }}
                                                    name="quality"
                                                    id='quality'
                                                    className='input-box form-select'
                                                    required>

                                                    <option value="quality">quality of food</option>
                                                    <option value="5">5</option>
                                                    <option value="4">4</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                            <br />
                                            <button type="button" class="btn btn-success bg-success" onClick={saveDonationData}>Donate Food</button>
                                        </form>
                                    </td>

                                </tr>

                                : '')
                        }
                    </tbody>

                </table>


          

        </div>
    )

}

export default Donor;
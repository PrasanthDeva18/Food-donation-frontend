import React, { useContext } from 'react';
import userContext from '../Context/UserContext';
import axios from 'axios';

const DonationModal = ({ donationid }) => {
    const { recieverusers, setrecieverUsers } = useContext(userContext);
    const { modal, setModal } = useContext(userContext);
    const closeModal = () => {
        setModal({
            show: false
        });
        //   console.log('modal state',modal)
    }
    const deletepro = (id) => {
        axios.delete(`http://localhost:4000/users/deletedonation/${id}`).then(
            setrecieverUsers(
                recieverusers.filter((val) => {
                    return val._id !== id;
                })
            )
        )
        alert("succesfully deleted");
    }

    return (
        !modal.show ?
            null :
            <div className="loan-modal">
                <div className='modal-header'>
                    <h3 className="top-label">Donation Deatils :</h3>
                    <button className=" modal-close-btn" onClick={closeModal}>x</button>
                </div>
                <div className="">
                    <table className="loan-modal-table table">
                        <thead>
                            <tr>
                                <th>State</th>
                                <th>FoodType</th>
                                <th>phonenumber</th>
                                <th>Address</th>
                                <th>Quality</th>
                                <th>Cooking Time</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                recieverusers.map(donation => donation.state === 'Approved' && donation.customerId === donationid ?
                                    <tr>
                                        <td style={{ 'color': '#08eb00' }} >{donation.state}</td>
                                        <td>{donation.foodtype}</td>
                                        <td>{donation.phonenumber}</td>
                                        <td>{donation.address}</td>
                                        <td>{donation.quality}</td>
                                        <td>{donation.date}</td>
                                        <td><button className='btn btn-danger' onClick={(e) => {
                                            e.preventDefault();
                                            deletepro(donation._id)
                                        }}>delete</button></td>
                                    </tr>
                                    : ''
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>



    )
}

export default DonationModal

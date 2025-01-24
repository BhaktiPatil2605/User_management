// UserTable.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser,deleteUser } from '../api/userApi';
import Swal from 'sweetalert2';

function UserTable({ onEdit }) { //when click on edit it set the value of the state to the user that was clicked define in app.js
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchUser();
            setUsers(data || []);
        };
        getUsers();
    }, []);

    // console.log(users);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/add-edit'); 
    };

    // function to run when click on delete button
    const handleDelete = async (userId) => {
        // e.preventDefault();
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to undo this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmed.isConfirmed) {
            try {
                const response = await deleteUser(userId); // Call the delete API
                if (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The user has been deleted.',
                        timer: 2000,
                        showConfirmButton: false,
                        toast: true,
                        position: 'top-end',
                    });
                    // Remove deleted user from the state
                    setUsers(users.filter((user) => user.id !== userId));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed!',
                        text: response.message || 'Failed to delete user.',
                    });
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something went wrong. Please try again later.',
                });
            }
        }
    }
    return (
        <div>
            <div className="d-flex">
                <div className="main-content">
                    <div className="container mt-2">
                        <h2 className="text-center" style={{ color: "white" }}>
                            User List
                        </h2>
                        <hr />
                            <button className='btn btn-success mb-3' style={{float:'right'}} onClick={handleClick}><i class="fa-solid fa-plus"></i> &nbsp; Add User</button>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date of Birth</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.dob}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button className="btn btn-warning mx-2" onClick={() => onEdit(user)}><i class="fa-solid fa-pen-to-square" style={{color:'white'}}></i></button>
                                            <button className="btn btn-danger" onClick={()=>handleDelete(user.id)}><i class="fa-solid fa-trash" ></i></button>
                                           
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserTable;

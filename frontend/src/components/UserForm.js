import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { createUser, updateUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';



function UserForm({ userToEdit, onUserUpdated }) {

    const [user, setUser] = useState({ name: '', dob: '', email: '', password: '' })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (userToEdit) {
            setUser(userToEdit);
        }else {
            setUser({ name: '', dob: '', email: '', password: '' }); // Reset form 
        }
    }, [userToEdit])

    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value }) //take the value by its name on the change of input tag
    }


    // when form gets submit call this function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (userToEdit) {
                // Edit user
                response = await updateUser(userToEdit.id, user);
            } else {
                // Add user
                response = await createUser(user);
            }
            // console.log(response);
            if (response.success) {
                // const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.message,
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    showConfirmButton: false
                }).then(()=>{
                    navigate('/'); //navigate to list page
                })
                
                setErrors({}); // Clear errors
                setUser({ name: '', dob: '', email: '', password: '' }); // Reset form
                onUserUpdated(); // once update call this user to make the state null this is define in app.js
            } else if (response.message === 'error') {
                // const data = await response.json();
                setErrors(response.errors || {}); // Set validation errors
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "An expected error occured!",
                })
            }
        } catch (error) {
            // console.error("Error:", error);
            // alert(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            })
        }
        // console.log(user);
    }

    // function to return the error message
    const getError = (field) => {
        // console.log(errors);
        return errors[field] ? errors[field][0] : '';
    };

    // when back button is hit this function is called
    const handleBack = () => {
        console.log('back button');
        onUserUpdated();
        setUser({ name: '', dob: '', email: '', password: '' }); // Reset the form state
        setErrors({}); // Clear errors
        navigate('/'); // Redirect to the list page
    };


    return (
        <div>

            <div className="d-flex">
                <div className="main-content">
                    <div className="container mt-2">
                        <h2 className="text-center" style={{ color: "white" }}>
                            User Form
                        </h2>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="mb-2">
                                            <label htmlFor="name" className="form-label">
                                                Name
                                            </label>
                                            <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" onChange={onchange} value={user.name} />
                                            <small className='error-message' id='name_error'>{getError('name')}</small>

                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="dob" className="form-label">
                                                Date of Birth
                                            </label>
                                            <input type="date" className="form-control" id="dob" name="dob" placeholder="Enter DOB" onChange={onchange} value={user.dob} />
                                            <small className='error-message' id='dob_error'>{getError('dob')}</small>

                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            
                                            <input type="text" className="form-control" id="email" name="email" placeholder="Enter Email Address" onChange={onchange} value={user.email} />
                                            <small className='error-message' id='email_error'>{getError('email')}</small>

                                        </div>
                                        {!userToEdit && ( // If userToEdit is false show the password field
                                            <div className="mb-2">
                                                <label htmlFor="password" className="form-label">
                                                    Password
                                                </label>
                                                <input type="text" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={onchange} value={user.password || ''} // Add a value binding for controlled input
                                                />
                                                <small className="error-message" id="password_error">
                                                    {getError('password')}
                                                </small>
                                            </div>
                                        )}
                                    </div>

                                </div>


                                <div className="text-end">
                                    <button className="btn btn-secondary" style={{ float: 'left' }} type="button" onClick={handleBack}>
                                        Back
                                    </button>
                                    <button className="btn btn-primary" style={{ float: 'right' }} type="submit">
                                        {userToEdit ? 'Edit User' : 'Add User'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm

import React from 'react'

function UserForm() {
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

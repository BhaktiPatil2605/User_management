import React from 'react'

function UserTable() {
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

export default UserTable

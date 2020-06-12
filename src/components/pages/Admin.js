import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const Admin = () => {
    const [users, setUser] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        loadUsers();
    }, []);
    const loadUsers= async () => {
        const result = await axios.get("http://localhost:3003/users");
        setUser(result.data.reverse());
    };
    const deleteUser= async id => {
        await axios.delete(`http://localhost:3003/users/${id}`);
        loadUsers();
    }
    let filteredUsers = users.filter(
        (user) => {
            return user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
    );
    return (
        <div className="container">
            <div className="py-4">
                <h1>Admin Page</h1>
                <input className="my-3 shadow form-control" type="text" placeholder="Search Bar" 
                    onChange={e => setSearch(e.target.value)}/>
                <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user,index)=>(
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link className="btn btn-primary mr-2" to={`users/${user.id}`}>View</Link>
                                        <Link className="btn btn-outline-primary mr-2" to={`users/edit/${user.id}`}>Edit</Link>
                                        <button className="btn btn-danger" onClick={()=>deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin;
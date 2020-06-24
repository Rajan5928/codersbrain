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
        setUser(result.data);
    };
    const deleteUser= async id => {
        await axios.delete(`http://localhost:3003/users/${id}`);
        loadUsers();
    }
    
    let filteredUsers = users.filter(
        (user) => {
            return user.Provider.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }
    );
    
    return (
        <div className="container position-relative">
            <div className="py-4">
                <div className="d-flex justify-content-between">
                    <h1>Admin Page</h1>
                </div>
                <input className="my-3 shadow form-control" type="text" placeholder="Search By Provider" 
                    onChange={e => setSearch(e.target.value)}/>
                <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Course ID</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Provider</th>
                            <th scope="col">Universities/Institutions</th>
                            <th scope="col">Parent Subject</th>
                            <th scope="col">Child Subject</th>
                            <th scope="col">URL</th>
                            <th scope="col">Next Session Date</th>
                            <th scope="col">Length</th>
                            <th scope="col">Video URL</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user,index)=>(
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.CourseName}</td>
                                    <td>{user.Provider}</td>
                                    <td>{user.Universities}</td>
                                    <td>{user.ParentSubject}</td>
                                    <td>{user.ChildSubject}</td>
                                    <td><a href={user.Url} target="_blank">{user.Url}</a></td>
                                    <td>{user.NextSessionDate}</td>
                                    <td>{user.Length}</td>
                                    <td><a href={user.VideoUrl} target="_blank">{user.VideoUrl}</a></td>
                                    <td>
                                        {/* <Link className="btn btn-primary mr-2" to={`users/${user.id}`}>View</Link> */}
                                        {/* <Link className="btn btn-outline-primary mr-2" to={`users/edit/${user.id}`}>Edit</Link> */}
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
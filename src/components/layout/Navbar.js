import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { CSVLink} from "react-csv";
import {Link, NavLink} from 'react-router-dom';
const Navbar = () => {
    const [users, setUser] = useState([]);
    useEffect(() => {
        loadUsers();
    }, []);
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3003/users");
        setUser(result.data);
    };
    const k= JSON.parse(JSON.stringify(users));
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <a className="navbar-brand" href="/">CODERSBRAIN</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/admin">Admin</NavLink>
                        </li>
                    </ul>
                </div>

                <CSVLink data={k} className="btn btn-outline-light mr-2" >Export Data</CSVLink>
                <Link className="btn btn-outline-light" to="/users/add">Add User</Link>
            </div>
            
        </nav>
    )
}

export default Navbar;
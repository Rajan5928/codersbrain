import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { CSVLink} from "react-csv";
import {Link, NavLink} from 'react-router-dom';
import jsPDF from "jspdf";
import "jspdf-autotable";

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

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "INVOICE";
        const headers = [["Sl.No", "Brand Friend Name", "Business Name", "Transaction ID"]];

        const data = k.map((elt, index) => [index + 1, elt.name, elt.username, elt.email]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">
                <a className="navbar-brand" href="/">CareerLabs</a>
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
                <CSVLink data={k} className="btn btn-outline-light mr-2" onClick={() => exportPDF()}>Export Data</CSVLink>
                    {/* <Link className="btn btn-outline-light" to="/users/add">Create Course</Link> */}
            </div>
            
        </nav>
    )
}

export default Navbar;
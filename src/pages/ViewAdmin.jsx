import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
const ViewAdmin = () => {
    const [users, setUsers] = useState([
        {
            firstName: "-",
            lastName: "-",
            userName: "-",
            email: "-",
            sessionLocation: "-",
            address: "-",
        },
    ]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
            });
    }, []);

    return (
        <div id="AdminPage" className="pageContainer">
            <section className="header">
                <h1>Admin Panel</h1>
                <NavBar />
            </section>

            <section className="main">
                <table>
                    <thead>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Session Location</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.sessionLocation}</td>
                                    <td>
                                        {user.address.city}{" "}
                                        {user.address.country}{" "}
                                        {user.address.postcode}
                                    </td>
                                    <td>
                                        <button>EDIT</button>
                                        <button>DELETE</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
            <section className="footer">Welcome</section>
        </div>
    );
};

export default ViewAdmin;

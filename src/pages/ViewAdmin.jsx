import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ViewAdmin = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
            <header>
                <h1>Admin Panel</h1>
                <NavBar />
            </header>

            <main>
                {users ? (
                    users.map((user) => (
                        <Accordion
                            expanded={expanded === `panel${user.id}`}
                            onChange={handleChange(`panel${user.id}`)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${user.id}bh-content`}
                                id={`panel${user.id}bh-header`}
                            >
                                <Typography
                                    sx={{ width: "33%", flexShrink: 0 }}
                                >
                                    AVATAR
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                    I am an accordion
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Nulla facilisi. Phasellus sollicitudin nulla
                                    et quam mattis feugiat. Aliquam eget maximus
                                    est, id dignissim quam.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <>
                        <p>Datas loading</p>
                        <p>please wait a bit</p>
                    </>
                )}

                {/* <table>
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
                </table> */}
            </main>
            <footer>Welcome</footer>
        </div>
    );
};

export default ViewAdmin;

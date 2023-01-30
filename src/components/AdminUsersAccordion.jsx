import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const AdminUsersAccordion = (users, setUsers) => {
    const usersList = users.users;
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const editUser = (user) => {
        console.log(user);
    };

    const deleteUser = (user) => {
        console.log(user.id);
    };

    return (
        <>
            {usersList.map((user) => (
                <div className="userInfos" key={user.id}>
                    <Accordion
                        expanded={expanded === `panel${user.id}`}
                        onChange={handleChange(`panel${user.id}`)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${user.id}bh-content`}
                            id={`panel${user.id}bh-header`}
                        >
                            <Typography className="leftSide">
                                <EditIcon onClick={() => editUser(user)} />
                                <DeleteIcon onClick={() => deleteUser(user)} />
                            </Typography>
                            <Typography className="middle">AVATAR</Typography>
                            <Typography className="rightSide">
                                {user.userName}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li>Firstname : {user.firstName}</li>
                                <li>Lastname : {user.lastName}</li>
                                <li>Email : {user.email}</li>

                                <li>Address : "top"</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </>
    );
};

export default AdminUsersAccordion;

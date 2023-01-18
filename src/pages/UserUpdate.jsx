import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserUpdate = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [formDatas, setFormDatas] = useState({});

    const handleChange = (e) => {
        setFormDatas({
            ...formDatas,
            [e.target.name]: e.target.value,
            address: {
                ...formDatas.address,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const sanitizeDatas = {
            email: formDatas.email,
            roles: [formDatas.roles],
            password: formDatas.password,
            firstName: formDatas.firstName,
            lastName: formDatas.lastName,
            username: formDatas.userName,
            address: {
                latitude: formDatas.latitude,
                longitude: formDatas.longitude,
                country: formDatas.country,
                region: formDatas.region,
                postcode: parseInt(formDatas.postcode),
                city: formDatas.city,
                street: formDatas.street,
                streetNumber: parseInt(formDatas.streetNumber),
            },
            session: [
                {
                    location: formDatas.location,
                    startDate: formDatas.startDate,
                    endDate: formDatas.endDate,
                },
            ],
            language: [
                {
                    name: formDatas.languageName,
                },
            ],
            contactLink: [
                {
                    url: formDatas.contactLinkUrl,
                    social: {
                        name: formDatas.contactLinkName,
                    },
                },
            ],
        };

        axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/users`, sanitizeDatas, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("success");
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.message);
                console.log(err.response);
            });
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`)
            .then((res) => {
                setUser(res.data);
                setFormDatas({
                    email: res.data.email || "",
                    roles: [res.data.roles || ""],
                    password: res.data.password || "",
                    firstName: res.data.firstName || "",
                    lastName: res.data.lastName || "",
                    username: res.data.userName || "",
                    address: {
                        latitude: res.data.latitude || "",
                        longitude: res.data.longitude || "",
                        country: res.data.country || "",
                        region: res.data.region || "",
                        postcode: res.data.postcode || "",
                        city: res.data.city || "",
                        street: res.data.street || "",
                        streetNumber: res.data.streetNumber || "",
                    },
                    session: [
                        {
                            location: res.data.location || "",
                            startDate: res.data.startDate || "",
                            endDate: res.data.endDate || "",
                        },
                    ],
                    language: [
                        {
                            name: res.data.languageName || "",
                        },
                    ],
                    contactLink: [
                        {
                            url: res.data.contactLinkUrl || "",
                            social: {
                                name: res.data.contactLinkName || "",
                            },
                        },
                    ],
                });
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div id="UserUpdatePage" className="PageContainer">
            <header>
                <h1>Update User {user?.firstName}</h1>
            </header>

            <main>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Firstname"
                        variant="outlined"
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formDatas.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Lastname"
                        variant="outlined"
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formDatas.lastName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Username"
                        variant="outlined"
                        id="userName"
                        type="text"
                        name="userName"
                        value={formDatas.userName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        id="email"
                        type="text"
                        name="email"
                        value={formDatas.email}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        id="password"
                        type="text"
                        name="password"
                        value={formDatas.password}
                        onChange={handleChange}
                    />

                    <TextField
                        label="
                            Address - Country"
                        variant="outlined"
                        id="country"
                        type="text"
                        name="country"
                        value={formDatas.address?.country}
                        onChange={handleChange}
                    />
                    <TextField
                        label="
                            Address - Region"
                        variant="outlined"
                        id="region"
                        type="text"
                        name="region"
                        value={formDatas.address?.region}
                        onChange={handleChange}
                    />
                    <TextField
                        label="
                            Address - City"
                        variant="outlined"
                        id="city"
                        type="text"
                        name="city"
                        value={formDatas.address?.city}
                        onChange={handleChange}
                    />
                    <TextField
                        label="
                            Address - Postcode"
                        variant="outlined"
                        id="postcode"
                        type="text"
                        name="postcode"
                        value={formDatas.address?.postcode}
                        onChange={handleChange}
                    />
                    <TextField
                        label="
                            Address - Street"
                        variant="outlined"
                        id="street"
                        type="text"
                        name="street"
                        value={formDatas.address?.street}
                        onChange={handleChange}
                    />
                    <TextField
                        label="
                            Address - Latitude"
                        variant="outlined"
                        id="latitude"
                        type="text"
                        name="latitude"
                        value={formDatas.address?.latitude}
                        onChange={handleChange}
                    />
                    <TextField
                        label="
                            Address - Longitude"
                        variant="outlined"
                        id="longitude"
                        type="text"
                        name="longitude"
                        value={formDatas.address?.longitude}
                        onChange={handleChange}
                    />
                </Box>

                <Button variant="contained" onClick={handleSubmit}>
                    Update User
                </Button>
            </main>

            <footer></footer>
        </div>
    );
};

export default UserUpdate;

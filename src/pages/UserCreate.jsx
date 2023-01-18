import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImN0eSI6IkpXVCJ9.eyJpYXQiOjE2NzM2MzA0NjgsImV4cCI6MTY3MzYzNDA2OCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6Impvam8iLCJpZCI6Mn0.MR4kYf0-YmPdtIO4lv1EoRg5tG08UK_Yq30rKrhcZ5Jt1bT6Ik3x4_Z_5DrXdGrHx17ZkRn4501PGGbokkbsv7i0gpZesScG7i13D3H2sJoVpYIdzxgr0BfyGASIF7g5n7rihRKVNBDXPZhe11JF9JtxdqKOjaXkS4NK5rzZI65MTlJTP4ZDLJosnyyUznkf9ku0PeOpLrMuqD0oGJbnQi01msIR5paO72CWwPmJ_kHe11tqmw0ripcUuyhhUSJ1yYvBF4Zb4TWXWOK0MkWUgzFL9m2bbYvYaVpwMZu9mzvRRK5Ebj6Yb8A9rFnRqyDGJbSjvEJmWNjO29PzuLU1Ug";

const UserCreate = () => {
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
            .post(`${import.meta.env.VITE_BACKEND_URL}/users`, sanitizeDatas, {
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

    return (
        <div id="UserCreatePage" className="pageContainer">
            <header>
                <h1>Create Account</h1>
            </header>

            <main>
                <Box component="form" noValidate autoComplete="off">
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
                        label="Role"
                        variant="outlined"
                        id="roles"
                        type="text"
                        name="roles"
                        value={formDatas.roles}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        id="password"
                        type="password"
                        name="password"
                        value={formDatas.password}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Firstname"
                        variant="outlined"
                        id="firstname"
                        type="text"
                        name="firstName"
                        value={formDatas.firstName}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Lastname"
                        variant="outlined"
                        id="lastname"
                        type="text"
                        name="lastName"
                        value={formDatas.lastName}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Username"
                        variant="outlined"
                        id="username"
                        type="text"
                        name="userName"
                        value={formDatas.userName}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Latitude"
                        variant="outlined"
                        id="latitude"
                        type="text"
                        name="latitude"
                        value={formDatas.latitude}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Longitude"
                        variant="outlined"
                        id="longitude"
                        type="text"
                        name="longitude"
                        value={formDatas.longitude}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Country"
                        variant="outlined"
                        id="country"
                        type="text"
                        name="country"
                        value={formDatas.country}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Region"
                        variant="outlined"
                        id="region"
                        type="text"
                        name="region"
                        value={formDatas.region}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Postcode"
                        variant="outlined"
                        id="postcode"
                        type="text"
                        name="postcode"
                        value={formDatas.postcode}
                        onChange={handleChange}
                    />

                    <TextField
                        label="City"
                        variant="outlined"
                        id="city"
                        type="text"
                        name="city"
                        value={formDatas.city}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Street"
                        variant="outlined"
                        id="street"
                        type="text"
                        name="street"
                        value={formDatas.street}
                        onChange={handleChange}
                    />

                    <TextField
                        label="StreetNumber"
                        variant="outlined"
                        id="streetNumber"
                        type="text"
                        name="streetNumber"
                        value={formDatas.streetNumber}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Location"
                        variant="outlined"
                        id="location"
                        type="text"
                        name="location"
                        value={formDatas.location}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Start Date"
                        variant="outlined"
                        id="startDate"
                        type="text"
                        name="startDate"
                        value={formDatas.startDate}
                        onChange={handleChange}
                    />

                    <TextField
                        label="End Date"
                        variant="outlined"
                        id="endDate"
                        type="text"
                        name="endDate"
                        value={formDatas.endDate}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Language"
                        variant="outlined"
                        id="languageName"
                        type="text"
                        name="languageName"
                        value={formDatas.languageName}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Contact Link Url"
                        variant="outlined"
                        id="contactLinkUrl"
                        type="text"
                        name="contactLinkUrl"
                        value={formDatas.contactLinkUrl}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Contact Link Category"
                        variant="outlined"
                        id="contactLinkName"
                        type="text"
                        name="contactLinkName"
                        value={formDatas.contactLinkName}
                        onChange={handleChange}
                    />

                    <Button variant="contained" onClick={handleSubmit}>
                        SIGN UP
                    </Button>
                </Box>
            </main>
            <footer></footer>
        </div>
    );
};

export default UserCreate;

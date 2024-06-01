import React, {Fragment, useEffect, useState} from "react";
import '../css/user.css';
import Header from "./Header";
import Footer from "./Footer";
import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {userUpdate} from "../api/user";
import {toast} from "react-toastify";

const Main = () => {
    // const router = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const location = useLocation()
    console.log(location)

    useEffect(() => {
        if (location) {
            setUsername(location.state.username)
            setEmail(location.state.email)
            setPhone(location.state.phone)
            setPassword(location.state.password)
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            _id: location.state._id,
            username: username,
            password: password,
            email: email,
            phone: phone
        }
        const res = await userUpdate(data);

        if (res.code === 200) {
            toast.success("Update successfully")
        } else {
            toast.error(res.msg)
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '100vw',
                    backgroundColor: 'white',
                    zIndex: 2,
                    minHeight: 'calc(100vh - 160px)'
                }}
            >
                <Avatar src="/images/sun.jpeg" alt="web logo"></Avatar>
                <Typography component="h1" variant="h5">
                    Update User
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="family-name"
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                autoComplete="phone"
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </>
    );
}

const UserEdit = (props) => {
    return (<div className="App">
        <Header/>

        <Main/>

        <Footer/>
    </div>)
}

export default UserEdit
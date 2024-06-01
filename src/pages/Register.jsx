import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import "../css/login.css";
import {useState} from "react";
import {userRegister} from "../api/user";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const defaultTheme = createTheme();

export default function Login() {

    const router = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("test")

        let data = {
            username: username,
            password: password,
            email: email,
            phone: phone
        }

        const res = await userRegister(data);

        if (res.code === 200) {
            toast.success("Register successfully")
            router('/login')
        } else {
            console.log(res)
            toast.error(res.msg)
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box component="main" sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100vh',
                width: '100vw'
            }}>
                <CssBaseline/>

                <img src="/images/bg2.png" className="bg-full" alt={'bg'}/>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    zIndex: 2,
                    marginLeft: '100px',
                    padding: '50px',
                    opacity: 0.85,
                }}>
                    <Typography variant="h1" sx={{
                        color: 'white'
                    }}>
                        Queenstown
                    </Typography>
                    <Typography variant="h4" sx={{
                        color: 'white'
                    }}>
                        Discover Queenstown, New Zealand – Your Ultimate Adventure and Scenic Escape!
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        maxWidth: '400px',
                        marginRight: '100px',
                        backgroundColor: 'white',
                        zIndex: 2,
                        padding: '50px',
                        opacity: 0.85,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoFocus
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone"
                                    name="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    autoComplete="phone"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
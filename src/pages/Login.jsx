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
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {userLogin} from "../api/user";
import {toast} from "react-toastify";

const defaultTheme = createTheme();

export default function Login() {
    const router = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("test")

        let data = {
            username: username,
            password: password
        }
        const res = await userLogin(data);

        if (res.code === 200) {
            toast.success("Login successfully")
            sessionStorage.setItem('user', JSON.stringify(res.data));
            sessionStorage.setItem('token', res.data.token);
            if (res.data.role === 0) {
                router("/user/list")
            } else {
                router("/home")
            }
        } else {
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

                <img src="/images/bg1.png" className="bg-full" alt={'bg'}/>

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
                        color: 'white',
                        textAlign: 'left',
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/#register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
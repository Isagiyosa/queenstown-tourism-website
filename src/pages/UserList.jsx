import React, {Fragment, useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import {Box, Button, Container, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {userDelete, userList} from "../api/user";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const Main = () => {
    const [user, setUser] = useState([]);

    const router = useNavigate();

    useEffect(() => {
        userList().then((response) => {
            console.log(response);
            setUser(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const handleAdd = () => {
        console.log('add user')
        router("/user/add")
    }

    const handleEditUser = (user) => {
        console.log('edit user')
        router("/user/edit", {state: user})
    }

    const handleDeleteUser = async (user) => {
        console.log('delete user')
        // eslint-disable-next-line no-restricted-globals
        if (!confirm("Confirm Delete User ?")) return;

        // delete user
        const res = await userDelete(user._id);
        if (res.code === 200) {
            userList().then((response) => {
                console.log(response);
                setUser(response.data);
            }).catch((error) => {
                console.error(error);
            });
            toast.success("Delete successfully")
        } else {
            toast.error(res.msg)
        }
    }

    return (
        <>
            <Box sx={{display: 'flex'}}>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        minHeight: 'calc(100vh - 160px)',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                    <React.Fragment>
                                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                            User List
                                            <Button sx={{
                                                marginLeft: '20px'
                                            }} variant="contained" onClick={handleAdd} size="small">
                                                Create User
                                            </Button>
                                        </Typography>

                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>Username</TableCell>
                                                    <TableCell>Email</TableCell>
                                                    <TableCell>Phone</TableCell>
                                                    <TableCell>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {user.map((row) => (
                                                    <TableRow key={row.id}>
                                                        <TableCell>{row._id}</TableCell>
                                                        <TableCell>{row.username}</TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                        <TableCell>{row.phone}</TableCell>
                                                        <TableCell>
                                                            <TableCell>
                                                                <Button onClick={() => handleEditUser(row)}
                                                                        variant="outlined" size="small">Edit</Button>
                                                                &nbsp;
                                                                &nbsp;
                                                                <Button onClick={() => handleDeleteUser(row)}
                                                                        variant="outlined" size="small"
                                                                        color="error">Delete</Button>
                                                            </TableCell>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </React.Fragment>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    );
}

const UserList = (props) => {
    return (
        <div className="App">
            <Header/>

            <Main/>

            <Footer/>
        </div>
    )
}

export default UserList
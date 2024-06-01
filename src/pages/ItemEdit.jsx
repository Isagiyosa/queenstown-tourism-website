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
import {itemUpdate} from "../api/item";

const Main = () => {
    // const router = useNavigate();
    const [item, setItem] = useState({
        _id: "",
        user_id: "",
        title: "",
        cover: "",
        description: "",
        content: "",
        detail: {},
        star: '',
        category: ''
    });

    const location = useLocation()
    console.log(location)

    useEffect(() => {
        if (location) {
            setItem(location.state)
        }
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            ...item
        }
        const res = await itemUpdate(data);

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

                <Typography component="h1" variant="h5">
                    Update
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Title"
                                name="title"
                                value={item.title}
                                onChange={handleChange}
                                autoFocus
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="cpver"
                                label="Cover"
                                value={item.cover}
                                onChange={handleChange}
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Description"
                                name="description"
                                value={item.description}
                                onChange={handleChange}
                                autoComplete="family-name"
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Content"
                                name="content"
                                value={item.content}
                                onChange={handleChange}
                                autoComplete="family-name"
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <TextField*/}
                        {/*        required*/}
                        {/*        fullWidth*/}
                        {/*        label="Detail"*/}
                        {/*        name="detail"*/}
                        {/*        value={item.detail}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        autoComplete="family-name"*/}

                        {/*        InputLabelProps={{shrink: true}}*/}
                        {/*    >*/}
                        {/*        <pre dangerouslySetInnerHTML={item.detail}></pre>*/}
                        {/*    </TextField>*/}
                        {/*</Grid>*/}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="star"
                                label="Star"
                                name="star"
                                value={item.star}
                                onChange={handleChange}
                                autoComplete="phone"
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="category"
                                label="Category"
                                name="category"
                                value={item.category}
                                onChange={handleChange}
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
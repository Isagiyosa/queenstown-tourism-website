import React, {Fragment, useState} from "react";
import '../css/user.css';
import Header from "./Header";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {itemAdd} from "../api/item";

// const sections = [
//     {title: 'Posts', url: '#'}
// ];

const Main = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    let user = JSON.parse(sessionStorage.getItem('user'));

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            id: user.id,
            title: title,
            description: description,
            content: content,
            category: 'Posts'
        }
        const res = await itemAdd(data);

        if (res.code === 200) {
            toast.success("Post successfully")
        } else {
            toast.error(res.msg)
        }
    };

    return (
        <>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Header title="Home"
                        showSearch={false}
                        showCategory={false}
                        sections={[]}
                />
                <main>

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
                            Post
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Title"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        autoFocus
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="description"
                                        label="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        autoComplete="new-password"
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Content"
                                        name="content"
                                        multiline
                                        rows={12}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        autoComplete="family-name"
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
                </main>
            </Container>
            <Footer
                title="Queenstown"
                description="Discover Queenstown, New Zealand – Your Ultimate Adventure and Scenic Escape!"
            />
        </>
    );
}

const User = (props) => {
    return (
        <Main/>
    )
}

export default User
import React, {Fragment, useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import {Box, Button, Container, Pagination, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import {itemDelete, itemList, itemSpider} from "../api/item";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const Main = () => {
    const [item, setItem] = useState([]);
    const [page, setPage] = useState(1);


    const router = useNavigate();

    const itemsPerPage = 10;

    const pageCount = Math.ceil(item.length / itemsPerPage);

    const displayedItems = item.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    useEffect(() => {
        itemList().then((response) => {
            console.log(response);
            setItem(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const handleChange = (event, value) => {
        setPage(value);
    };


    const handleAdd = () => {
        console.log('add user')
        router("/item/add")
    }

    const handleEdit = (item) => {
        console.log('edit user')
        router("/item/edit", {state: item})
    }

    const handleDelete = async (item) => {
        console.log('delete')
        // eslint-disable-next-line no-restricted-globals
        if (!confirm("Confirm Delete Records ?")) return;

        // delete user
        const res = await itemDelete(item._id);
        if (res.code === 200) {
            itemList().then((response) => {
                console.log(response);
                setItem(response.data);
            }).catch((error) => {
                console.error(error);
            });
            toast.success("Delete successfully")
        } else {
            toast.error(res.msg)
        }
    }

    const handleItemSpider = async (item) => {
        console.log('item spider')
        const res = await itemSpider();
        if (res.code === 200) {
            itemList().then((response) => {
                console.log(response);
                setItem(response.data);
            }).catch((error) => {
                console.error(error);
            });
            toast.success("Spider run successfully")
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
                                            Data List

                                            <Button sx={{marginLeft: '10px'}} variant="contained" onClick={handleItemSpider}
                                                    size="small">
                                                Update Data
                                            </Button>
                                        </Typography>

                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>Title</TableCell>
                                                    <TableCell>Category</TableCell>
                                                    <TableCell>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {displayedItems.map((row) => (
                                                    <TableRow key={row._id}>
                                                        <TableCell>{row._id}</TableCell>
                                                        <TableCell>{row.title}</TableCell>
                                                        <TableCell>{row.category}</TableCell>
                                                        <TableCell>
                                                            <TableCell>
                                                                <Button onClick={() => handleEdit(row)}
                                                                        variant="outlined" size="small">Edit</Button>
                                                                &nbsp;
                                                                &nbsp;
                                                                <Button onClick={() => handleDelete(row)}
                                                                        variant="outlined" size="small"
                                                                        color="error">Delete</Button>
                                                            </TableCell>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>

                                        <Pagination sx={{marginTop: '20px'}} count={pageCount} page={page}
                                                    onChange={handleChange}/>
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

const ItemList = (props) => {
    return (
        <div className="App">
            <Header/>

            <Main/>

            <Footer/>
        </div>
    )
}

export default ItemList
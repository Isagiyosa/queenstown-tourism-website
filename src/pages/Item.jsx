import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import Footer from './Footer';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {TextField, Typography, Box, Button} from "@mui/material";
import {commentAdd, commentDelete, commentList} from "../api/comment";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {toast} from "react-toastify";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import {itemAdd, itemDetail, itemStar} from "../api/item";
import {PostCard} from "./FeaturedPost";

export default function Item() {
    const {id} = useParams();
    const user = JSON.parse(sessionStorage.getItem('user'));

    const [item, setItem] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setCommentList] = useState([]);

    const mainFeaturedPost = {
        title: item.title,
        description: item?.detail?.user_review || item.description || item?.detail?.address,
        image: 'https://source.unsplash.com/random?wallpapers',
        imageText: 'main image description',
        linkText: '',
    };

    useEffect(() => {
        fetchItem();
        fetchData();
    }, []);

    const fetchItem = async () => {
        const res = await itemDetail({
            id: id
        });
        setItem(res.data);
    }

    const fetchData = async () => {
        const res = await commentList({
            item_id: id
        });
        setCommentList(res.data);
    }

    const handleReplyComment = async () => {
        console.log(comment)
        let res = await commentAdd({content: comment, item_id: id});
        if (res.code === 200) {
            toast.success('Add comment successfully!')
            fetchData();
            setComment('');
        } else {
            toast.error('Add comment failed!')
        }
    }

    const handleDeleteComment = async (id) => {
        console.log(id)
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure to delete this comment?') === false) {
            return;
        }

        let res = await commentDelete(id);
        if (res.code === 200) {
            toast.success('Delete comment successfully!')
            fetchData();
        } else {
            toast.error('Delete comment failed!')
        }
    }

    const handleLikeItem = async () => {
        if (!user) {
            toast.error('Please login first!')
            return;
        }
        console.log('like')
        let res = await itemStar({id: item._id});
        if (res.code === 200) {
            item.star = item.star + 1;
            setItem({...item});
            toast.success('Like successfully!')
        } else {
            toast.error('Like failed!')
        }
    }

    const handleShareItem = async () => {
        if (!user) {
            toast.error('Please login first!')
            return;
        }

        console.log('share')

        let data = item;

        if (data.title.indexOf("(Shared)") < 0) {
            data.title = data.title + ' (Shared)';
        }

        data.category = "Posts"

        let content = prompt("Please Input Share Reason");

        if (!content) {
            return
        }

        data.content = content
        let res = await itemAdd(data);
        if (res.code === 200) {
            toast.success('Share successfully!')
        } else {
            toast.error('Share failed!')
        }
    }

    const timeAgo = (date) => {
        const diff = new Date() - new Date(date);
        const seconds = Math.floor(diff / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

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
                    <MainFeaturedPost post={mainFeaturedPost}/>

                    {
                        item && item.category !=='Posts' && (
                            <PostCard post={item}></PostCard>
                        )
                    }


                    <Grid item xs={12} md={12}>
                        <pre style={{
                            width: '100%',
                            whiteSpace: 'break-spaces'
                        }} dangerouslySetInnerHTML={{__html: item.content}}></pre>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box>
                            <h3>
                                Like & Share
                            </h3>
                            <Box>

                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                    >
                        <IconButton aria-label="add to favorites" onClick={handleLikeItem}>
                            <FavoriteIcon/> {item.star || 0}
                        </IconButton>

                        <IconButton aria-label="click to favorites" onClick={handleShareItem}>
                            <ShareIcon/>
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{marginTop: '20px', marginBottom: '20px'}}>
                        <Box>
                            <h3>
                                Reply
                            </h3>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <TextField
                            required
                            fullWidth
                            id="phone"
                            label="Content"
                            name="content"
                            multiline
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            autoComplete="phone"
                            InputLabelProps={{shrink: true}}
                        />

                        <Box sx={{marginTop: '20px'}}>
                            <Button variant="contained" className="btn" onClick={handleReplyComment}>
                                Submit
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12} sx={{marginTop: '20px', marginBottom: '20px'}}>
                        <Box>
                            <h3>
                                Comments
                            </h3>
                        </Box>
                    </Grid>

                    {
                        comments.length === 0 && (
                            <Grid style={{
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                margin: '30px'
                            }}>
                                No comments found
                            </Grid>
                        )
                    }

                    {
                        comments.length > 0 && comments.map((row) => (
                            <Card sx={{display: 'flex', margin: '20px 0'}}>
                                <CardContent sx={{flex: 1}}>
                                    <Typography component="h6" variant="h6" color="text.secondary">
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                                            <Avatar></Avatar>
                                            <Box>
                                                {row.user_id.username}
                                            </Box>
                                            <Box sx={{margin: '20px 0'}}>
                                                <span style={{fontSize: '12px', color: 'gray'}}>
                                                    {timeAgo(row.created_at)} ago
                                                </span>
                                            </Box>
                                        </Box>
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {row.comment}
                                    </Typography>

                                    {row.user_id._id === user._id && (
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            marginTop: '20px'

                                        }}>
                                            <IconButton aria-label="delete" onClick={() => {
                                                handleDeleteComment(row._id)
                                            }}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Box>
                                    )}

                                </CardContent>
                            </Card>
                        ))
                    }
                </main>
            </Container>
            <Footer
                title="Queenstown"
                description="Discover Queenstown, New Zealand – Your Ultimate Adventure and Scenic Escape!"
            />
        </>
    );
}

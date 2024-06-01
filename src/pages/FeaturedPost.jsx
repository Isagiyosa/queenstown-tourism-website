import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {useNavigate} from "react-router-dom";

function PostCard(props) {
    const {post,more = false} = props;

    const renderContent = () => {
        switch (post.category) {
            case 'Attractions':
                return (
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            {post?.detail?.address}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Phone:{post?.detail?.phone}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Hours:{post?.detail?.hours}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Reviews:{post?.detail?.reviews}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Rating:{post?.detail?.rating}
                        </Typography>
                        {
                            more && (
                                <Typography variant="subtitle1" color="primary">
                                    Read more...
                                </Typography>
                            )
                        }
                    </CardContent>
                );

            case 'Hotels':
                return (
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            {post?.detail?.address}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Phone:{post?.detail?.phone}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Price:{post?.detail?.price}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Reviews:{post?.detail?.reviews}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Rating:{post?.detail?.rating}
                        </Typography>
                        {
                            more && (
                                <Typography variant="subtitle1" color="primary">
                                    Read more...
                                </Typography>
                            )
                        }
                    </CardContent>
                );

            case 'Restaurants':
                return (
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            {post?.detail?.address}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Phone:{post?.detail?.phone}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Hours:{post?.detail?.hours}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Reviews:{post?.detail?.reviews}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Rating:{post?.detail?.rating}
                        </Typography>
                        {
                            more && (
                                <Typography variant="subtitle1" color="primary">
                                    Read more...
                                </Typography>
                            )
                        }
                    </CardContent>
                );

            case 'HikingTrails':
                return (
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            {post?.detail?.address}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {post?.detail?.user_review}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Reviews:{post?.detail?.reviews}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Rating:{post?.detail?.rating}
                        </Typography>
                        {
                            more && (
                                <Typography variant="subtitle1" color="primary">
                                    Read more...
                                </Typography>
                            )
                        }
                    </CardContent>
                );

            case 'Campsite':
                return (
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            {post?.detail?.address}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {post?.detail?.user_review}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Reviews:{post?.detail?.reviews}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Rating:{post?.detail?.rating}
                        </Typography>
                        {
                            more && (
                                <Typography variant="subtitle1" color="primary">
                                    Read more...
                                </Typography>
                            )
                        }
                    </CardContent>
                );

            case 'Posts':
                return (
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {post.created_at}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {post.description}
                        </Typography>
                        {
                            more && (
                                <Typography variant="subtitle1" color="primary">
                                    Read more...
                                </Typography>
                            )
                        }
                    </CardContent>
                );

            default:
                return (
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            Unknown Type
                        </Typography>
                    </CardContent>
                );
        }
    };

    return <>{renderContent()}</>;
}

function FeaturedPost(props) {
    const {post} = props;

    const router = useNavigate();

    const handleClickPost = () => {
        console.log('click post')
        router("/item/" + post._id, {state: post})
    }

    return (
        <Grid item xs={12} md={12} onClick={handleClickPost}>
            <CardActionArea component="a">
                <Card sx={{display: 'flex'}}>
                    <CardMedia
                        component="img"
                        sx={{width: 300, display: {xs: 'none', sm: 'block'}}}
                        image={post.cover + '?id=' + post._id}
                        alt="post cover"
                    />
                    <PostCard post={post} more={true}></PostCard>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

export default FeaturedPost;
export { PostCard };
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';
import {useEffect, useState} from "react";
import {itemList} from "../api/item";

const sections = [
    {title: 'Attractions', url: '#'},
    {title: 'Hotels', url: '#'},
    {title: 'Restaurants', url: '#'},
    {title: 'HikingTrails', url: '#'},
    {title: 'Campsite', url: '#'},
    {title: 'Posts', url: '#'}
];

const mainFeaturedPost = {
    title: 'Queenstown',
    description: "Discover Queenstown, New Zealand – Your Ultimate Adventure and Scenic Escape!",
    image: 'https://source.unsplash.com/random?wallpapers',
    imageText: 'main image description',
    linkText: '',
};

export default function Home() {
    const [category, setCategory] = useState('Attractions');
    const [item, setItem] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        fetchData();
    }, [category, keyword]);

    const fetchData = async () => {
        let keywords = localStorage.getItem('keywords');
        keywords = keywords ? JSON.parse(keywords) : [];

        const res = await itemList({category, keyword, keywords});
        if (res.data) {
            setItem(res.data);
        }
    };

    const reloadData = (newCat) => {
        setCategory(newCat);
    };

    const changeKeyword = (newKeyword) => {
        setKeyword(newKeyword);
    }

    return (
        <>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Header
                    sections={sections}
                    onCategoryChange={reloadData}
                    onKeywordChange={changeKeyword}
                />
                <main>
                    <MainFeaturedPost post={mainFeaturedPost}/>
                    <Grid container spacing={4}>
                        {
                            item.length === 0 && (
                                <Grid style={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    margin: '30px'
                                }}>
                                    No results found
                                </Grid>
                            )
                        }

                        {
                            item.length > 0 && item.map((post) => (
                                <FeaturedPost key={post.id} post={post}/>
                            ))
                        }
                    </Grid>
                </main>
            </Container>
            <Footer
                title="Queenstown"
                description="Discover Queenstown, New Zealand – Your Ultimate Adventure and Scenic Escape!"
            />
        </>
    );
}

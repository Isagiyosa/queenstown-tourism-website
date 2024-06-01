import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {debounce, TextField} from "@mui/material";
import {toast} from "react-toastify";
import axios from "axios";
import Box from "@mui/material/Box";

function Header(props) {
    const {
        sections,
        onCategoryChange,
        onKeywordChange,
        showSearch = true,
        showCategory = true
    } = props;
    const [category, setCategory] = useState('Attractions');
    const [weather, setWeather] = useState({});

    const user = JSON.parse(sessionStorage.getItem('user'));

    const router = useNavigate();

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        getWeatherConditions();
    }, []);

    const init = () => {
        if (!user) {
            router("/login")
        }
    }

    const handleHome = () => {
        router("/home")
    }

    const handleUser = () => {
        console.log("user")
        router("/user")
    }

    const handleSignIn = () => {
        router("/login")
    }

    const handleSignUp = () => {
        router("/register")
    }

    const handleSignOut = () => {
        sessionStorage.removeItem('user');
        router("/login")
    }

    const handleClickSection = (title) => {
        setCategory(title);
        onCategoryChange(title);
    }

    const handleKeywordChange = debounce((event) => {
        if (event.key === 'Enter') {
            onKeywordChange(event.target.value);
            if (event.target.value === '') return;
            if (localStorage.getItem('keywords')) {
                const keywords = JSON.parse(localStorage.getItem('keywords'));
                keywords.push(event.target.value);
                localStorage.setItem('keywords', JSON.stringify(keywords));
            } else {
                localStorage.setItem('keywords', JSON.stringify([event.target.value]));
            }
        }
    }, 500);

    const getWeatherConditions = async () => {
        const apiKey = '0817fe4d13a49c880a7876e9425a29f0';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=-45.0312&lon=168.6626&appid=${apiKey}`;

        try {
            const response = await axios.get(apiUrl);
            console.log(response)
            if (response.status === 200) {
                const data = response.data;
                const weatherCondition = data.weather[0];
                console.log(weatherCondition)
                setWeather(weatherCondition)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Error getting weather conditions:", error);
        }
    };

    const handleRecommend = () => {
        setCategory("Recommend");
        onCategoryChange("Recommend");
    }

    const handleUserManage = () => {
        router("/user/list")
    }

    const handleDataManage = ()=>{
        router("/item/list")
    }

    const handlePost = () => {
        router("/post")
    }

    return (
        <>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Box
                    component="div"
                    variant="div"
                    color="inherit"
                    align="left"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        cursor: 'pointer',
                        gap: '20px',
                    }}
                >
                    <Box onClick={handleHome}>
                        <img src={`/images/logo.png`} height="80" width="256" alt='logo'/>
                    </Box>

                    <Box
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="left"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            gap: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        {
                            user?.role === 0 && (
                                <Box component={'div'} sx={{
                                    display:"flex",
                                    flexDirection: "row",
                                    gap: "30px",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                                    className='header-right'
                                >
                                    <Box onClick={handleUserManage}>UserManage</Box>
                                    <Box onClick={handleDataManage}>DataManage</Box>
                                </Box>
                            )
                        }
                    </Box>
                </Box>


                {
                    showSearch && (
                        <TextField
                            size="small"
                            sx={{m: 1, width: '30ch'}}
                            placeholder="Search..."
                            onKeyDown={handleKeywordChange}
                            InputProps={{
                                startAdornment: <IconButton>
                                    <SearchIcon/>
                                </IconButton>,
                            }}
                        />
                    )
                }

                <Button size="small" onClick={handlePost}>
                    Post
                </Button>

                <Button size="small" onClick={handleRecommend}>
                    Recommend
                </Button>

                {
                    weather && (
                        <>
                            <img src={`https://openweathermap.org/img/wn/${weather.icon}.png`} height="50"
                                 width="50" alt={'weather icon'}/>
                            {
                                weather.main
                            }
                        </>
                    )
                }

                {
                    user ? (
                        <>
                            <div style={{
                                cursor: 'pointer',
                                marginLeft: '10px',
                            }}
                                 onClick={handleUser}>
                                Welcome, {user?.username}
                            </div>
                            <div style={{
                                cursor: 'pointer',
                            }}
                                 onClick={handleSignOut}>
                                &nbsp;
                                Logout
                            </div>
                        </>
                    ) : (
                        <>
                            <Button variant="outlined" size="small" onClick={handleSignIn}>
                                Sign in
                            </Button>
                            <Button variant="outlined" size="small" onClick={handleSignUp} sx={{marginLeft: '10px'}}>
                                Sign up
                            </Button>
                        </>
                    )
                }
            </Toolbar>

            <>
                {
                    showCategory && (
                        <Toolbar
                            component="nav"
                            variant="dense"
                            sx={{justifyContent: 'space-between', overflowX: 'auto'}}
                        >
                            {sections && sections.map((section) => (
                                <Link
                                    color="inherit"
                                    noWrap
                                    underline={category === section.title ? 'always' : 'hover'}
                                    key={section.title}
                                    variant="body2"
                                    href={section.url}
                                    onClick={() => handleClickSection(section.title)}
                                    sx={{p: 1, flexShrink: 0}}
                                >
                                    {section.title}
                                </Link>
                            ))}
                        </Toolbar>
                    )
                }
            </>
        </>
    );
}

export default Header;

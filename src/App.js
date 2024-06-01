import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Item from './pages/Item';
import Post from './pages/Post';
import User from './pages/User';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import UserAdd from './pages/UserAdd';
import ItemList from "./pages/ItemList";
import ItemAdd from "./pages/ItemAdd";
import ItemEdit from "./pages/ItemEdit";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/item/:id' element={<Item/>}/>
            <Route path='/item/list' element={<ItemList/>}/>
            <Route path='/item/edit' element={<ItemEdit/>}/>
            <Route path='/item/add' element={<ItemAdd/>}/>
            <Route path='/post' element={<Post/>}/>
            <Route path='/user' element={<User/>}/>
            <Route path='/user/list' element={<UserList/>}/>
            <Route path='/user/edit' element={<UserEdit/>}/>
            <Route path='/user/add' element={<UserAdd/>}/>
        </Routes>
    );
}

export default App;

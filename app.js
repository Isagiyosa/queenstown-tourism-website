const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const {expressjwt: expressJwt} = require('express-jwt');
const axios = require("axios");

// define secret key
const secretKey = 'queenstown'

// mongodb connection url
const DB_URL = 'mongodb://127.0.0.1:27017/queenstown'

const connect_db = async () => {
    try {
        // connection to mongo
        await mongoose.connect(DB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

connect_db();

// define mongoose schema
const Schema = mongoose.Schema;

// define user schema
const UserSchema = new Schema({
    username: {type: String, required: true, maxlength: 32},
    password: {type: String, required: true, maxlength: 32},
    email: {type: String, required: true, maxlength: 32},
    phone: {type: String, required: true, maxlength: 32},
    token: {type: String, required: false},
});

// define user model
const User = mongoose.model('User', UserSchema);

// define item schema
const ItemSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true, maxlength: 255},
    cover: {type: String, required: true, maxlength: 255},
    description: {type: String, required: true},
    content: {type: String, required: false},
    detail: {type: Object, required: false},
    star: {type: Number, required: true, default: 0},
    category: {type: String, required: true, maxlength: 32},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

ItemSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

// define item model
const Item = mongoose.model('Item', ItemSchema);

// define comment model
const CommentSchema = new Schema({
    item_id: {type: Schema.Types.ObjectId, ref: 'Item', required: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    comment: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now, timestamps: {updatedAt: 'updated_at'}}
});

// define comment model
const Comment = mongoose.model('Comment', CommentSchema);

async function search(q) {
    const apiKey = '73bf5921476423858223f161d5cce56ad6ec52731a5a681217d8a25d36c2cc38';
    const url = `https://serpapi.com/search.json?engine=google_maps&api_key=${apiKey}&q=${q}&ll=@-45.0312,168.6626,15.1z&type=search`;

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        } else {
            return {code: 500, data: "Error getting data"};
        }
    } catch (error) {
        console.error('Error:', error);
        return {code: 500, data: "Error getting data"};
    }
}

async function main(category = 'Attractions') {
    const resopnse = await search(category); // Attractions Hotels Restaurants HikingTrails Campsite
    // console.log(resopnse)

    const results = resopnse.local_results;
    console.log(results)

    //mapping results to item
    for (let i = 0; i < results.length; i++) {
        const item = results[i];
        if (!item.thumbnail) {
            continue;
        }
        const newItem = new Item({
            user_id: '66515345cbeeb1a5e37ac2c9',
            title: item.title,
            cover: item.thumbnail,
            description: item.description || "No description",
            content: "",
            detail: item,
            star: 0,
            category: category,
        });
        // console.log(newItem)
        await newItem.save();
    }
}

// create express app
const app = express()

// // allow cors
app.use(cors());

// use json middleware to parse json data
app.use(express.json());

// jwt middleware
app.use(expressJwt({secret: secretKey, algorithms: ['HS256']}).unless({
    path: [
        /^\/api\/login/,
        /^\/api\/register/
    ]
}));

// Captures errors that occur after parsing JWT failures
app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === 'UnauthorizedError') {
        return res.send({
            code: 401,
            msg: 'invalid token'
        })
    }
    res.send({
        code: 500,
        msg: err.name
    })
});

// user login
app.post('/api/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        let user = await User.findOne({username, password});
        if (!user) {
            res.json({code: 500, msg: 'User not found or password error'});
        } else {
            // use jwt token
            user.token = jwt.sign({
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
            }, secretKey);

            await user.save();

            console.log(user)
            // remove password
            user.password = undefined;
            res.json({code: 200, data: user, msg: 'Login success'});
        }
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// user register
app.post('/api/register', async (req, res) => {
    try {
        const {username, password, phone, email} = req.body;
        let user = await User.findOne({username});
        if (user) {
            res.json({
                code: 500, msg: 'User already exists'
            });
        } else {
            user = new User({username, password, phone, email, role: 1});
            await user.save();

            res.json({
                code: 200, msg: 'Register success'
            });
        }
    } catch (err) {
        res.json({message: err.message});
    }
});

// update user
app.put('/api/user', async (req, res) => {
    try {
        const {_id, username, password, phone, email} = req.body;

        let update_user_id = _id;

        const login_user_id = req.auth._id;

        if (update_user_id === login_user_id) {
            let is_exist = await User.findOne({username: username, _id: {$ne: login_user_id}});

            if (is_exist) {
                return res.json({
                    code: 400, msg: 'User already exists'
                });
            }
        }

        let user = await User.findOne({_id: update_user_id});

        user.username = username;

        if (password) {
            user.password = password;
        }
        user.phone = phone;
        user.email = email;

        await user.save();

        res.json({
            code: 200, msg: 'User updated'
        });
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});


// delete
app.delete('/api/user', async (req, res) => {
    try {
        const {_id} = req.query;
        console.log(_id);
        // const objectId = mongoose.Types.ObjectId(_id);
        let result = await User.deleteOne({_id});
        console.log(result)
        if (result.deletedCount === 0) {
            return res.json({code: 400, msg: 'Delete failed'});
        }
        res.json({code: 200, msg: 'Delete success'});
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// get user
app.get('/api/user', async (req, res) => {
    try {
        // const {} = req.query;
        // const {_id} = req.auth;

        const {keyword} = req.query;
        // console.log(category, keyword);

        let condition = {};

        if (keyword) {
            condition.username = {$regex: keyword, $options: 'i'};
        }

        const users = await User.find(condition);

        res.json({code: 200, msg: 'success', data: users});
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// delete
app.delete('/api/item', async (req, res) => {
    try {
        const {_id} = req.query;
        console.log(_id);
        let result = await Item.deleteOne({_id: _id});
        if (result.deletedCount === 0) {
            return res.json({code: 400, msg: 'Delete failed'});
        }
        res.json({code: 200, msg: 'Delete success'});
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// put item
app.put('/api/item', async (req, res) => {
    try {
        const data = req.body;

        // update item
        await Item.updateOne({_id: data._id}, data);

        res.json({
            code: 200, msg: 'Update success'
        });
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// create item
app.post('/api/item', async (req, res) => {
    try {
        const data = req.body;
        const {_id} = req.auth;

        const newItem = new Item({
            user_id: _id,
            title: data.title,
            cover: data.cover || "https://source.unsplash.com/150x100",
            detail: data.detail || '',
            description: data.description,
            content: data.content,
            category: data.category
        });

        await newItem.save();

        res.json({
            code: 200,
            msg: 'Success',
            data: null,
        });
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});


// create item spider
app.get('/api/item/spider', async (req, res) => {
    try {
        // do spider
        let categorys = ['Attractions', 'Hotels', 'Restaurants', 'HikingTrails', 'Campsite'];

        for (let i = 0; i < categorys.length; i++) {
            let category = categorys[i];
            await main(category);
        }

        res.json({
            code: 200,
            msg: 'Success',
            data: null,
        });
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// star post
app.put("/api/item/star", async (req, res) => {
    try {
        const {id} = req.body;
        console.log("params id", id)
        const item = await Item.findById({_id: id});
        if (!item) {
            return res.json({code: 500, msg: 'Item not found'});
        }
        item.star += 1;
        await item.save();
        res.json({code: 200, msg: 'Star success'});
    } catch (err) {
        console.error(err);
        res.json({
            code: 500, msg: err.message
        });
    }
});


// search item
app.get('/api/item', async (req, res) => {
    try {
        const {category, keyword} = req.query;
        // console.log(category, keyword);

        let condition = {};

        if (category) {
            if (category === 'Recommend') {
                condition.$or = [
                    {star: {$gte: 10}},
                    {
                        title: {
                            $regex: new RegExp(req.query.keywords.join('|'), 'i')
                        }
                    }
                ];
                // console.log(condition)
            } else {
                condition.category = category;
            }
        }

        if (keyword) {
            condition.title = {$regex: keyword, $options: 'i'};
        }

        const items = await Item.find(condition);

        res.json({code: 200, msg: 'success', data: items});
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// create comment
app.post('/api/comment', async (req, res) => {
    try {
        // console.log(req)
        const {item_id, content} = req.body;
        const {_id} = req.auth;
        // console.log(req.auth._id)

        const comment = new Comment({
            user_id: _id,
            item_id: item_id,
            comment: content,
            created_at: new Date(),
            updated_at: new Date(),
        });

        await comment.save();

        res.json({code: 200, msg: 'Post success'});
    } catch (error) {
        res.json({
            code: 500, msg: error.message
        });
    }
});

// delete
app.delete('/api/comment', async (req, res) => {
    try {
        const {id} = req.query;
        // console.log(id);
        let result = await Comment.deleteOne({_id: id});
        if (result.deletedCount === 0) {
            return res.json({code: 500, msg: 'Delete failed'});
        }
        res.json({code: 200, msg: 'Delete success'});
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// put comment
app.put('/api/comment', async (req, res) => {
    try {
        const data = req.body;

        // update item
        await Comment.updateOne({_id: data.id}, data);

        res.json({
            code: 200, msg: 'Update success'
        });
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// search comment
app.get('/api/comment', async (req, res) => {
    try {
        const {item_id} = req.query;

        const comments = await Comment.find({item_id: item_id}).populate('user_id').sort({_id: -1});

        res.json({
            code: 200, msg: 'success', data: comments
        });
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// item detail
app.get('/api/item/detail', async (req, res) => {
    try {
        const {id} = req.query;
        const item = await Item.findById({_id: id});
        res.json({
            code: 200, msg: 'success', data: item
        });
    } catch (err) {
        res.json({
            code: 500, msg: err.message
        });
    }
});

// app start
app.listen(5001, () => {
    console.log(`Server listening on port 5001`)
})
const mongoose = require('mongoose');
const axios = require('axios');

// mongodb connection url
const DB_URL = 'mongodb://127.0.0.1:27017/queenstown'

// connect to mongo
const connect_db = async () => {
    try {
        // connection to mongo
        await mongoose.connect(DB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// define mongoose schema
const Schema = mongoose.Schema;

// define item schema
const ItemSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true, maxlength: 255},
    cover: {type: String, required: true, maxlength: 255},
    description: {type: String, required: false},
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

async function main() {
    connect_db()

    const resopnse = await search('Campsite'); // Attractions Hotels Restaurants HikingTrails Campsite
    // console.log(resopnse)

    const results = resopnse.local_results;
    console.log(results)

    //mapping results to item
    for (let i = 0; i < results.length; i++) {
        const item = results[i];
        const newItem = new Item({
            user_id: '66515345cbeeb1a5e37ac2c9',
            title: item.title,
            cover: item.thumbnail,
            description: item.description || "No description",
            content: "",
            detail: item,
            star: 0,
            category: 'Campsite',
        });
        // console.log(newItem)
        await newItem.save();
    }
}

main()
const mongoose = require('mongoose');
const chat = require('./modules/chat');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsApp');
}

main().then(() => console.log("successfully connected"))
.catch(err => console.log(err));

let allChats = [
    {
        from : "aniket",
        to : "sushant",
        chat : "i am fine.",
        created_at : new Date(),
    },
    {
        from : "krishna",
        to : "sushant",
        chat : "can you have completed practical",
        created_at : new Date(),
    },
    {
        from : "sushant",
        to : "krishna",
        chat : "NO, not now",
        created_at : new Date(),
    },
    {
        from : "rohit",
        to : "mohit",
        chat : "teach me JS callback",
        created_at : new Date(),
    }
];

chat.insertMany(allChats);
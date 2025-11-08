const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./modules/chat.js");
const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsApp');
}

main().then(() => console.log("successfully connected"))
.catch(err => console.log(err));
      
app.get("/chats", async (req,res) => {
  let allChats = await Chat.find();
  res.render("index.ejs", {allChats});
})

app.get("/chats/new", (req,res) => {
  res.render("newChat.ejs");
});

app.post("/chats", async (req,res) => {
  let {from,to,chat} = req.body;

  let newChat1 = await new Chat({
    from : from,
    to : to,
    chat : chat,
    created_at : new Date(),
  })
  newChat1.save().then(res => console.log("successfully saved")).catch(err => console.log("error"));
  res.redirect("/chats");
})

app.get("/chats/:id/edit", async (req,res) => {
  let {id} = req.params;
  let msg = await Chat.findById(id);
  res.render("edit.ejs",{msg});
})

app.put("/chats/:id", async (req,res) => {
  let {id} = req.params;
  let {chat : newMsg} = req.body;
  let updateMsg =  await Chat.findByIdAndUpdate(id,{chat : newMsg, created_at : new Date},{new : true});

  console.log(updateMsg);
  res.redirect("/chats");
})

app.delete("/chats/:id", async (req,res) => {
  let {id} = req.params;
  await Chat.findByIdAndDelete(id).then(res => console.log("successfully Deleted"))
  .catch(err => console.log("error",err));
  res.redirect("/chats");
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}/chats`);
});

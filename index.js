const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views" , path.join(__dirname, "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));


main().then(()=>{
    console.log("Connected to MongoDB successfully");
}).catch((err)=> console.error("MongoDB connection error:", err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.get("/" , (req , res) =>{
    res.send("Root is working");
    console.log("Home route accessed");

});

//delete route 


app.delete("/chats/:id" , async(req , res ) =>{
  let {id} = req.params;
 await Chat.findByIdAndDelete(id);
 console.log("deleted chat");
 res.redirect("/chats");
});

//create route
app.post("/chats" , (req, res) =>{
  let{from , to , msg } = req.body;
  let newchat  = new Chat({
    from : from ,
    to : to , 
    msg : msg ,
    created_at : new Date(),
  });

  newchat
  .save()
  .then((res) =>{
    console.log("chat saved");
})
.catch((err) =>{
    console.log(err);
});

res.redirect("/chats");

});

app.get("/chats/new" , (req , res )=>{
 res.render("new.ejs");
})

app.listen( 8080 , ()=>{
  console.log("Server is listening on port 8080");
});
//index route
app.get("/chats" , async(req , res ) =>{
let chats = await Chat.find();
res.render("index.ejs" , {chats});
})


//edit route

app.get("/chats/:id/edit" , async(req ,res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);

   res.render("edit.ejs" , {chat});
});


app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newmsg } = req.body;

  try {
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newmsg }, { runValidators: true, new: true });
    console.log("Updated successfully:", updatedChat);
    res.redirect("/chats");
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send("Error updating chat message");
  }
});

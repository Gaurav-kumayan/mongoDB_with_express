const mongoose = require("mongoose");
const Chat  = require("./models/chat.js");


main().then(()=>{
    console.log("Connected to MongoDB successfully");
}).catch((err)=> console.error("MongoDB connection error:", err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

Chat.deleteMany({})
  .then((res) => {
    console.log("Chats have been deleted:", res);
  })
  .catch((err) => {
    console.error("Error deleting chats:", err);
  });

let chats = [
    new Chat({ from: "gaurav", to: "annu", msg: "hy", created_at: new Date() }),
    new Chat({ from: "annu", to: "gaurav", msg: "hello", created_at: new Date() }),
    new Chat({ from: "gaurav", to: "kanchan", msg: "how are you?", created_at: new Date() }),
    new Chat({ from: "kanchan", to: "gaurav", msg: "I'm good!", created_at: new Date() }),
    new Chat({ from: "gaurav", to: "himani", msg: "Long time no see!", created_at: new Date() }),
    new Chat({ from: "himani", to: "gaurav", msg: "Yeah, how have you been?", created_at: new Date() }),
    new Chat({ from: "renu", to: "arav", msg: "Hey, what's up?", created_at: new Date() }),
    new Chat({ from: "arav", to: "renu", msg: "Nothing much, just chilling!", created_at: new Date() }),
    new Chat({ from: "arav", to: "gaurav", msg: "Let's catch up soon!", created_at: new Date() }),
    new Chat({ from: "gaurav", to: "arav", msg: "Sure, let's plan something!", created_at: new Date() }),
  ];
  
  // Save all chats to the database
  Chat.insertMany(chats)
    .then(() => console.log("Chats saved successfully"))
    .catch((err) => console.error("Error saving chats:", err));
  
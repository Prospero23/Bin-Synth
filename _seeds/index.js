const mongoose = require("mongoose");

const Post = require("./PostSeedModel");


mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/music-app1");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDb = async () => {
  await Post.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const post = new Post({
        title: 'My first track UPDATE',
        author: "6498a5daa6bec45a9362af56",
        image: {
          url: 'https://res.cloudinary.com/dahhbxjil/image/upload/v1688491642/posts/snifdyv5hxw1sphfyxzw.png',
          filename: 'posts/snifdyv5hxw1sphfyxzw'
        },
        dateMade: '2023-10-19',
        description: 'Just me messing around really',
        comments: []

    });
    await post.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});

//title, author, dateMade, description
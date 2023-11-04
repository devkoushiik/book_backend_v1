const express = require("express");
const cors = require("cors");
const { PORT, MONGO_URI } = require("./config");
const mongoose = require("mongoose");
const router = require("./routes/booksRoute");

const app = express();

// Middleware for parsing body request
app.use(express.json());
// cors preventing error [by default cors(*)]
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get(`http:localhost:${PORT}`, (req, res) => {
  return res.status(234).send("This is Book Store App");
});

//
app.use("/books", router);

// connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

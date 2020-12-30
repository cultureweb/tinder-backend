import express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Data from "./data.js";
import Cards from "./models/dbCards.js";
import Videos from "./models/dbModel.js";

// app config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(Cors());
// app.use((req, res, next) => {
//   res.setHeader("Acces-Control-Allow-Origin", "*"),
//     res.setHeader("Acces-Control-Allow-Headers", "*"),
//     next();
// });

// DB config
const connection_url = process.env.ATLAS_URI || "mongodb://localhost/test-db";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// api endpoints
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/secure/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) =>
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
);

app.get("/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/secure/posts", (req, res) => {
  const dbVideos = req.body;
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Listen
app.listen(PORT, () => console.log(`listening on localhost: ${PORT}`));

import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.send("hello");
});

app.listen(8080, (err) => {
  if (err) {
    throw Error("server error");
  }

  console.log("server run");
});

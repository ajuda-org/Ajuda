import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.json({ msg: "deu boa" });
});

app.listen(3333);

import express from "express";
import apiRouter from "./api";

const app = new express ();

app.use (express.json());
app.use (express.urlencoded());

app.use('/api', apiRouter);
app.use("/author", (req, res) => {res.send ("Yurii Andrashko")});
app.use ("*", (req, res) => {res.send ("Not implemented")});
app.listen (3000);

console.log ("started on http://localhost:3000");
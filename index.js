const express = require("express");
const cookieParser = require("cookie-parser");
const { sendEmail } = require("./mail");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname+'/client/build')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.post("/api/sendMail", (req, res) => {
    //console.log(req.body);
    sendEmail(req.body.email, req.body.name, req.body.msg);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
console.log(__dirname);

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});
const PORT = process.env.DASHBOARDPORT || 80;


const express = require("express");
const app = express();

app.route("/", (req, res) => {

});

app.listen(80, () => {
    console.log("[Dashboard] Dashboard now Up and Running!");
});
class Dashboard {
    constructor(PORT, bot) {
        this.bot = bot;
        this.PORT = PORT;
        const express = require("express");
        this.app = express();

        this.app.get("/", (req, res) => {
            res.send("<h1>Soon</h1>");
        });

        this.app.get("/:uid", (req, res) => {
            res.send(req.params.uid);
        })

        this.app.listen(PORT, console.log("[Dashboard] Dashboard Up and Running!"));
    }
}

module.exports = Dashboard;
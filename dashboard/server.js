class Dashboard {
    constructor(PORT, bot) {
        const fs = require("fs");
        this.serveruuids = {};
        fs.writeFile("./serveruuids.json", JSON.stringify(this.serveruuids), function(err) {
            if(err) {
                console.log(err);
            }
        });
        this.bot = bot;
        this.PORT = PORT;
        const express = require("express");
        this.app = express();

        this.app.get("/", (req, res) => {
            res.send("<h1>Soon</h1>");
        });

        this.app.get("/:uid", (req, res) => {
            if(this.serveruuids[req.params.uid]) res.send("Yes");
            else res.send("No");
        })

        this.app.listen(PORT, console.log("[Dashboard] Dashboard Up and Running!"));
    }

    newUUID(uuid, server) {
        console.log("NEW UUID: " + uuid);
        this.serveruuids[uuid] = server;
        fs.writeFile("./serveruuids.json", JSON.stringify(this.serveruuids), function(err) {
            if(err) {
                console.log(err);
            }
        });
    }
}

module.exports = Dashboard;
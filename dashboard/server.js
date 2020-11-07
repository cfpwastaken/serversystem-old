const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

class WebSocket {
    constructor(token, port, bot) {
        this.token = token;
        this.bot = bot;

        this.app = express();
        this.app.engine("hbs", hbs({
            extname: "hbs",
            defaultLayout: "layout",
            layoutsDir: __dirname + "/layouts"
        }));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "hbs");
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json())

        this.registerRoots();

        this.server = this.app.listen(port, () => { console.log("[Dashboard] Dashboard now Up and Running!"); })
    }

    checkToken(_token) {
        return (_token == this.token)
    }

    registerRoots() {

        this.app.get("/", (req, res) => {
            var _token = req.query.token;

            if(!this.checkToken(_token)) {
                res.render("error", {title: "ERROR", errtype: "INVALID TOKEN"});
                return;
            }
            
            var chans = [];
            this.bot.guilds.first().channels.forEach(c => {
                chans.put({ id: c.id, name: c.name })
            });

            res.render("index", { title: "Server System", token: _token, chans })
        });

    }
}

module.exports = WebSocket;
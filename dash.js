module.exports = (bot) => {
    const express = require("express");
    const app = express();

    app.get("/", function(req, res) {
        res.send(req.query);
        bot.setPrefix(req.query.guild, req.query.pref);
    })

    app.listen(88, () => {
        console.log("[Dashboard] Running!");
    });
}
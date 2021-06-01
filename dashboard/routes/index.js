var express = require('express');
const OAuthClient = require("disco-oauth");
var router = express.Router();

let oauthClient = new OAuthClient("623913139980992569", "RXIOb-cKEL-KYGbq6FsloH4zMnrAAFJj");

oauthClient.setScopes(['identify', 'guilds']);
oauthClient.setRedirect("http://localhost:3000/login");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(oauthClient.authCodeLink);
  res.render('index', { title: 'Server System', url: "https://discord.com/api/oauth2/authorize?client_id=623913139980992569&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds" });
});

router.get('/login', async (req, res) => {
  let code = req.query.code;
  if(code == undefined) {
    res.json({"message": "error"});
  } else {
    let userkey = await oauthClient.getAccess(code).catch(console.error);
    res.cookies.set("key", userkey);

    res.redirect('/user');
  }
});

router.get('/user', async (req, res) => {
  let key = req.cookies.get("key");
  if(key) {
    let user = await oauthClient.getUser(key);
    let guilds = await oauthClient.getGuilds(key);

    res.render('user', {
      name: user.username,
      id: user.id,
      guilds: guilds
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;

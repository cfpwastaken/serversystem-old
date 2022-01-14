# Discord Bot

Discord Bot is a multi-purpose Discord Bot.

NOTE: This is the old version of the bot!! Please go to the new one!

NOTE: The bot is still in development and i am working on implementing old features again.

## Installing

Note: This part describes how you can install Discord Bot on your local machine. You will need to know how to create discord bots with discord.js

If you just want to use the bot, you can invite it [here](https://www.youtube.com/watch?v=dQw4w9WgXcQ "TopGG") or [here](https://discord.com/oauth2/authorize?client_id=623913139980992569&permissions=8&scope=bot "Discord")

1. Clone the repo: `git clone https://github.com/creelonestudios/discordbot`
2. Flood your harddrive with useless stuff: `npm i`
3. Make sure you have MySQL installed
4. Import the serversystem.sql file into your MySQL server.
5. Create a .env file and type this into the file:

   ```dotenv
   TOKEN=yourdiscordtokenhere
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=
   MYSQL_DATABASE=serversystem
   BOT_NAME=Bot name here
   ```

6. If you want music to work, your system also needs ffmpeg. If you are on windows, google it. If you are on linux: `sudo apt install ffmpeg`
7. Start the bot: `node .`

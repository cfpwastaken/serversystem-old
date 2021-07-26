# ServerSystem

Server System is a multi-purpose Discord Bot.

NOTE: The bot is still in development and i am working on implementing old features again.

## Installing

Note: This part describes how you can install Server System on your local machine. You will need to know how to create discord bots with discord.js

If you just want to use the bot, you can invite it [here](https://www.youtube.com/watch?v=dQw4w9WgXcQ "TopGG") or [here](https://www.youtube.com/watch?v=fC7oUOUEEi4 "Discord")

1. Clone the repo: `git clone https://github.com/cfpwastaken/serversystem`
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
   ```

6. Start the bot: `node .`

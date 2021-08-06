const { APIMessage, MessageEmbed } = require("discord.js");

module.exports = {
    embed(title, desc, color, footer) {
        let embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(desc)
        .setColor(color)
        .setFooter(footer + " | " + process.env.BOT_NAME);
        return embed;
    },
    createAPIMessage: async function (interaction, content) {
        const { data, files } = await APIMessage.create(
            require("./index").getBot().channels.resolve(interaction.channel_id),
            content
        ).resolveData().resolveFiles();

        return { ...data, files };
    },
    reply: async (interaction, response) => {
        let data = {
            content: response
        };

        if(typeof response === 'object') {
            // data = await this.createAPIMessage(interaction, response);       doesn't work
            const { data: da, files } = await APIMessage.create(
                require("./index").getBot().channels.resolve(interaction.channel_id),
                response
            ).resolveData().resolveFiles();
    
            data = { ...da, files };
        }

        require("./index").getBot().api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data
            }
        });
    },
    newGuildCommand: async (guildId, name, description, options) => {
        if(!options) options = [];
        await require("./index").getBot().api.applications(require("./index").getBot().user.id).guilds(guildId).commands.post({
            data: {
                name: name,
                description: description,
                options
            },
        });
    },
    newGlobalCommand: async (name, description, options) => {
        if(!options) options = [];
        await require("./index").getBot().api.applications(require("./index").getBot().user.id).commands.post({
            data: {
                name: name,
                description: description,
                options
            },
        });
    },
    deleteGuildCommand: async (guildId, commandId) => {
        await require("./index").getBot().api.applications(require("./index").getBot().user.id).guilds(guildId).commands(commandId).delete();
    },
    deleteGlobalCommand: async (commandId) => {
        await require("./index").getBot().api.applications(require("./index").getBot().user.id).commands(commandId).delete();
    }
};
const { SlashCommandBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('for dev team'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const developerId = config.developers;

        if (!developerId.includes(userId)) {
            await interaction.reply({ content: 'Bu komuta sadece geliştirici ekibi erişebilmektedir.', ephemeral: true });
            return;
        }

        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        await interaction.editReply(`:man_technologist: Latency Information\n:stopwatch: Uptime: ${Math.round(interaction.client.uptime / 60000)} minutes\n:sparkling_heart: Websocket heartbeat: ${interaction.client.ws.ping}ms.\n:round_pushpin: Rountrip Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);

    },
};
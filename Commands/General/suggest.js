const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("otlet")
        .setDescription("Javasolj valamit.")
        .addStringOption(option =>
            option.setName("name")
                .setDescription("Az ötleted neve.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("description")
                .setDescription("Az ötlet leírása.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const { guild, options, member } = interaction;

        const name = options.getString("name");
        const description = options.getString("description");

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Ötlet létrehozva ${member} által`)
            .addFields(
                { name: "Ötlet", value: `${name}` },
                { name: "Leírás", value: `${description}` },
            )
            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) });

        await guild.channels.cache.get('1076472871729238047').send({
            embeds: ([embed]),
        }).then((s) => {
            s.react(':white_check_mark:');
            s.react(':x:');
        }).catch((err) => {
            throw err;
        });

        interaction.reply({ content: ":white_check_mark: | Az ötlet sikeresen elkészült.", ephemeral: true });
    }
}
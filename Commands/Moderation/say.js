const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("say")
      .setDescription("Írj valamit ki!")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addStringOption((option) =>
        option
          .setName("szoveg")
          .setDescription("A szöveg amit ki szeretnék írni")
          .setRequired(true)
      ),
  
    async execute(interaction) {
      const {channel, options} = interaction;
      const description = options.getString("szoveg");
      
      const embed = new EmbedBuilder()
        .setDescription(description)
        .setColor(0x037821);
  
      const EmbedSend = await channel.send({ embeds: [embed] });
  
      interaction.reply({ content: "Üzenet elküldve!", ephemeral: true });
    },
  };
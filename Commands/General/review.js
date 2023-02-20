const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("review")
      .setDescription("Hagyj értékelést nekünk!")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addStringOption((option) =>
        option
          .setName("stars")
          .setDescription("Mennyi csillagot szeretnél adni?")
          .setRequired(true)
          .addChoices(
            { name: "⭐", value: "⭐" },
            { name: "⭐⭐", value: "⭐⭐" },
            { name: "⭐⭐⭐", value: "⭐⭐⭐" },
            { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
            { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" }
          )
      )
      .addStringOption((option) =>
        option
          .setName("description")
          .setDescription("A váleményed.")
          .setRequired(true)
      ),
    async execute(interaction, client) {
      const { options, guild } = interaction;
      const stars = options.getString("stars");
      const desc = options.getString("description");
  
      const ID = "1076608967146483793"; // add the id of the channel where the message is sent.
  
      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .addFields([
          {
            name: "Csillag",
            value: `${stars}`,
          },
          {
            name: "Vélemény",
            value: `${desc}`,
          },
        ])
        .setColor("Red")
        .setTimestamp();
  
      guild.channels.cache.get(ID).send({
        embeds: [embed],
      });
  
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription("Az értékelés sikeresen elküldve.")
            .setColor("Green"),
        ],
        ephemeral: true,
      });
    },
  };
  
  // Credits to me 🚀 (SplifPvP#3460)
  
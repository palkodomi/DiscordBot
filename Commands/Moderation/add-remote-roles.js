const {
    EmbedBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("role")
      .setDescription("Kezeld a rangokat a felhasználón.")    
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  
      .addSubcommand((subcommand) =>
        subcommand
          .setName("add") //hozzaadas
          .setDescription("Adj hozzá rangot a felhasználónak.")
          .addRoleOption((option) =>
            option
              .setName("role") //rang
              .setDescription("A rang amit adni akarsz.")
              .setRequired(true)
          )
          .addUserOption((option) =>
            option
              .setName("user") //felhasznalo
              .setDescription("A felhasználó akinek adni akarod.")
              .setRequired(true)
          )
      )
      .addSubcommand((subcommand) =>
        subcommand
          .setName("remove") //elvetel
          .setDescription("Vegyél el rangot a felhasználótól.")
          .addRoleOption((option) =>
            option
              .setName("role") //rang
              .setDescription("A rang amit el szeretnél venni a felhasználótól.")
              .setRequired(true)
          )
          .addUserOption((option) =>
            option
              .setName("user") //felhasznalo
              .setDescription("A felhasználó akitől el szeretnéd venni.")
              .setRequired(true)
          )
      ),
  
    async execute(interaction) {
      if (interaction.options.getSubcommand() === "add") {
        try {
          const member = interaction.options.getMember("user");
          const role = interaction.options.getRole("role");
  
          await member.roles.add(role);
  
          const embed = new EmbedBuilder()
            .setTitle("Rang hozzáadás")
            .setDescription(`Sikeresen hozzáadtad: ${role} rangot ${member}-nak`)
            .setColor("Green")
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({
              text: interaction.guild.name,
              iconURL: interaction.guild.iconURL(),
            });
  
          interaction.reply({ embeds: [embed] });
        } catch {
          return interaction.reply({
            content: `Hiba merült fel a rang hozzáadásának folyamatában.`,
          });
        }
      }
      if (interaction.options.getSubcommand() === "remove") {
        try {
          const member = interaction.options.getMember("user");
          const role = interaction.options.getRole("role");
  
          await member.roles.remove(role);
  
          const embed = new EmbedBuilder()
            .setTitle("Rang elvéve")
            .setDescription(
              `Sikeresen elvetted: ${role} rangot ${member}-tól`
            )
            .setColor("Green")
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({
              text: interaction.guild.name,
              iconURL: interaction.guild.iconURL(),
            });
  
          interaction.reply({ embeds: [embed] });
        } catch {
          return interaction.reply({
            content: `Hiba merült fel a rang hozzáadásának folyamatában.`,
          });
        }
      }
    },
  };
const ID = "1076608967146483793";

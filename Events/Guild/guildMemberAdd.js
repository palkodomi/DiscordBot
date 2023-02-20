const {EmbedBuilder} = require("@discordjs/builders");
const {GuildMember, Embed, InteractionCollector} = require("discord.js");
const Schema = require("../../Models/Welcome");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        Schema.findOne({Guild: member.guild.id}, async (err, data) => {
            if (!data) return;
            let channel = "1076479452948725831";
            let Msg = `Szia **${member.user.tag}**! Üdvözöllek téged itt a **❰ ★ White State RolePlay ★ ❱** szerverén! `
            let Role1 = "1048879007862628352";
            let Role2 = "1048879160220725248";

            const {user, guild} = member;
            const welcomeChannel = member.guild.channels.cache.get(channel);

            const welcomeEmbed = new EmbedBuilder()
            .setTitle("**Új Tag!**")
            .setDescription(Msg)
            .setColor(0x037821)
            .addFields({name: 'Összes tag:', value: `${guild.memberCount}`})
            .setTimestamp();

            welcomeChannel.send({embeds: [welcomeEmbed]});
            member.roles.add(Role1);
            member.roles.add(Role2);
        })
    }
}
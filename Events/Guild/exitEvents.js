const { EmbedBuilder, GuildMember } = require("discord.js");
const exitSchema = require('../../Models/exitSchema');

module.exports = {
    name: 'guildMemberRemove',
    /**
     * 
     * @param {GuildMember} member 
     */
    async execute(member, client) {
        exitSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                return
            } else if (data) {
                let messageExit
                try {
                    messageExit = data.text
                        .replace(/${user}/, member)
                        .replace(/${user.tag}/, member.tag)
                        .replace(/${server}/, member.guild.name)
                        .replace(/${user.id}/, member.id)
                        .replace(/${membercount}/, member.guild.memberCount)
                } catch { }
                const defaultMessage = `**${member.user.tag}** kilépett a ${member.guild.name} szerveréről`;
                const channelSend = client.channels.cache.get(data.channelId);

                let assignedRole = member.guild.roles.cache.get(data.role);

                try { await member.roles.add(assignedRole) } catch { }

                const embed = new EmbedBuilder()
                    .setDescription(messageExit == null ? defaultMessage : messageExit)
                    .setAuthor({ name: member.guild.name, iconURL: member.user.avatarURL() })
                    .setFooter({ text: `• UserID: ${member.user.id}`, iconURL: member.guild.iconURL({ dynamic: true }) })

                channelSend.send({ embeds: [embed], ephemeral: true })
            }
        })
    }
}
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const exitSchema = require('../../Models/exitSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exit_system')
        .setDescription('Exit system.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addSubcommand((subcommand) =>
            subcommand
                .setName('setup')
                .setDescription('Setup section.')
                .addChannelOption((options) =>
                    options
                        .setName('exit_channel')
                        .setDescription('Select channel.')
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
                .addStringOption((options) =>
                    options
                        .setName('exit_text')
                        .setDescription('Avaible tag {user} | {server} | {user.tag} | {user.id} | {membercount}.')
                        .setRequired(false)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('delete')
                .setDescription('Delete welcome system.')
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('update_channel')
                .setDescription('Update exit channel.')
                .addChannelOption((options) =>
                    options
                        .setName('update_exit_channel')
                        .setDescription('Select channel.')
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        ),
    async execute(interaction, client) {
        const { options, guildId } = interaction;
        const prefix = 'Exit system'

        const subcommand = options.getSubcommand();

        const channel = options.getChannel('exit_channel');
        const updateChannel = options.getChannel('update_exit_channel');

        const text = options.getString('exit_text') || null;

        const embed = new EmbedBuilder()
            .setFooter({ text: `${prefix} | ${client.user.username}`, iconURL: interaction.guild.iconURL() })

        if (subcommand === 'setup') {
            exitSchema.findOne({ guildId: guildId }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    await exitSchema.create({
                        guildId: guildId,
                        channelId: channel.id,
                        text: text,
                    })
                    interaction.reply({
                        embeds: [
                            embed
                                .setDescription(`✅ **| ${prefix}**\n\n`)
                                .addFields({
                                    name: `Channel`,
                                    value: `${channel}`,
                                    inline: true
                                })
                                .addFields({
                                    name: `Text`,
                                    value: `${text == null ? 'default message' : text}`,
                                    inline: true
                                })
                                .setColor('Green')
                        ],
                        ephemeral: true
                    })
                } else if (data) {
                    interaction.reply({
                        embeds: [
                            embed
                                .setDescription(`Use /exit_system delete and recreate setup`)
                                .setColor('Red')
                        ],
                        ephemeral: true
                    })
                }
            })
        } else if (subcommand == 'delete') {
            exitSchema.findOneAndDelete({ guildId: guildId }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    interaction.reply({
                        embeds: [
                            embed
                                .setDescription('No data found')
                                .setColor('Red')
                        ],
                        ephemeral: true
                    })
                } else if (data) {
                    interaction.reply({
                        embeds: [
                            embed
                                .setDescription(`${prefix} succesfull deleted`)
                                .setColor('Green')
                        ],
                        ephemeral: true
                    })
                }
            })
        } else if (subcommand == 'update_channel') {
            exitSchema.findOne({ guildId: guildId }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    interaction.reply({
                        embeds: [
                            embed
                                .setDescription('No data found')
                                .setColor('Red')
                        ],
                        ephemeral: true
                    })
                } else if (data) {
                    let old = {
                        channel: data.channelId,
                    }
                    await data.updateOne({
                        channelId: updateChannel.id,
                    })
                    interaction.reply({
                        embeds: [
                            embed
                                .setDescription(`${prefix} updated\n\n`)
                                .addFields({
                                    name: `Channel`,
                                    value: `| old <#${old.channel}>\n| new ${updateChannel}`,
                                })
                                .setColor('Green')
                        ],
                        ephemeral: true
                    })
                }
            })
        }
    }
}
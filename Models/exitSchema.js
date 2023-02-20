const { Schema, model } = require("mongoose");
const exitSchema = new Schema({
    guildId: String,
    channelId: String,
    text: String,
    role: String,
}, { versionKey: false });

module.exports = model("exitSchema", exitSchema, "exitSchema");
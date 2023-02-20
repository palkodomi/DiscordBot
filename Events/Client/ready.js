const {Client} = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../config.json");

mongoose.set('strictQuery', true);

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('MongoDB connection succesful.')
        }

        console.log(`${client.user.username} is now online.`);
    },
};
const mineflayer = require('mineflayer');
const express = require('express');  // ✅ Added for uptime hosting
const app = express();

// === CONFIGURATION ===
const HOST = 'play.applemc.fun'; // Server IP
const PORT = 25565;              // Default Minecraft port
const USERNAME = 'MesolexoGoat'; // Bot username (cracked)
const PASSWORD = 'password7678'; // Bot login password
const VERSION = '1.20.1';        // Minecraft version

function createBot() {
    const bot = mineflayer.createBot({
        host: HOST,
        port: PORT,
        username: USERNAME,
        auth: 'offline',
        version: VERSION
    });

    bot.on('login', () => {
        console.log(`[BOT] Connected to ${HOST}, logging in...`);
        setTimeout(() => {
            bot.chat(`/login ${PASSWORD}`);
        }, 1500);
    });

    bot.on('spawn', () => {
        console.log(`[BOT] Spawned in hub. Going to Banana realm...`);

        // Step 1: Go to Banana realm
        setTimeout(() => {
            bot.chat('/server Banana');
        }, 3000);

        // Step 2: Warp AFK after entering Banana
        setTimeout(() => {
            bot.chat('/warp AFK');
        }, 7000);

        // Step 3: Anti-AFK small movements
        setInterval(() => {
            bot.setControlState('left', true);
            setTimeout(() => bot.setControlState('left', false), 500);
        }, 15000);
    });

    bot.on('message', msg => {
        console.log(`[CHAT] ${msg.toString()}`);
    });

    bot.on('kicked', (reason, loggedIn) => {
        console.log(`[BOT] Kicked: ${reason}`);
    });

    bot.on('error', err => {
        console.error(`[ERROR] ${err}`);
    });

    bot.on('end', () => {
        console.log(`[BOT] Disconnected. Reconnecting in 5 seconds...`);
        setTimeout(createBot, 5000);
    });
}

// === Keep Alive Webserver for Render / UptimeRobot ===
app.get("/", (req, res) => {
  res.send("Bot is running 24/7!");
});

const WEB_PORT = process.env.PORT || 3000;
app.listen(WEB_PORT, () => console.log(`Web server running on port ${WEB_PORT}`));

// Start bot
createBot();

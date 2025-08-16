const mineflayer = require("mineflayer");

// === BOT SETTINGS ===
const botOptions = {
  host: "your.server.ip",   // put server IP
  port: 25565,              // change if server uses custom port
  username: "BotName123",   // bot name (if cracked server)
  version: false            // false = auto-detect version
};

// === BOT CREATOR FUNCTION ===
function createBot() {
  const bot = mineflayer.createBot(botOptions);

  // ✅ On Login
  bot.on("login", () => {
    console.log("[BOT] Logged in successfully!");
    // Wait and then send a greeting
    setTimeout(() => {
      bot.chat("Hello everyone!");
    }, 15000); // send after 15 seconds
  });

  // ✅ AntiBot bypass - random movements
  bot.on("spawn", () => {
    console.log("[BOT] Spawned in the world!");

    // Move around randomly every 20s
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      bot.look(yaw, 0, false);
      bot.setControlState("jump", true);

      setTimeout(() => {
        bot.setControlState("jump", false);
      }, 1000);

      console.log("[BOT] Moving randomly to look human");
    }, 20000);

    // Chat randomly every 30–60s
    setInterval(() => {
      const msgs = ["hi", "hello", "how are you?", "nice server!", "gg"];
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      bot.chat(msg);
      console.log("[BOT] Sent chat:", msg);
    }, Math.floor(Math.random() * 30000) + 30000);
  });

  // ✅ Handle Kick
  bot.on("kicked", (reason) => {
    console.log("[BOT] Kicked:", reason);
    console.log("[BOT] Reconnecting in 2 minutes...");
    setTimeout(createBot, 120000); // wait 2 mins before reconnecting
  });

  // ✅ Handle End
  bot.on("end", () => {
    console.log("[BOT] Disconnected. Reconnecting in 2 minutes...");
    setTimeout(createBot, 120000);
  });

  bot.on("error", (err) => {
    console.log("[BOT] Error:", err.message);
  });
}

// === START THE BOT ===
createBot();

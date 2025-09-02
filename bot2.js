const mineflayer = require("mineflayer");
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");
const mcData = require("minecraft-data");

// ====== BOT CONFIG ======
const bot = mineflayer.createBot({
  host: "play.concordmc.net",   // put your server IP
  port: 25565,              // change if not default
  username: "hiro",  // cracked = username, premium = email
  version: '1.20.1'   // false = auto-detect
});

bot.loadPlugin(pathfinder);

// ====== ON SPAWN ======
bot.once("spawn", () => {
  console.log("✅ Bot spawned!");

  // Step 1: Login
  bot.chat("/login dhrimon69"); 

  // Small delay before walking
  setTimeout(() => {
    goToNPC();
  }, 4000);
});

// ====== WALK TO NPC ======
function goToNPC() {
  const data = mcData(bot.version);
  const defaultMove = new Movements(bot, data);

  bot.pathfinder.setMovements(defaultMove);

  // NPC coordinates you gave: (2.493, -36, 26.073)
  const goal = new goals.GoalBlock(2, -36, 26);
  bot.pathfinder.setGoal(goal);
}

// ====== WHEN REACHED NPC ======
bot.on("goal_reached", () => {
  console.log("✅ Reached NPC!");

  // Find nearest entity (NPC)
  const npc = bot.nearestEntity(e => e.type === "player" || e.type === "mob");

  if (npc) {
    bot.activateEntity(npc); // Right click
    console.log("✅ Clicked NPC!");

    // Wait 3s then warp
    setTimeout(() => {
      bot.chat("/warp afk");
      console.log("✅ Warped to AFK!");
      startAntiAFK();
    }, 3000);
  } else {
    console.log("⚠️ No NPC found, staying here.");
  }
});

// ====== ANTI-AFK ======
function startAntiAFK() {
  setInterval(() => {
    bot.setControlState("jump", true);
    setTimeout(() => bot.setControlState("jump", false), 500);
  }, 60 * 1000); // every 1 min
}

import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("habitquest.db");

export function initializeDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS user_stats (
      id INTEGER PRIMARY KEY,
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1
    );
  `);

  db.execSync(`
    INSERT OR IGNORE INTO user_stats
    (id, xp, level)
    VALUES (1, 0, 1);
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      xpReward INTEGER NOT NULL
    );
  `);
}

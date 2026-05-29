import { db } from "./db";

export type UserStats = {
  id: number;
  xp: number;
  level: number;
};

export function getUserStats(): UserStats | null {
  return db.getFirstSync<UserStats>("SELECT * FROM user_stats WHERE id = 1");
}

export function updateUserStats(xp: number, level: number) {
  db.runSync(
    `
      UPDATE user_stats
      SET xp = ?, level = ?
      WHERE id = 1
    `,
    [xp, level],
  );
}

export function addXP(amount: number) {
  const user = getUserStats();

  if (!user) return;

  const newXp = user.xp + amount;
  const newLevel = Math.floor(newXp / 100) + 1;

  updateUserStats(newXp, newLevel);
}

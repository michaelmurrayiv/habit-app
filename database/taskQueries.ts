import { db } from "./db";

export type Task = {
  id: number;
  title: string;
  completed: number;
  xpReward: number;
};

export function createDefaultTasks() {
  const count = db.getFirstSync<{ count: number }>(
    "SELECT COUNT(*) as count FROM tasks",
  );

  if (count?.count === 0) {
    db.runSync(
      `
      INSERT INTO tasks
      (title, completed, xpReward)
      VALUES
      ('Workout', 0, 20),
      ('Read 10 Pages', 0, 15),
      ('Drink Water', 0, 10)
    `,
    );
  }
}

export function getTasks(): Task[] {
  return db.getAllSync<Task>("SELECT * FROM tasks");
}

export function getTaskById(id: number): Task | null {
  return (
    db.getFirstSync<Task>("SELECT * FROM tasks WHERE id = ?", [id]) ?? null
  );
}

export function toggleTask(id: number) {
  const task = getTaskById(id);

  if (!task) return;

  const newCompleted = task.completed === 1 ? 0 : 1;

  db.runSync(
    `
      UPDATE tasks
      SET completed = ?
      WHERE id = ?
    `,
    [newCompleted, id],
  );
}

export function addTask(title: string, xpReward: number) {
  db.runSync(
    `
      INSERT INTO tasks
      (title, completed, xpReward)
      VALUES (?, 0, ?)
    `,
    [title, xpReward],
  );
}

export function deleteTask(id: number) {
  db.runSync(
    `
      DELETE FROM tasks
      WHERE id = ?
    `,
    [id],
  );
}

export function resetTasks() {
  db.runSync(`
    UPDATE tasks
    SET completed = 0
  `);
}

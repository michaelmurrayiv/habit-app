import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import Shop from "./components/Shop";
import Profile from "./components/Profile";

import { initializeDatabase } from "./database/db";

import {
  createDefaultTasks,
  getTasks,
  toggleTask as dbToggleTask,
  Task,
} from "./database/taskQueries";

import { getUserStats, addXP, updateUserStats } from "./database/userQueries";

export default function App() {
  const [screen, setScreen] = useState("dashboard");

  const [xp, setXp] = useState(0);

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    initializeDatabase();

    createDefaultTasks();

    const loadedTasks = getTasks();
    setTasks(loadedTasks);

    const user = getUserStats();

    if (user) {
      setXp(user.xp);
    }
  }, []);

  const toggleTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    dbToggleTask(id);

    if (!task.completed) {
      addXP(task.xpReward);
    } else {
      const user = getUserStats();

      if (user) {
        const newXp = Math.max(0, user.xp - task.xpReward);

        const newLevel = Math.floor(newXp / 100) + 1;

        updateUserStats(newXp, newLevel);
      }
    }

    const updatedTasks = getTasks();
    setTasks(updatedTasks);

    const updatedUser = getUserStats();

    if (updatedUser) {
      setXp(updatedUser.xp);
    }
  };

  const buyReward = (cost: number) => {
    const user = getUserStats();

    if (!user) return;

    if (user.xp >= cost) {
      const newXp = user.xp - cost;

      const newLevel = Math.floor(newXp / 100) + 1;

      updateUserStats(newXp, newLevel);

      setXp(newXp);
    }
  };

  const tasksCompleted = tasks.filter((task) => task.completed === 1).length;

  const level = Math.floor(xp / 100) + 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {screen === "dashboard" && (
          <Dashboard
            xp={xp}
            level={level}
            tasksCompleted={tasksCompleted}
            totalTasks={tasks.length}
          />
        )}

        {screen === "tasks" && (
          <Tasks
            tasks={tasks.map((task) => ({
              ...task,
              completed: task.completed === 1,
            }))}
            toggleTask={toggleTask}
          />
        )}

        {screen === "shop" && <Shop xp={xp} buyReward={buyReward} />}

        {screen === "profile" && (
          <Profile xp={xp} level={level} tasksCompleted={tasksCompleted} />
        )}
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setScreen("dashboard")}>
          <Text>🏠 Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("tasks")}>
          <Text>✅ Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("shop")}>
          <Text>🛒 Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("profile")}>
          <Text>👤 Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
});

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import Shop from "./components/Shop";
import Profile from "./components/Profile";

export default function App() {
  const [screen, setScreen] = useState("dashboard");

  const [xp, setXp] = useState(0);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Workout",
      completed: false,
      xpReward: 20,
    },
    {
      id: 2,
      title: "Read 10 Pages",
      completed: false,
      xpReward: 15,
    },
    {
      id: 3,
      title: "Drink Water",
      completed: false,
      xpReward: 10,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          if (!task.completed) {
            setXp((current) => current + task.xpReward);
          }

          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      }),
    );
  };

  const buyReward = (cost: number) => {
    if (xp >= cost) {
      setXp((prev) => prev - cost);
    }
  };

  const tasksCompleted = tasks.filter((task) => task.completed).length;

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

        {screen === "tasks" && <Tasks tasks={tasks} toggleTask={toggleTask} />}

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
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});

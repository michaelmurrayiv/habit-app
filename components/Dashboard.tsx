import React from "react";
import { View, Text, StyleSheet } from "react-native";

type DashboardProps = {
  xp: number;
  level: number;
  tasksCompleted: number;
  totalTasks: number;
};

export default function Dashboard({
  xp,
  level,
  tasksCompleted,
  totalTasks,
}: DashboardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.stat}>Level: {level}</Text>
      <Text style={styles.stat}>XP: {xp}</Text>

      <Text style={styles.stat}>
        Progress: {tasksCompleted}/{totalTasks}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  stat: {
    fontSize: 22,
    marginBottom: 10,
  },
});

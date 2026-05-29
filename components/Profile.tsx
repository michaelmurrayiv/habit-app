import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ProfileProps = {
  xp: number;
  level: number;
  tasksCompleted: number;
};

export default function Profile({ xp, level, tasksCompleted }: ProfileProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text style={styles.stat}>Level: {level}</Text>

      <Text style={styles.stat}>Total XP: {xp}</Text>

      <Text style={styles.stat}>Tasks Completed: {tasksCompleted}</Text>
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
    fontSize: 20,
    marginBottom: 10,
  },
});

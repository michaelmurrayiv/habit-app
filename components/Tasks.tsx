import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  xpReward: number;
};

type TasksProps = {
  tasks: Task[];
  toggleTask: (id: number) => void;
};

export default function Tasks({ tasks, toggleTask }: TasksProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.taskCard, item.completed && styles.completedCard]}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={styles.taskText}>
              {item.completed ? "✅" : "⬜"} {item.title}
            </Text>

            <Text style={styles.reward}>+{item.xpReward} XP</Text>
          </TouchableOpacity>
        )}
      />
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

  taskCard: {
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
  },

  completedCard: {
    backgroundColor: "#c8f7c5",
  },

  taskText: {
    fontSize: 18,
  },

  reward: {
    marginTop: 5,
    color: "gray",
  },
});

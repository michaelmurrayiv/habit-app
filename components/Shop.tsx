import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Reward = {
  id: number;
  name: string;
  cost: number;
};

type ShopProps = {
  xp: number;
  buyReward: (cost: number) => void;
};

const rewards: Reward[] = [
  {
    id: 1,
    name: "Coffee",
    cost: 5,
  },
  {
    id: 2,
    name: "Movie Night",
    cost: 100,
  },
  {
    id: 3,
    name: "Pizza",
    cost: 150,
  },
];

export default function Shop({ xp, buyReward }: ShopProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reward Shop</Text>

      <Text style={styles.xp}>Current XP: {xp}</Text>

      {rewards.map((reward) => (
        <View key={reward.id} style={styles.card}>
          <Text style={styles.rewardName}>{reward.name}</Text>

          <Text>{reward.cost} XP</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => buyReward(reward.cost)}
          >
            <Text style={styles.buttonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      ))}
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

  xp: {
    fontSize: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },

  rewardName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

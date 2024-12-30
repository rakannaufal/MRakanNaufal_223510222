import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Title } from "react-native-paper";

const MenuScreen = ({ navigation }) => {
  const [order, setOrder] = useState([]);

  const menuItems = [
    { id: 1, name: "Kopi Hitam", price: 15000 },
    { id: 2, name: "Latte", price: 25000 },
    { id: 3, name: "Cappuccino", price: 30000 },
    { id: 4, name: "Teh Hijau", price: 20000 },
  ];

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Menu Cafe</Title>
      {menuItems.map((item) => (
        <Card key={item.id} style={styles.card}>
          <Card.Title
            title={item.name}
            subtitle={`Rp ${item.price.toLocaleString()}`}
          />
          <Card.Actions>
            <Button
              buttonColor="#6a1b9a"
              textColor="#ffffff"
              onPress={() => addToOrder(item)}
            >
              Tambah
            </Button>
          </Card.Actions>
        </Card>
      ))}
      <Button
        style={styles.orderButton}
        buttonColor="#283593"
        textColor="#fff"
        onPress={() => navigation.navigate("OrderSummary", { order })}
      >
        Lihat Pesanan
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3e5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a148c",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fff",
  },
  orderButton: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 10,
  },
});

export default MenuScreen;

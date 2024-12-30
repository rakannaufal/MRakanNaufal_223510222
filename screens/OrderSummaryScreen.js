import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { List, Text, Button, Title } from "react-native-paper";

const OrderSummaryScreen = ({ route, navigation }) => {
  const [order, setOrder] = useState(
    route.params.order.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, [])
  );

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveItem = (id) => {
    const updatedOrder = order
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setOrder(updatedOrder);
  };

  const handleResetOrder = () => {
    setOrder([]);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Ringkasan Pesanan</Title>
      {order.length === 0 ? (
        <Text style={styles.emptyText}>Pesanan Anda kosong.</Text>
      ) : (
        <View>
          {order.map((item) => (
            <List.Item
              key={item.id}
              title={`${item.name} (x${item.quantity})`}
              description={`Rp ${(
                item.price * item.quantity
              ).toLocaleString()}`}
              left={(props) => (
                <List.Icon {...props} icon="coffee" color="#6a1b9a" />
              )}
              right={(props) => (
                <Button
                  mode="text"
                  onPress={() => handleRemoveItem(item.id)}
                  textColor="#d32f2f"
                  style={styles.deleteButton}
                >
                  Hapus
                </Button>
              )}
              style={styles.listItem}
            />
          ))}
          <Text style={styles.total}>
            Total:{" "}
            <Text style={styles.totalPrice}>
              Rp {calculateTotal().toLocaleString()}
            </Text>
          </Text>
        </View>
      )}
      <Button
        mode="contained"
        style={styles.backButton}
        buttonColor="#6a1b9a"
        textColor="#fff"
        onPress={() => navigation.goBack()}
      >
        Kembali ke Menu
      </Button>
      {order.length > 0 && (
        <Button
          mode="contained"
          style={styles.resetButton}
          buttonColor="#d32f2f"
          textColor="#fff"
          onPress={handleResetOrder}
        >
          Reset Pesanan
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ede7f6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a148c",
    textAlign: "center",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#757575",
    textAlign: "center",
    marginTop: 20,
  },
  listItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
  },
  deleteButton: {
    marginHorizontal: 8,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "right",
  },
  totalPrice: {
    color: "#6a1b9a",
  },
  backButton: {
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 10,
  },
  resetButton: {
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: 10,
  },
});

export default OrderSummaryScreen;

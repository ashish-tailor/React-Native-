import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const ProductList = ({ data }) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.cardView}>
            <View style={styles.imageView}>
              <Image
                source={{ uri: item.images[0] }}
                style={styles.productImage}
              />
            </View>

            <View style={styles.cardHeaderView}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text numberOfLines={3}>{item.description}</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Rating</Text>
                <Text>Stock</Text>
                <Text>Price</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>{item.rating}</Text>
                <Text>{item.stock}</Text>
                <Text>{item.price} $</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: "#FFF",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
  },
  imageView: {
    borderRadius: 70,
    width: 70,
    height: 70,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 50,
    height: 50,
  },
  cardHeaderView: { flex: 1, gap: 10 },
  cardTitle: { fontSize: 16, fontWeight: "700" },
});

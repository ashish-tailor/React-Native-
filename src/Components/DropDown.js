import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const Dropdown = ({ items, onSelectItem, defaultItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultItem);

  useEffect(() => {
    setSelectedItem(defaultItem);
  }, [defaultItem]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item.name);
    onSelectItem(item.slug);
    setExpanded(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.item}>
        <Text style={styles.itemText}>{selectedItem}</Text>
      </TouchableOpacity>
      {expanded && (
        <ScrollView style={styles.subItemsContainer}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.subItem}
              onPress={() => handleSelectItem(item)}
            >
              <Text style={styles.subItemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  item: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 18,
  },
  subItemsContainer: {
    height: 250,
    backgroundColor: "#eee",
  },
  subItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  subItemText: {
    fontSize: 16,
  },
});

export default Dropdown;

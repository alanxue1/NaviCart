import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { collection, addDoc, query, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { GROCERY_CATEGORIES, categorizeItem } from './constants/groceryCategories';

export default function GroceryList() {
  const [newItem, setNewItem] = useState('');
  const [groceryItems, setGroceryItems] = useState({});
  const [isChecklist, setIsChecklist] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'groceryItems'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!items[data.category]) {
          items[data.category] = [];
        }
        items[data.category].push({
          id: doc.id,
          ...data
        });
      });
      setGroceryItems(items);
    });

    return () => unsubscribe();
  }, []);

  const addItem = async () => {
    if (newItem.trim()) {
      const category = categorizeItem(newItem);
      await addDoc(collection(db, 'groceryItems'), {
        name: newItem.trim(),
        category,
        completed: false,
        createdAt: new Date()
      });
      setNewItem('');
    }
  };

  const toggleItemComplete = async (itemId, completed) => {
    const itemRef = doc(db, 'groceryItems', itemId);
    await updateDoc(itemRef, {
      completed: !completed
    });
  };

  const deleteItem = async (itemId) => {
    await deleteDoc(doc(db, 'groceryItems', itemId));
  };

  const renderCategory = ({ item: category }) => {
    const items = groceryItems[category] || [];
    if (items.length === 0) return null;

    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{GROCERY_CATEGORIES[category]?.name || category}</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => toggleItemComplete(item.id, item.completed)}
            >
              {item.completed && <Text>✓</Text>}
            </TouchableOpacity>
            <Text style={[
              styles.itemText,
              item.completed && styles.completedItem
            ]}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => deleteItem(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isChecklist && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Add grocery item"
            placeholderTextColor="#666"
            onSubmitEditing={addItem}
          />
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsChecklist(!isChecklist)}
      >
        <Text style={styles.toggleButtonText}>
          {isChecklist ? 'Edit List' : 'View Checklist'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={Object.keys(GROCERY_CATEGORIES)}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: '#000',
    placeholderTextColor: '#666',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
  },
  completedItem: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 20,
    color: 'red',
  },
  toggleButton: {
    backgroundColor: '#34C759',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 
import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from 'react-native';

type MenuItem = {
  id: string;
  name: string;
  course: string;
  price: string;
};

function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Restaurant Menu Manager</Text>
        <Text style={styles.subtitle}>
          Manage your restaurant menu
        </Text>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          MENU ITEMS ({menuItems.length})
        </Text>

        {menuItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No menu items yet</Text>

            <Text style={styles.emptyText}>
              Add your first menu item to get started.
            </Text>
          </View>
        ) : (
          <FlatList
            data={menuItems}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.menuCard}>
                <View>
                  <Text style={styles.dishName}>{item.name}</Text>
                  <Text style={styles.course}>{item.course}</Text>
                </View>

                <Text style={styles.price}>R{item.price}</Text>
              </View>
            )}
          />
        )}

        {/* Add button */}
        <Pressable
          style={styles.addButton}
          onPress={() => {
            // We will add the form here in the next step.
          }}>
          <Text style={styles.addButtonText}>+ Add Menu Item</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222222',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#777777',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555555',
    marginBottom: 14,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: '#777777',
    textAlign: 'center',
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  dishName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222222',
  },

  course: {
    marginTop: 5,
    fontSize: 14,
    color: '#777777',
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
  },

  addButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default App;
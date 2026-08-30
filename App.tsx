import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  TextInput,
} from 'react-native';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showAddScreen, setShowAddScreen] = useState(false);

  // Show Add Menu Item screen
  if (showAddScreen) {
    return (
      <AddMenuItemScreen
        onCancel={() => setShowAddScreen(false)}
      />
    );
  }

  // Home screen
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

        {/* Add Menu Item button */}
        <Pressable
          style={styles.addButton}
          onPress={() => setShowAddScreen(true)}>
          <Text style={styles.addButtonText}>+ Add Menu Item</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/*
 * Add Menu Item Screen
 */
function AddMenuItemScreen({
  onCancel,
}: {
  onCancel: () => void;
}) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Add Menu Item</Text>
        <Text style={styles.subtitle}>
          Enter the details of the new dish
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Dish Name */}
        <Text style={styles.label}>Dish Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter dish name"
          value={dishName}
          onChangeText={setDishName}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter dish description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Course */}
        <Text style={styles.label}>Course</Text>

        <View style={styles.courseContainer}>
          <Pressable
            style={[
              styles.courseOption,
              course === 'Starter' && styles.selectedCourse,
            ]}
            onPress={() => setCourse('Starter')}>
            <Text
              style={[
                styles.courseOptionText,
                course === 'Starter' && styles.selectedCourseText,
              ]}>
              Starter
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.courseOption,
              course === 'Main Course' && styles.selectedCourse,
            ]}
            onPress={() => setCourse('Main Course')}>
            <Text
              style={[
                styles.courseOptionText,
                course === 'Main Course' && styles.selectedCourseText,
              ]}>
              Main Course
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.courseOption,
              course === 'Dessert' && styles.selectedCourse,
            ]}
            onPress={() => setCourse('Dessert')}>
            <Text
              style={[
                styles.courseOptionText,
                course === 'Dessert' && styles.selectedCourseText,
              ]}>
              Dessert
            </Text>
          </Pressable>
        </View>

        {/* Price */}
        <Text style={styles.label}>Price</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.cancelButton}
            onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={styles.saveButton}
            onPress={() => {
              // Saving will be added in Step 3.
            }}>
            <Text style={styles.saveButtonText}>Save Menu Item</Text>
          </Pressable>
        </View>
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

  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#222222',
  },

  descriptionInput: {
    height: 90,
    textAlignVertical: 'top',
  },

  courseContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  courseOption: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },

  selectedCourse: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },

  courseOptionText: {
    fontSize: 13,
    color: '#555555',
  },

  selectedCourseText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#555555',
    fontSize: 15,
    fontWeight: '600',
  },

  saveButton: {
    flex: 1,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default App;
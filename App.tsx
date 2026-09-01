import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

function App() {
  const [screen, setScreen] = useState('home');

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const [error, setError] = useState('');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [successMessage, setSuccessMessage] = useState('');

  const showHome = () => {
    setScreen('home');
    setError('');
  };

  const showAddMenu = () => {
    setScreen('add');
    setError('');
    setSuccessMessage('');
  };

  const saveMenuItem = () => {
    if (dishName.trim() === '') {
      setError('Please enter a dish name.');
      return;
    }

    if (description.trim() === '') {
      setError('Please enter a description.');
      return;
    }

    if (course.trim() === '') {
      setError('Please select a course.');
      return;
    }

    if (price.trim() === '' || isNaN(Number(price))) {
      setError('Please enter a valid price.');
      return;
    }

    const newMenuItem: MenuItem = {
      id: Date.now().toString(),
      name: dishName.trim(),
      description: description.trim(),
      course: course,
      price: price.trim(),
    };

    setMenuItems(currentItems => [...currentItems, newMenuItem]);

    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setError('');

    setSuccessMessage('Menu item saved successfully!');

    setScreen('home');
  };

  const renderMenuItem = ({item}: {item: MenuItem}) => {
    return (
      <View style={styles.menuCard}>
        <View style={styles.menuHeader}>
          <Text style={styles.dishName}>{item.name}</Text>

          <Text style={styles.price}>R{item.price}</Text>
        </View>

        <Text style={styles.course}>{item.course}</Text>

        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {screen === 'home' && (
        <View style={styles.content}>
          <Text style={styles.title}>Restaurant Menu Manager</Text>

          <Text style={styles.subtitle}>
            Manage your restaurant menu easily
          </Text>

          {successMessage !== '' && (
            <View style={styles.successCard}>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          )}

          {menuItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No menu items</Text>

              <Text style={styles.emptyText}>
                No menu items have been added yet.
              </Text>
            </View>
          ) : (
            <FlatList
              data={menuItems}
              keyExtractor={item => item.id}
              renderItem={renderMenuItem}
              showsVerticalScrollIndicator={false}
            />
          )}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={showAddMenu}>
            <Text style={styles.buttonText}>Add Menu Item</Text>
          </TouchableOpacity>
        </View>
      )}

      {screen === 'add' && (
        <View style={styles.content}>
          <Text style={styles.title}>Add Menu Item</Text>

          <Text style={styles.label}>Dish Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter dish name"
            value={dishName}
            onChangeText={setDishName}
          />

          <Text style={styles.label}>Description</Text>

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter dish description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Course</Text>

          <View style={styles.courseContainer}>
            <TouchableOpacity
              style={[
                styles.courseButton,
                course === 'Starter' && styles.selectedCourse,
              ]}
              onPress={() => setCourse('Starter')}>
              <Text
                style={[
                  styles.courseText,
                  course === 'Starter' && styles.selectedCourseText,
                ]}>
                Starter
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.courseButton,
                course === 'Main Course' && styles.selectedCourse,
              ]}
              onPress={() => setCourse('Main Course')}>
              <Text
                style={[
                  styles.courseText,
                  course === 'Main Course' && styles.selectedCourseText,
                ]}>
                Main Course
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.courseButton,
                course === 'Dessert' && styles.selectedCourse,
              ]}
              onPress={() => setCourse('Dessert')}>
              <Text
                style={[
                  styles.courseText,
                  course === 'Dessert' && styles.selectedCourseText,
                ]}>
                Dessert
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Price</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          {error !== '' && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={saveMenuItem}>
            <Text style={styles.buttonText}>Save Menu Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={showHome}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  content: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 20,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    marginBottom: 25,
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
  },

  successCard: {
    backgroundColor: '#E8F5E9',
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
  },

  successText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dishName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
    flex: 1,
  },

  price: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333333',
  },

  course: {
    fontSize: 13,
    color: '#666666',
    marginTop: 5,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    marginTop: 14,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },

  descriptionInput: {
    height: 90,
    textAlignVertical: 'top',
  },

  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  courseButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 6,
    alignItems: 'center',
  },

  selectedCourse: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },

  courseText: {
    fontSize: 13,
    color: '#333333',
  },

  selectedCourseText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  primaryButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  cancelButton: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },

  cancelText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '500',
  },

  errorText: {
    color: '#C62828',
    fontSize: 14,
    marginTop: 12,
  },
});

export default App;
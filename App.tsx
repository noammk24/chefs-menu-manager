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
const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const [error, setError] = useState('');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [successMessage, setSuccessMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('');

  const showHome = () => {
    setScreen('home');
    setError('');
  };

  const showAddMenu = () => {
    setScreen('add');
    setError('');
    setSuccessMessage('');
  };
  const showDetails = (item: MenuItem) => {
  setSelectedItem(item);
  setScreen('details');
  setError('');
  setSuccessMessage('');
};
const showEdit = () => {
  if (selectedItem) {
    setDishName(selectedItem.name);
    setDescription(selectedItem.description);
    setCourse(selectedItem.course);
    setPrice(selectedItem.price);

    setError('');
    setSuccessMessage('');
    setScreen('edit');
  }
};
  const updateMenuItem = () => {
    if (!selectedItem) {
      return;
    }

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

    const updatedItem: MenuItem = {
      id: selectedItem.id,
      name: dishName.trim(),
      description: description.trim(),
      course,
      price: price.trim(),
    };

    setMenuItems(currentItems =>
      currentItems.map(item =>
        item.id === selectedItem.id ? updatedItem : item,
      ),
    );
    setSelectedItem(updatedItem);
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setError('');
    setSuccessMessage('Menu item updated successfully!');
    setScreen('home');
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
  <TouchableOpacity
    style={styles.menuCard}
    onPress={() => showDetails(item)}>
        <View style={styles.menuHeader}>
          <Text style={styles.dishName}>{item.name}</Text>

          <Text style={styles.price}>R{item.price}</Text>
        </View>

        <Text style={styles.course}>{item.course}</Text>

        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  const filteredMenuItems = menuItems.filter(item => {
  const matchesSearch = item.name
    .toLowerCase()
    .includes(searchText.toLowerCase());

  const matchesCourse =
    selectedCourseFilter === '' ||
    item.course === selectedCourseFilter;

  return matchesSearch && matchesCourse;
});
const totalMenuItems = menuItems.length;

const totalPrice = menuItems.reduce(
  (total, item) => total + Number(item.price),
  0,
);

const averagePrice =
  totalMenuItems > 0 ? totalPrice / totalMenuItems : 0;

const starterCount = menuItems.filter(
  item => item.course === 'Starter',
).length;

const mainCourseCount = menuItems.filter(
  item => item.course === 'Main Course',
).length;

const dessertCount = menuItems.filter(
  item => item.course === 'Dessert',
).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {screen === 'home' && (
        <View style={styles.content}>
          <Text style={styles.title}>Restaurant Menu Manager</Text>
          <View style={styles.statisticsCard}>
  <Text style={styles.statisticsTitle}>
    Menu Overview
  </Text>

  <View style={styles.statisticsRow}>
    <View style={styles.statisticBox}>
      <Text style={styles.statisticNumber}>
        {totalMenuItems}
      </Text>

      <Text style={styles.statisticLabel}>
        Total Items
      </Text>
    </View>

    <View style={styles.statisticBox}>
      <Text style={styles.statisticNumber}>
        R {averagePrice.toFixed(2)}
      </Text>

      <Text style={styles.statisticLabel}>
        Average Price
      </Text>
    </View>
  </View>

  <Text style={styles.courseOverviewTitle}>
    Items by Course
  </Text>

  <View style={styles.courseOverviewRow}>
    <View style={styles.courseOverviewItem}>
      <Text style={styles.courseNumber}>
        {starterCount}
      </Text>

      <Text style={styles.courseName}>
        Starters
      </Text>
    </View>

    <View style={styles.courseOverviewItem}>
      <Text style={styles.courseNumber}>
        {mainCourseCount}
      </Text>

      <Text style={styles.courseName}>
        Main Courses
      </Text>
    </View>

    <View style={styles.courseOverviewItem}>
      <Text style={styles.courseNumber}>
        {dessertCount}
      </Text>

      <Text style={styles.courseName}>
        Desserts
      </Text>
    </View>
  </View>
</View>
<Text style={styles.sectionTitle}>Menu Items</Text>

<TextInput
  style={styles.input}
  placeholder="Search menu by name"
  value={searchText}
  onChangeText={setSearchText}
/>

<Text style={styles.filterLabel}>Filter by Course</Text>

<View style={styles.filterContainer}>
  <TouchableOpacity
    style={
      selectedCourseFilter === ''
        ? styles.selectedFilterButton
        : styles.filterButton
    }
    onPress={() => setSelectedCourseFilter('')}>
    <Text
      style={
        selectedCourseFilter === ''
          ? styles.selectedFilterText
          : styles.filterText
      }>
      All
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={
      selectedCourseFilter === 'Starter'
        ? styles.selectedFilterButton
        : styles.filterButton
    }
    onPress={() => setSelectedCourseFilter('Starter')}>
    <Text
      style={
        selectedCourseFilter === 'Starter'
          ? styles.selectedFilterText
          : styles.filterText
      }>
      Starter
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={
      selectedCourseFilter === 'Main Course'
        ? styles.selectedFilterButton
        : styles.filterButton
    }
    onPress={() => setSelectedCourseFilter('Main Course')}>
    <Text
      style={
        selectedCourseFilter === 'Main Course'
          ? styles.selectedFilterText
          : styles.filterText
      }>
      Main Course
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={
      selectedCourseFilter === 'Dessert'
        ? styles.selectedFilterButton
        : styles.filterButton
    }
    onPress={() => setSelectedCourseFilter('Dessert')}>
    <Text
      style={
        selectedCourseFilter === 'Dessert'
          ? styles.selectedFilterText
          : styles.filterText
      }>
      Dessert
    </Text>
  </TouchableOpacity>
</View>

<TouchableOpacity
  style={styles.clearButton}
  onPress={() => {
    setSearchText('');
    setSelectedCourseFilter('');
  }}>
  <Text style={styles.clearText}>
    Clear Search & Filter
  </Text>
</TouchableOpacity>

          {successMessage !== '' && (
            <View style={styles.successCard}>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          )}

          {filteredMenuItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No menu items</Text>

              <Text style={styles.emptyText}>
                No menu items have been added yet.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredMenuItems}
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
            {screen === 'details' && selectedItem && (
        <View style={styles.content}>
          <Text style={styles.title}>Menu Item Details</Text>

          <View style={styles.detailsCard}>
            <Text style={styles.detailsLabel}>Dish Name</Text>
            <Text style={styles.detailsValue}>
              {selectedItem.name}
            </Text>

            <Text style={styles.detailsLabel}>Description</Text>
            <Text style={styles.detailsValue}>
              {selectedItem.description}
            </Text>

            <Text style={styles.detailsLabel}>Course</Text>
            <Text style={styles.detailsValue}>
              {selectedItem.course}
            </Text>

            <Text style={styles.detailsLabel}>Price</Text>
            <Text style={styles.detailsValue}>
              R{selectedItem.price}
            </Text>
          </View>
          
          <TouchableOpacity
          style={styles.primaryButton}
          onPress={showEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
            <TouchableOpacity
          style={styles.cancelButton}
          onPress={showHome}>
          <Text style={styles.cancelText}>Back</Text>
        </TouchableOpacity>
      </View>
      )}

      {screen === 'edit' && selectedItem && (
        <View style={styles.content}>
          <Text style={styles.title}>Edit Menu Item</Text>

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
// update menu item button
        <TouchableOpacity
  style={styles.primaryButton}
  onPress={updateMenuItem}>
  <Text style={styles.buttonText}>Update Menu Item</Text>
</TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setScreen('details')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={showHome}>
            <Text style={styles.cancelText}>Back</Text>
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

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
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

  detailsCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },

  detailsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginTop: 12,
    marginBottom: 5,
  },

  detailsValue: {
    fontSize: 16,
    color: '#222222',
    lineHeight: 22,
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

  courseButtons: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 12,
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
 filterLabel: {
  fontSize: 15,
  fontWeight: '600',
  color: '#333',
  marginTop: 16,
  marginBottom: 10,
},

filterContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

filterButton: {
  borderWidth: 1,
  borderColor: '#CCCCCC',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 10,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
},

selectedFilterButton: {
  width: 78,
  borderWidth: 1,
  borderColor: '#2E7D32',
  borderRadius: 8,
  paddingVertical: 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E8F5E9',
},

filterText: {
  color: '#555',
  fontSize: 13,
},

selectedFilterText: {
  color: '#2E7D32',
  fontSize: 13,
  fontWeight: '600',
},

clearButton: {
  borderWidth: 1,
  borderColor: '#2E7D32',
  borderRadius: 8,
  paddingVertical: 10,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
},

clearText: {
  color: '#2E7D32',
  fontSize: 14,
  fontWeight: '600',
},
statisticsCard: {
  backgroundColor: '#FFFFFF',
  padding: 18,
  borderRadius: 12,
  marginTop: 16,
},

statisticsTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#222',
  marginBottom: 14,
},

statisticsRow: {
  flexDirection: 'row',
  gap: 10,
},

statisticBox: {
  flex: 1,
  backgroundColor: '#F7F7F7',
  padding: 14,
  borderRadius: 8,
  alignItems: 'center',
},

statisticNumber: {
  fontSize: 20,
  fontWeight: '700',
  color: '#2E7D32',
  marginBottom: 4,
},

statisticLabel: {
  fontSize: 12,
  color: '#666',
  textAlign: 'center',
},

courseOverviewTitle: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
  marginTop: 18,
  marginBottom: 10,
},

courseOverviewRow: {
  flexDirection: 'row',
  gap: 8,
},

courseOverviewItem: {
  flex: 1,
  backgroundColor: '#F7F7F7',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
},

courseNumber: {
  fontSize: 18,
  fontWeight: '700',
  color: '#2E7D32',
  marginBottom: 3,
},

courseName: {
  fontSize: 11,
  color: '#666',
  textAlign: 'center',
},
});

export default App;
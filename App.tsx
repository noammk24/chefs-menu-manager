import React, {useState} from 'react';
import {
  SafeAreaView,
  Alert,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import MenuCard from './components/MenuCard';
import StatisticCard from './components/StatisticCard';
import CourseStatistics from './components/CourseStatistics';
import AppButton from './components/AppButton';
import {launchImageLibrary} from 'react-native-image-picker';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
  image?: string;
};

function App() {
  const [screen, setScreen] = useState('home');
const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
  undefined,
);

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
    setSelectedImage(undefined);
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
    setSelectedImage(selectedItem.image);

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
      image: selectedImage,
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
    setSelectedImage(undefined);
    setError('');
    setSuccessMessage('Menu item updated successfully!');
    setScreen('home');
  };
const selectDishImage = async () => {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      Alert.alert(
        'Unable to select photo',
        result.errorMessage || 'Please try again.',
      );
      return;
    }

    const imageUri = result.assets?.[0]?.uri;
    if (!imageUri) {
      Alert.alert(
        'Unable to select photo',
        'No photo was returned. Please choose another photo.',
      );
      return;
    }

    setSelectedImage(imageUri);
  } catch (pickerError) {
    Alert.alert(
      'Unable to select photo',
      pickerError instanceof Error
        ? pickerError.message
        : 'Please try again.',
    );
  }
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
  image: selectedImage,
};

    setMenuItems(currentItems => [...currentItems, newMenuItem]);

    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setSelectedImage(undefined);
    setError('');

    setSuccessMessage('Menu item saved successfully!');

    setScreen('home');
  };

 const renderMenuItem = ({item}: {item: MenuItem}) => {
  return (
    <MenuCard
      item={item}
      onPress={() => showDetails(item)}
    />
  );
};

const renderImagePicker = () => (
  <View style={styles.imagePickerContainer}>
    <AppButton
      title={selectedImage ? 'Change Picture' : 'Upload Picture'}
      onPress={selectDishImage}
    />
    {selectedImage && (
      <>
        <Image
          source={{uri: selectedImage}}
          style={styles.dishImage}
          resizeMode="cover"
        />
        <AppButton
          title="Remove Picture"
          type="cancel"
          onPress={() => setSelectedImage(undefined)}
        />
      </>
    )}
  </View>
);

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
    <StatisticCard
  title="Total Items"
  value={totalMenuItems}
/>
    <StatisticCard
  title="Average Price"
  value={`R ${averagePrice.toFixed(2)}`}
/>
    </View>
  </View>

 <CourseStatistics
  starterCount={starterCount}
  mainCourseCount={mainCourseCount}
  dessertCount={dessertCount}
/>
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

          <AppButton
  title="Add Menu Item"
  onPress={showAddMenu}
/>
        </View>
      )}

      {screen === 'add' && (
        <ScrollView contentContainerStyle={styles.formContent}>
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
          {renderImagePicker()}
       <AppButton
  title="Save Menu Item"
  onPress={saveMenuItem}
/>

         <AppButton
  title="Cancel"
  type="cancel"
  onPress={showHome}
/>
        </ScrollView>
      )}
            {screen === 'details' && selectedItem && (
        <ScrollView contentContainerStyle={styles.formContent}>
          <Text style={styles.title}>Menu Item Details</Text>

          <View style={styles.detailsCard}>
            {selectedItem.image && (
              <Image
                source={{uri: selectedItem.image}}
                style={styles.dishImage}
                resizeMode="cover"
              />
            )}
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
          
         <AppButton
  title="Edit Menu Item"
  onPress={showEdit}
/>
            <AppButton
  title="Back"
  type="cancel"
  onPress={showHome}
/>
      </ScrollView>
      )}

      {screen === 'edit' && selectedItem && (
        <ScrollView contentContainerStyle={styles.formContent}>
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
        {renderImagePicker()}
  <AppButton
  title="Update Menu Item"
  onPress={updateMenuItem}
/>

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
        </ScrollView>
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

  formContent: {
    flexGrow: 1,
    padding: 24,
  },

  imagePickerContainer: {
    marginTop: 8,
  },

  dishImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
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

});

export default App;
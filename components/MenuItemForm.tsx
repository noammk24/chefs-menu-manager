import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppButton from './AppButton';
import MenuItemImage from './MenuItemImage';

type MenuItemFormProps = {
  mode: 'add' | 'edit';
  dishName: string;
  onDishNameChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  course: string;
  onCourseChange: (value: string) => void;
  price: string;
  onPriceChange: (value: string) => void;
  error: string;
  imageUri?: string;
  onSelectImage: () => void;
  onRemoveImage: () => void;
  onSave: () => void;
  onCancel: () => void;
  onBack?: () => void;
};

const courseOptions = ['Starter', 'Main Course', 'Dessert'];

const MenuItemForm = ({
  mode,
  dishName,
  onDishNameChange,
  description,
  onDescriptionChange,
  course,
  onCourseChange,
  price,
  onPriceChange,
  error,
  imageUri,
  onSelectImage,
  onRemoveImage,
  onSave,
  onCancel,
  onBack,
}: MenuItemFormProps) => {
  const isEditing = mode === 'edit';

  return (
    <ScrollView contentContainerStyle={styles.formContent}>
      <Text style={styles.title}>
        {isEditing ? 'Edit Menu Item' : 'Add Menu Item'}
      </Text>

      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dish name"
        value={dishName}
        onChangeText={onDishNameChange}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter dish description"
        value={description}
        onChangeText={onDescriptionChange}
        multiline
      />

      <Text style={styles.label}>Course</Text>
      <View style={styles.courseContainer}>
        {courseOptions.map(option => {
          const isSelected = course === option;

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.courseButton,
                isSelected && styles.selectedCourse,
              ]}
              onPress={() => onCourseChange(option)}>
              <Text
                style={[
                  styles.courseText,
                  isSelected && styles.selectedCourseText,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        keyboardType="numeric"
        value={price}
        onChangeText={onPriceChange}
      />

      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.imagePickerContainer}>
        <AppButton
          title={imageUri ? 'Change Picture' : 'Upload Picture'}
          onPress={onSelectImage}
        />
        <MenuItemImage
          imageUri={imageUri}
          height={200}
          marginTop={10}
        />
        {imageUri && (
          <AppButton
            title="Remove Picture"
            type="cancel"
            onPress={onRemoveImage}
          />
        )}
      </View>

      <AppButton
        title={isEditing ? 'Update Menu Item' : 'Save Menu Item'}
        onPress={onSave}
      />
      <AppButton title="Cancel" type="cancel" onPress={onCancel} />
      {isEditing && onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContent: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 8,
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
  errorText: {
    color: '#C62828',
    fontSize: 14,
    marginTop: 12,
  },
  imagePickerContainer: {
    marginTop: 8,
  },
  backButton: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  backText: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default MenuItemForm;

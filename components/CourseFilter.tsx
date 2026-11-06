import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type CourseFilterProps = {
  selectedCourse: string;
  onSelectCourse: (course: string) => void;
};

const courses = [
  {label: 'All', value: ''},
  {label: 'Starters', value: 'Starter'},
  {label: 'Main Courses', value: 'Main Course'},
  {label: 'Desserts', value: 'Dessert'},
];

const CourseFilter = ({
  selectedCourse,
  onSelectCourse,
}: CourseFilterProps) => (
  <>
    <Text style={styles.filterLabel}>Filter by Course</Text>
    <View style={styles.filterContainer}>
      {courses.map(course => {
        const isSelected = selectedCourse === course.value;

        return (
          <TouchableOpacity
            key={course.value || 'all'}
            style={
              isSelected
                ? styles.selectedFilterButton
                : styles.filterButton
            }
            onPress={() => onSelectCourse(course.value)}>
            <Text
              style={
                isSelected ? styles.selectedFilterText : styles.filterText
              }>
              {course.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </>
);

const styles = StyleSheet.create({
  filterLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 4,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedFilterButton: {
    minWidth: 78,
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
  },
  filterText: {
    color: '#555555',
    fontSize: 13,
  },
  selectedFilterText: {
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default CourseFilter;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type EmptyStateProps = {
  hasMenuItems: boolean;
  searchText: string;
  selectedCourse: string;
};

const EmptyState = ({
  hasMenuItems,
  searchText,
  selectedCourse,
}: EmptyStateProps) => {
  const title = hasMenuItems ? 'No matching menu items' : 'No menu items';
  let message = 'No menu items have been added yet.';

  if (hasMenuItems && searchText !== '') {
    message = 'Try a different search or course filter.';
  } else if (hasMenuItems && selectedCourse !== '') {
    message = 'No menu items found for this course.';
  }

  return (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default EmptyState;

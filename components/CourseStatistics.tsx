import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type CourseStatisticsProps = {
  starterCount: number;
  mainCourseCount: number;
  dessertCount: number;
};

const CourseStatistics = ({
  starterCount,
  mainCourseCount,
  dessertCount,
}: CourseStatisticsProps) => {
  return (
    <View>
      <Text style={styles.courseOverviewTitle}>
        Items by Course
      </Text>

      <View style={styles.courseOverviewRow}>
        <View style={styles.courseOverviewItem}>
          <Text style={styles.courseNumber}>
            {starterCount}
          </Text>
          <Text style={styles.courseName}>Starters</Text>
        </View>

        <View style={styles.courseOverviewItem}>
          <Text style={styles.courseNumber}>
            {mainCourseCount}
          </Text>
          <Text style={styles.courseName}>Main Courses</Text>
        </View>

        <View style={styles.courseOverviewItem}>
          <Text style={styles.courseNumber}>
            {dessertCount}
          </Text>
          <Text style={styles.courseName}>Desserts</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CourseStatistics;

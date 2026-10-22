import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type StatisticCardProps = {
title: string;
value: string | number;
};

const StatisticCard = ({title, value}: StatisticCardProps) => {
return ( <View style={styles.statisticBox}> <Text style={styles.statisticNumber}>
{value} </Text>

  <Text style={styles.statisticLabel}>
    {title}
  </Text>
</View>

);
};

const styles = StyleSheet.create({
statisticBox: {
backgroundColor: '#FFFFFF',
padding: 12,
borderRadius: 10,
alignItems: 'center',
justifyContent: 'center',
flex: 1,
margin: 4,
},
statisticNumber: {
fontSize: 20,
fontWeight: '700',
color: '#1F5C54',
},
statisticLabel: {
fontSize: 12,
color: '#555555',
textAlign: 'center',
marginTop: 5,
},
});

export default StatisticCard;

import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
  image?: string;
};

type MenuCardProps = {
  item: MenuItem;
  onPress: () => void;
};

const MenuCard = ({item, onPress}: MenuCardProps) => {
  return (
    <TouchableOpacity
      style={styles.menuCard}
      onPress={onPress}>

      {item.image && (
        <Image
          source={{uri: item.image}}
          style={styles.dishImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.menuHeader}>
        <Text style={styles.dishName}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          R{item.price}
        </Text>
      </View>

      <Text style={styles.course}>
        {item.course}
      </Text>

      <Text style={styles.description}>
        {item.description}
      </Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  dishImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
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
});

export default MenuCard;
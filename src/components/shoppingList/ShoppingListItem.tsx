import React, { ReactElement } from 'react';
import { ActionSheetIOS, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { store } from '../../store';
import { updateProduct } from '../../store/products';

const moveItem = (item: ProductType, list: ProductLocationType): void => {
  store.dispatch(updateProduct({ id: item.name, changes: { list } }));
};

const showItemActionSheet = (item: ProductType): void => {
  const opts = ['Cancel', 'Now', 'Later', 'Checked'];

  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: opts,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 1: {
          moveItem(item, 'now');
          break;
        }
        case 2: {
          moveItem(item, 'later');
          break;
        }
        case 3: {
          moveItem(item, 'checked');
          break;
        }
      }
    }
  );
};

type Props = {
  item: ProductType;
};

const ShoppingListItem = ({ item }: Props): ReactElement => {
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${item.quantity * 5}, ${132})`,
        },
      ]}
      key={item.name}
      onPress={(): void => moveItem(item, 'checked')}
      onLongPress={(): void => showItemActionSheet(item)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default ShoppingListItem;

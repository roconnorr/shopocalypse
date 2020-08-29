import React, { ReactElement } from 'react';
import { ActionSheetIOS, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { updateProduct, removeProduct } from '../../store/products';

const moveItem = (item: ProductType, list: ProductLocationType, dispatch: AppDispatch): void => {
  dispatch(updateProduct({ id: item.name, changes: { list } }));
};

const showItemActionSheet = (item: ProductType, dispatch: AppDispatch): void => {
  const opts = ['Cancel', 'Now', 'Later', 'Checked', 'Delete'];

  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: opts,
      cancelButtonIndex: 0,
      destructiveButtonIndex: 4,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 1: {
          moveItem(item, 'now', dispatch);
          break;
        }
        case 2: {
          moveItem(item, 'later', dispatch);
          break;
        }
        case 3: {
          moveItem(item, 'checked', dispatch);
          break;
        }
        case 4: {
          dispatch(removeProduct(item.name));
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
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor: item.colour,
        },
      ]}
      onPress={(): void =>
        item.list === 'checked'
          ? moveItem(item, 'now', dispatch)
          : moveItem(item, 'checked', dispatch)
      }
      onLongPress={(): void => showItemActionSheet(item, dispatch)}>
      <Text style={styles.itemText} numberOfLines={2}>
        {item.name}
      </Text>
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
    margin: 5,
  },
});

export default ShoppingListItem;

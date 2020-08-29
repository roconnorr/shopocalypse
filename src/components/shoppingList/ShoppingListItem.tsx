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

const randInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateColour = (item: ProductType): string => {
  const saturation = randInterval(70, 100);
  const lightness = randInterval(45, 50);

  if (item.list === 'now') {
    return `hsl(${randInterval(0, 10)}, ${saturation}%, ${lightness}%)`;
  } else if (item.list === 'later') {
    return `hsl(${randInterval(20, 30)}, ${saturation}%, ${lightness}%)`;
  } else {
    return `hsl(${randInterval(140, 150)}, ${saturation}%, ${lightness}%)`;
  }
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
          backgroundColor: generateColour(item),
        },
      ]}
      onPress={(): void =>
        item.list === 'checked'
          ? moveItem(item, 'now', dispatch)
          : moveItem(item, 'checked', dispatch)
      }
      onLongPress={(): void => showItemActionSheet(item, dispatch)}>
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

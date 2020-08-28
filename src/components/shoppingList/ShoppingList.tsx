import React, { ReactElement, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { INITIAL_STATE } from '../../store/state';
import { selectAll, addProduct } from '../../store/products';

import ShoppingListItem from './ShoppingListItem';

const renderItem = (item: ProductType): ReactElement => <ShoppingListItem item={item} />;

const keyExtractor = (item: ProductType): string => item.name;

const ShoppingList = (): ReactElement => {
  const products = useSelector(selectAll);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    INITIAL_STATE.forEach((p) => dispatch(addProduct(p)));
  }, []);

  return (
    <Layout style={styles.listContainer}>
      <Text style={styles.listHeaderText}>Now</Text>
      <FlatList
        data={products.filter((item) => item.list === 'now')}
        renderItem={({ item }): ReactElement => renderItem(item)}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        numColumns={4}
      />

      <Text style={styles.listHeaderText}>Later</Text>
      <FlatList
        data={products.filter((item) => item.list === 'later')}
        renderItem={({ item }): ReactElement => renderItem(item)}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        numColumns={4}
      />

      <Text style={styles.listHeaderText}>Checked Off</Text>
      <FlatList
        data={products.filter((item) => item.list === 'checked')}
        renderItem={({ item }): ReactElement => renderItem(item)}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        numColumns={4}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  listHeaderText: {
    margin: 5,
  },
});

export default ShoppingList;

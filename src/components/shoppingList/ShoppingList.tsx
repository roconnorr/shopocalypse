import React, { ReactElement, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from '../../store';
import { INITIAL_STATE } from '../../store/state';
import { selectAll, addProduct } from '../../store/products';

import ShoppingListItem from './ShoppingListItem';

const renderItem = ({ item }: { item: ProductType }): ReactElement => (
  <ShoppingListItem item={item} />
);

const keyExtractor = (item: ProductType): string => item.name;

const ListSection = ({
  productData,
  listName,
}: {
  productData: ProductType[];
  listName: ProductLocationType;
}): ReactElement => {
  return (
    <>
      <Text style={styles.listHeaderText}>{listName}</Text>
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        numColumns={4}
      />
    </>
  );
};

const ShoppingList = (): ReactElement => {
  const products = useSelector(selectAll);
  // for dev: seeds products
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   INITIAL_STATE.forEach((p) => dispatch(addProduct(p)));
  // }, []);

  return (
    <Layout style={styles.listContainer}>
      <FlatList
        data={['now', 'later', 'checked']}
        keyExtractor={(item): string => item}
        renderItem={({ item }: { item: ProductLocationType }): ReactElement => {
          return (
            <ListSection productData={products.filter((p) => p.list === item)} listName={item} />
          );
        }}
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

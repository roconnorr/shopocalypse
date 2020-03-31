import React, { ReactElement } from 'react';
import { FlatList } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import { useSelector } from 'react-redux';

import { selectAll } from '../../store/products';

import ShoppingListItem from './ShoppingListItem';

const renderItem = (item: ProductType): ReactElement => <ShoppingListItem item={item} />;

const keyExtractor = (item: ProductType): string => item.name;

const ShoppingList = (): ReactElement => {
  const products = useSelector(selectAll);

  return (
    <Layout
      style={{
        flex: 1,
        paddingTop: 20,
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <Text style={{ margin: 5 }}>Now</Text>
      <FlatList
        data={products.filter((item) => item.list === 'now')}
        renderItem={({ item }): ReactElement => renderItem(item)}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        numColumns={4}
      />

      <Text style={{ margin: 5 }}>Later</Text>
      <FlatList
        data={products.filter((item) => item.list === 'later')}
        renderItem={({ item }): ReactElement => renderItem(item)}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        numColumns={4}
      />

      <Text style={{ margin: 5 }}>Checked Off</Text>
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

export default ShoppingList;

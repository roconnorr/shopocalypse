import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark as theme } from '@eva-design/eva';
import { Provider } from 'react-redux';
import { store } from './src/store';

import AddProductModal from './src/components/addProductModal/AddProductModal';
import ShoppingList from './src/components/shoppingList/ShoppingList';

const App = (): ReactElement => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <Provider store={store}>
          <Layout style={styles.appContainer}>
            <ShoppingList />
            <AddProductModal />
          </Layout>
        </Provider>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: { flex: 1 },
});

export default App;

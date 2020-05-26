import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark as theme } from '@eva-design/eva';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';

import AddProductModal from './src/components/addProductModal/AddProductModal';
import ShoppingList from './src/components/shoppingList/ShoppingList';

const App = (): ReactElement => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout style={styles.appContainer}>
              <Text category={'h3'} style={{ alignSelf: 'center', marginTop: 20 }}>
                Sh☣️p☣️calypse
              </Text>
              <ShoppingList />
              <AddProductModal />
            </Layout>
          </PersistGate>
        </Provider>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: { flex: 1 },
});

export default App;

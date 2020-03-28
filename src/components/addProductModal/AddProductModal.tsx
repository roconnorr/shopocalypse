import React, { ReactElement, useState } from 'react';
import { ImageStyle, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Icon, Text, Layout, Input } from '@ui-kitten/components';

import { store, add } from '../../store';

const AddProductModal = (): ReactElement => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  return (
    <Layout>
      <Modal isVisible={isModalVisible} onBackdropPress={(): void => setModalVisible(false)}>
        <Layout style={{ flex: 0.5 }}>
          <Text category="h2" style={{ margin: 5 }}>
            Add Product
          </Text>
          <Input
            placeholder="Item Name"
            style={{ margin: 5 }}
            value={newProductName}
            onChangeText={(val): void => setNewProductName(val)}
          />
        </Layout>
        <Button
          onPress={(): void => {
            store.dispatch(add('memes'));
            setModalVisible(false);
          }}
          icon={(style: ImageStyle): ReactElement => (
            <Icon {...style} width={32} height={32} name="checkmark-square-2-outline" />
          )}
        />
      </Modal>
      <Button
        onPress={(): void => setModalVisible(true)}
        style={styles.addButtonStyle}
        icon={(style: ImageStyle): ReactElement => (
          <Icon {...style} width={32} height={32} name="plus-square-outline" />
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  addButtonStyle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default AddProductModal;

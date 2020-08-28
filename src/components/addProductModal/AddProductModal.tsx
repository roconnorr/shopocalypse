import React, { ReactElement, useState } from 'react';
import { ImageStyle, ScrollView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { Button, Icon, Text, Layout, Input } from '@ui-kitten/components';

import { AppDispatch } from '../../store';
import { addProduct } from '../../store/products';

const AddProductModal = (): ReactElement => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Layout>
        <Modal isVisible={isModalVisible} onBackdropPress={(): void => setModalVisible(false)}>
          <Layout style={styles.modalContainer}>
            <ScrollView
              contentContainerStyle={styles.modalScrollView}
              keyboardShouldPersistTaps="handled">
              <Text category="h2" style={styles.modalHeader}>
                Add Product
              </Text>
              <Input
                placeholder="Item Name"
                style={styles.productNameInput}
                value={newProductName}
                onChangeText={(val): void => setNewProductName(val)}
              />
            </ScrollView>
          </Layout>
          <Button
            style={styles.addProductButton}
            onPress={(): void => {
              dispatch(
                addProduct({
                  list: 'now',
                  name: newProductName,
                  quantity: 1,
                })
              );
              setNewProductName('');
              setModalVisible(false);
            }}
            icon={(style: ImageStyle): ReactElement => (
              <Icon {...style} width={32} height={32} name="checkmark-square-2-outline" />
            )}
          />
        </Modal>
      </Layout>
      <Button
        onPress={(): void => setModalVisible(true)}
        style={styles.addButtonStyle}
        icon={(style: ImageStyle): ReactElement => (
          <Icon {...style} width={32} height={32} name="plus-square-outline" />
        )}
      />
    </>
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
  modalContainer: {
    flex: 0.5,
    alignItems: 'stretch',
    flexDirection: 'column',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalScrollView: {
    flexGrow: 1,
  },
  modalHeader: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
  productNameInput: {
    marginLeft: 5,
    marginRight: 5,
  },
  addProductButton: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export default AddProductModal;

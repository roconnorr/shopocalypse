import React, { ReactElement } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ActionSheetIOS, ImageStyle } from 'react-native';
import Modal from 'react-native-modal';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Text,
  Layout,
  Input,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark as theme } from '@eva-design/eva';

const SEED_DATA = {
  now: ['Pizza', 'Burger', 'Risotto', 'Cheese Cake', 'Ice Cream'],
  later: ['French Fries', 'Onion Rings', 'Fried Shrimps', 'Water', 'Coke', 'Beer'],
  checkedOff: ['Cheese', 'Milk'],
};

type ItemLocationType = 'now' | 'later' | 'checked';

type ListItemType = {
  key: string;
  name: string;
  list: ItemLocationType;
  backgroundColor: string;
  disabledDrag?: boolean;
  disabledReSorted?: boolean;
};

const nowData: ListItemType[] = SEED_DATA.now.map((item, index) => ({
  name: item,
  key: item,
  list: 'now',
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
}));

const laterData: ListItemType[] = SEED_DATA.later.map((item, index) => ({
  name: item,
  key: item,
  list: 'later',
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
}));

const checkedOffData: ListItemType[] = SEED_DATA.checkedOff.map((item, index) => ({
  name: item,
  key: item,
  list: 'checked',
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
}));

interface State {
  listItems: ListItemType[];
  modalVisible: boolean;
  newProductName: string;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      listItems: [...nowData, ...laterData, ...checkedOffData],
      modalVisible: false,
      newProductName: '',
    };
  }

  addItem = (name: string): void => {
    this.setState({
      listItems: [
        {
          key: name,
          name,
          list: 'now',
          backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${5 * 5}, ${132})`,
        },
        ...this.state.listItems,
      ],
    });
  };

  moveItem = (item: ListItemType, destination: ItemLocationType): void => {
    const listItems = this.state.listItems;
    const itemIndex = this.state.listItems.findIndex((i) => i.name === item.name);
    listItems.splice(itemIndex, 1);

    this.setState({
      listItems: [...listItems, { ...item, list: destination }],
    });
  };

  onPressItem = (item: ListItemType): void => {
    const opts = ['Cancel', 'Now', 'Later', 'Checked'];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: opts,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 1: {
            this.moveItem(item, 'now');
            break;
          }
          case 2: {
            this.moveItem(item, 'later');
            break;
          }
          case 3: {
            this.moveItem(item, 'checked');
            break;
          }
        }
      }
    );
  };

  renderItem(item: ListItemType): ReactElement {
    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: item.backgroundColor }]}
        key={item.key}
        onPress={(): void => this.moveItem(item, 'checked')}
        onLongPress={(): void => this.onPressItem(item)}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  render(): ReactElement {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme}>
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
              data={this.state.listItems.filter((item) => item.list === 'now')}
              renderItem={({ item }): ReactElement => this.renderItem(item)}
              scrollEnabled={false}
              numColumns={4}
            />

            <Text style={{ margin: 5 }}>Later</Text>
            <FlatList
              data={this.state.listItems.filter((item) => item.list === 'later')}
              renderItem={({ item }): ReactElement => this.renderItem(item)}
              scrollEnabled={false}
              numColumns={4}
            />

            <Text style={{ margin: 5 }}>Checked Off</Text>
            <FlatList
              data={this.state.listItems.filter((item) => item.list === 'checked')}
              renderItem={({ item }): ReactElement => this.renderItem(item)}
              scrollEnabled={false}
              numColumns={4}
            />
          </Layout>
          <Layout>
            <Modal
              isVisible={this.state.modalVisible}
              onBackdropPress={(): void => this.setState({ modalVisible: false })}>
              <Layout style={{ flex: 0.5 }}>
                <Text category="h2" style={{ margin: 5 }}>
                  Add Item
                </Text>
                <Input
                  placeholder="Item Name"
                  style={{ margin: 5 }}
                  value={this.state.newProductName}
                  onChangeText={(val): void => this.setState({ newProductName: val })}
                />
              </Layout>
              <Button
                onPress={(): void => {
                  this.addItem(this.state.newProductName);
                  this.setState({ newProductName: '', modalVisible: false });
                }}
                icon={(style: ImageStyle): ReactElement => (
                  <Icon {...style} width={32} height={32} name="checkmark-square-2-outline" />
                )}
              />
            </Modal>
          </Layout>
          <Button
            onPress={(): void => this.setState({ modalVisible: !this.state.modalVisible })}
            style={styles.addButtonStyle}
            icon={(style: ImageStyle): ReactElement => (
              <Icon {...style} width={32} height={32} name="plus-square-outline" />
            )}
          />
        </ApplicationProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
    margin: 0,
  },
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
  addButtonStyle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default App;

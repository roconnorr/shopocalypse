import React, { Component, ReactElement } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const SEED_DATA = [
  {
    title: 'Now',
    data: ['Pizza', 'Burger', 'Risotto', 'Cheese Cake', 'Ice Cream'],
  },
  {
    title: 'Later',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps', 'Water', 'Coke', 'Beer'],
  },
];

const exampleData = [...Array(20)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
}));

class App extends Component {
  state = {
    data: exampleData,
  };

  renderItem = ({ item, index, drag, isActive }): ReactElement => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onLongPress={drag}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 32,
          }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  render(): ReactElement {
    return (
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          onDragEnd={({ data }) => this.setState({ data })}
        />
      </View>
    );
  }
}

export default App;

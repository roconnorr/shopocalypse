import React, { ReactElement } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

const SEED_DATA = {
  now: ['Pizza', 'Burger', 'Risotto', 'Cheese Cake', 'Ice Cream'],
  later: ['French Fries', 'Onion Rings', 'Fried Shrimps', 'Water', 'Coke', 'Beer'],
};

type ListData = {
  key: string;
  name: string;
  list: 'now' | 'later';
  backgroundColor: string;
  disabledDrag?: boolean;
  disabledReSorted?: boolean;
};

const nowData: ListData[] = SEED_DATA.now.map((item, index) => ({
  name: item,
  key: item,
  list: 'now',
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
}));

const laterData: ListData[] = SEED_DATA.later.map((item, index) => ({
  name: item,
  key: item,
  list: 'later',
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
}));

interface State {
  nowData: ListData[];
  laterData: ListData[];
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      nowData,
      laterData,
    };
  }

  onPressItem = (item: ListData): void => {
    if (item.list === 'now') {
      const now = this.state.nowData;

      const nowIndex = now.findIndex((i) => i.name === item.name);
      now.splice(nowIndex, 1);

      this.setState({
        nowData: now,
        laterData: [...this.state.laterData, { ...item, list: 'later' }],
      });
    } else if (item.list === 'later') {
      const later = this.state.laterData;

      const laterIndex = later.findIndex((i) => i.name === item.name);
      later.splice(laterIndex, 1);

      this.setState({
        nowData: [...this.state.nowData, { ...item, list: 'now' }],
        laterData: later,
      });
    }
  };

  renderItem(item: ListData): ReactElement {
    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: item.backgroundColor }]}
        key={item.key}
        onPress={(): void => this.onPressItem(item)}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  render(): ReactElement {
    return (
      <View style={{ flex: 1, paddingTop: 50 }}>
        <Text>Now</Text>
        <FlatList
          data={this.state.nowData}
          renderItem={({ item }): ReactElement => this.renderItem(item)}
          scrollEnabled={false}
          numColumns={4}
          style={{ width: '100%' }}
        />

        <Text>Later</Text>
        <FlatList
          data={this.state.laterData}
          renderItem={({ item }): ReactElement => this.renderItem(item)}
          scrollEnabled={false}
          numColumns={4}
          style={{ width: '100%' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  button: {
    width: 150,
    height: 100,
    backgroundColor: 'blue',
  },
  item: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default App;

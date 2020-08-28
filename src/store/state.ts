const SEED_DATA = {
  now: ['Pizza', 'Burger', 'Risotto', 'Cheese Cake', 'Ice Cream'],
  later: ['French Fries', 'Onion Rings', 'Fried Shrimps', 'Water', 'Coke', 'Beer'],
  checkedOff: ['Cheese', 'Milk'],
};

const nowData: ProductType[] = SEED_DATA.now.map((item, index) => ({
  // id: `testnow-${index}`,
  name: item,
  list: 'now',
  quantity: 1,
  // backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
}));

const laterData: ProductType[] = SEED_DATA.later.map((item, index) => ({
  // id: `testlater-${index}`,
  name: item,
  list: 'later',
  quantity: 2,
  // backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
}));

const checkedOffData: ProductType[] = SEED_DATA.checkedOff.map((item, index) => ({
  // id: `testchecked-${index}`,
  name: item,
  list: 'checked',
  quantity: 1,
  // backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
}));

const INITIAL_STATE: ProductType[] = [...nowData, ...laterData, ...checkedOffData];

export { INITIAL_STATE };

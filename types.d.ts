type ProductLocationType = 'now' | 'later' | 'checked';

type ProductType = {
  name: string;
  list: ProductLocationType;
  quantity: number;
};

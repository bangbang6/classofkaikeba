import { getProductData } from '../services/product';

export default {
  namespace: 'more',

  state: {
    data: [],
    pageSize: 10,
    current: 1,
    total: 0,
  },

  effects: {
    *getProductData({ payload }, { call, put }) {
      console.log('payload', payload);
      const res = yield call(getProductData, payload);
      yield put({ type: 'productData', payload: res });
    },
  },

  reducers: {
    productData(state, action) {
      console.log('action payload', action.payload);
      return { ...state, ...action.payload };
    },
  },
};

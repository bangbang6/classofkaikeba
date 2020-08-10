export default {
  namespace: "example",

  state: {
    data: [],
    pageSize: 10,
    current: 1,
    total: 0,
  },
  //注册Model时候会先执行subscriptions
  subscriptions: {
    setup({ dispatch, history }) {
      console.log("example sub");
    },
  },
  //直接执行effects就行 这里就会链接store 页面的dispatch的type就是getProductData 这个effects再去调用put去reducers链接
  //!异步修改state 相当于vue的action
  effects: {
    /* *getProductData({ payload }, { call, put }) {
      let res = yield call(getProductData, payload);
      yield put({ type: "ProductData", payload: res.data });
    }, */
  },
  //同步的只能传obj 相当于vue的dispatch
  reducers: {
    ProductData(state, action) {
      return { ...state, data: action.payload.data };
    },
  },
};

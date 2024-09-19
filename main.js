//action types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

//action creators
function increment() {
  return { type: INCREMENT };
}
function decrement() {
  return { type: DECREMENT };
}

let initialState = {
  count: 0,
  isSideBarMenuOpen: true,
  employees: [],
};

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

function enableDevTools() {
  return (
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
//store
var store = Redux.createStore(reducer, enableDevTools());

function createStore(reducer) {
  let store = new Store(reducer);
  return store;
}

function logState() {
  console.log(store.getState());
}

store.subscribe(logState);

store.dispatch({ type: "noaction" });
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());
store.dispatch(decrement());
store.dispatch(decrement());

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

class Store {
  _state = {};
  reducer;
  listeners = [];

  constructor(reducer, initialState) {
    this.reducer = reducer;
    this._state = initialState;
  }

  getState() {
    return this._state;
  }

  dispatch(action) {
    this._state = this.reducer(this._state, action);
    // Notify subscribers
    this.listeners.forEach((callbackFn) => callbackFn());
  }

  subscribe(callbackFn) {
    this.listeners.push(callbackFn);
  }
}

function createStore(reducer, initialState) {
  let store = new Store(reducer, initialState);
  return store;
}

// store
var store = createStore(reducer);

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

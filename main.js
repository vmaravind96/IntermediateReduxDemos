//action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

//action creators
function increment() {
  return { type: INCREMENT };
}
function decrement() {
  return { type: DECREMENT };
}

//reducer
function reducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

//store
// Pass in the brain logic to the store (reducer)
// var store = Redux.createStore(reducer);
var store = Redux.createStore(reducer, enableDevTools());

function enableDevTools() {
  // Enable Redux DevTools extension to do logging
  return (
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

function logState() {
  console.log(store.getState().toString());
}

// Subscribe to the changes in the state
store.subscribe(logState);

// Dispatch only takes in action.
// State will be passed by default by store internally
store.dispatch({ type: '' });
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());
store.dispatch(decrement());
store.dispatch(decrement());
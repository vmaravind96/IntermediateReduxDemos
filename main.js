//action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function increment() {
  //action creator
  return { type: INCREMENT }; //action
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

var store = Redux.createStore(reducer, enableDevTools());

function enableDevTools() {
  return (
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const { Provider, useSelector, useDispatch } = ReactRedux;

function Result() {
  const count = useSelector((state) => state);
  return (
    <React.Fragment>
      <div>Count: {count}</div>
    </React.Fragment>
  );
}

function Actions() {
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </>
  );
}

function CounterPage() {
  return (
    <>
      <Actions />
      <Result />
    </>
  );
}

function App() {
  return <CounterPage />;
}

const element = (
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(element);
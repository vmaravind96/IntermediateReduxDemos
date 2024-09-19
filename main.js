const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function increment() {
  return { type: INCREMENT };
}
function decrement() {
  return { type: DECREMENT };
}

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

var store = Redux.createStore(reducer);


function Counter(props) {
  return (
    <React.Fragment>
      <div>Count: {props.count}</div>
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state,
  };
};

const mapDispatchToProps = { increment, decrement };

const WrappedCounter = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

const element = (
  <div>
    <ReactRedux.Provider store={store}>
      <WrappedCounter />
    </ReactRedux.Provider>
  </div>
);

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(element);
const baseUrl = "http://localhost:3000";

function enableDevTools() {
  return (
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

class PhotoAPI {
  url = `${baseUrl}/photos`;

  constructor() {}

  getAll(page = 1, limit = 100) {
    return fetch(`${this.url}?_page=${page}&_limit=${limit}`)
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  static translateStatusToErrorMessage(status) {
    switch (status) {
      case 401:
        return "Please login again.";
      case 403:
        return "You do not have permission to view the photos.";
      default:
        return "There was an error retrieving the photos. Please try again.";
    }
  }

  checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      };
      console.log(
        `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
      );

      let errorMessage = PhotoAPI.translateStatusToErrorMessage(
        httpErrorInfo.status
      );
      throw new Error(errorMessage);
    }
  }

  parseJSON(response) {
    return response.json();
  }
}

const LOAD_PHOTOS_REQUEST = "LOAD_PHOTOS_REQUEST";
const LOAD_PHOTOS_SUCCESS = "LOAD_PHOTOS_SUCCESS";
const LOAD_PHOTOS_FAILURE = "LOAD_PHOTOS_FAILURE";

const initialState = {
  photos: [],
  processing: false,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PHOTOS_REQUEST:
      return { ...state, processing: true };
    case LOAD_PHOTOS_SUCCESS:
      return { ...state, processing: false, photos: action.payload };
    case LOAD_PHOTOS_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    default:
      return state;
  }
}

//action creator becomes thunk creator
//instead of dispatching an action object (see commented code)
//dispatch a thunk function (a function that returns another function)
//inside the thunk have that function dispatch the initial request object that sets the loading
//and eventually dispatches success and failure actions
//by returning a function (thunk) you are now able to have the action creator do multiple dispatches over time
function loadPhotos() {
  // Can be any name or anonymous fn as well.
  return (dispatch) => { 
    let photoAPI = new PhotoAPI();
    dispatch({ type: LOAD_PHOTOS_REQUEST });
    return photoAPI
      .getAll(1)
      .then((data) => {
        dispatch({ type: LOAD_PHOTOS_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: LOAD_PHOTOS_FAILURE, payload: error });
      });
  };
}

const store = Redux.createStore(reducer, Redux.applyMiddleware(ReduxThunk));

function logState() {
  console.log(JSON.stringify(store.getState(), null, " "));
}

store.subscribe(logState);

async function test() {
  await store.dispatch(loadPhotos());
  console.log("loaded photos");
}

test();

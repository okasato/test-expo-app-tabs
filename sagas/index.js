import { call, put, takeEvery, all, take, select } from "redux-saga/effects";
import { eventChannel } from 'redux-saga';
import { create } from "apisauce";
import { testTodoSuccess, getBalanceSuccess } from "../actions";
import { RippleAPI } from 'ripple-lib';

// const api = url => fetch(url).then(response => response.json());
// const api = url => axios.get(url)
//     .then(response => {
//         // console.log("status", response.status);
//         // console.log("statusText", response.statusText);
//         // console.log(response.headers);
//         // console.log(response.config);
//         return response;
//     })
//     .catch(error => {
//         console.log("error", error.response)
//     })

const api = create({
  baseURL: "https://api.coinfield.com/v1/",
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  },
  timeout: 10000,
});

const getTest = () => api.get("tickers");

function* fetchTestTodo(action) {
  try {
    // const response = yield call(api, "https://api.coinfield.com/v1/tickers");
    const response = yield call(getTest);
    // if (response.status === 200) {
    if (response.ok) {
      yield put(testTodoSuccess(response.status));
    }
    // yield put({ type: 'TEST_TODO', payload: response.status });
  } catch (error) {
    console.log(error);
  }
}

const rippleLibApi = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233'
});

// const createChannel = rippledSocket => {
//   return eventChannel(emit => {
//     // const handler = data => {
//     //   console.log(data);
//     //   emit(data);
//     // };
//     const unsubscribe = () => {
//       rippledSocket.disconnect();
//     };

//     await rippledSocket.connect();
//     let response = await emit();
//     await unsubscribe;
//   });
// };

function* requestGetBalance(action) {
  console.log('how are you?')
  try {
    rippleLibApi.on('error', (errorCode, errorMessage) => {
      console.log(errorCode + ': ' + errorMessage);
    });
    rippleLibApi.on('connected', () => {
      console.log('connected');
    });
    rippleLibApi.on('disconnected', code => {
      console.log('disconnected, code:', code);
    });
    const getAccountInfo = address => {
      return rippleLibApi.getAccountInfo(address);
    };
    yield rippleLibApi.connect();
    const myAddress = 'rGPvYEMkxmeVsLBBPsAekxuFdxbRSxe71k';
    const response = yield call(getAccountInfo, myAddress);
    console.log('RESPONSE', response);
    if (response) {
      yield put(getBalanceSuccess(response));
      yield rippleLibApi.disconnect();
    }
  } catch (error) {

  }
}


export default function* rootSaga() {
  yield all([
    takeEvery("TEST_TODO", fetchTestTodo),
    takeEvery("GET_BALANCE", requestGetBalance),
  ]);
}

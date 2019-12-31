import { call, put, takeEvery, all, take, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { create } from "apisauce";
import {
  testTodoSuccess,
  getBalanceSuccess,
  getBalanceError,
  postPaymentTransactionSuccess,
  postPaymentTransactionError,
  getListenToTransactionSuccess,
  getListenToTransactionError,
  connectToRippleApi,
  connectToRippleApiSuccess,
  connectToRippleApiError,
} from "../actions";
import { RippleAPI } from "ripple-lib";

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
    }
  },
  timeout: 10000
});

const getTest = () => api.get("tickers");

function* fetchTestTodo(action) {
  try {
    console.log(action)
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
  server: "wss://s.altnet.rippletest.net:51233"
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

function* requestConnectToRippleApi() {
  try {
    console.log("hello connect to ripple api")
    yield rippleLibApi.on("error", (errorCode, errorMessage) => {
      console.log(errorCode + ": " + errorMessage);
    });
    yield rippleLibApi.on("connected", () => {
      console.log("connected");
    });
    yield rippleLibApi.on("disconnected", code => {
      console.log("disconnected, code:", code);
    });
    console.log("put connect to ripple api")
    yield put(connectToRippleApiSuccess());
  } catch (error) {
    yield put(connectToRippleApiError());
    console.log("REQUEST_CONNECT_RIPPLE_API_ERROR", error);
  }
}

const getAccountInfo = address => {
  return rippleLibApi.getAccountInfo(address);
};

function* requestGetBalance(action) {
  console.log("how are you?");
  try {
    // yield rippleLibApi.on("error", (errorCode, errorMessage) => {
    //   console.log(errorCode + ": " + errorMessage);
    // });
    // yield rippleLibApi.on("connected", () => {
    //   console.log("connected");
    // });
    // yield rippleLibApi.on("disconnected", code => {
    //   console.log("disconnected, code:", code);
    // });
    yield rippleLibApi.connect();
    const myAddress = "rGPvYEMkxmeVsLBBPsAekxuFdxbRSxe71k";
    const response = yield call(getAccountInfo, myAddress);
    console.log("RESPONSE", response);
    if (response) {
      yield put(getBalanceSuccess(response));
      yield rippleLibApi.disconnect();
    } else {
      yield put(getBalanceError());
    }
  } catch (error) {
    console.log("REQUEST_GET_BALANCE_ERROR", error);
  }
}

const preparePayment = (address, payment) => {
  return rippleLibApi.preparePayment(address, payment);
};

const sign = (txJSON, secret) => {
  return rippleLibApi.sign(txJSON, secret);
};

const submit = signedTransaction => {
  return rippleLibApi.submit(signedTransaction);
};

function* requestPostPaymentTransaction(action) {
  yield rippleLibApi.connect();
  try {
    const {
      address,
      destinationAddress,
      amountValue,
      secret,
    } = action;

    const payment = {
      source: {
        address: address,
        maxAmount: {
          value: amountValue,
          currency: 'XRP'
        }
      },
      destination: {
        address: destinationAddress,
        amount: {
          value: amountValue,
          currency: 'XRP'
        }
      }
    };

    const prepared = yield call(preparePayment, address, payment);
    console.log("prepared", prepared);
    try {
      const responseSign = yield call(sign, prepared.txJSON, secret);
      console.log("sign", responseSign)
      try {
        const { signedTransaction } = responseSign;
        const responseSubmit = yield call(submit, signedTransaction);
        console.log("submit", responseSubmit)
        try {
          yield put(postPaymentTransactionSuccess(responseSubmit));
          // yield rippleLibApi.disconnect();
          // console.log("done and disconnected.");          
        } catch (error) {
          console.log("Put postpostPaymentTransaction failed.", error);
          yield put(postPaymentTransactionError(error));
        }
      } catch (error) {
        console.log("submit failed", error);          
      }      
    } catch (error) {
      console.log("sign failed", error);
    }
  } catch (error) {
    console.log("REQUEST_PAYMENT_PREPARE_ERROR", error);
  }
}

const requestSubscribe = account => {
  return rippleLibApi.request('subscribe', {
    accounts: [ account ]
  });
};

const requestUnsubscribe = account => {
  return rippleLibApi.request('unsubscribe', {
    accounts: [ account ]
  });
};

function* requestListenToTransaction(action) {
  yield rippleLibApi.connect();
  const { account } = action; 
  try {
    yield rippleLibApi.connection.on('transaction', event => {
      console.log(JSON.stringify(event, null, 2), '------------------------------')
      
      return rippleLibApi.request('unsubscribe', {
        accounts: [ account ]
      }).then(response => {
        console.log("Successfully unsubscribed", response)
        rippleLibApi.disconnect();
      }).catch(error => {
        console.log("unsubscription error", error)
      })      
    });
    try {
      const response = yield call(requestSubscribe, account);
      try {
        console.log("Listen to transactions", JSON.stringify(response, null, 2))
        // if (response.status) {
          yield put(getListenToTransactionSuccess(response));        
          console.log('Successfully subscribed');

          // yield rippleLibApi.disconnect();
          // console.log("done and disconnected.");
        // }
      } catch (error) {
        console.log("Put getListenToTransactionSuccess failed.", error);
        yield put(getListenToTransactionError(error));
      }
    } catch (error) {
      console.log("subscribed failed.", error);
    }
  } catch (error) {
    console.log("REQUEST_LISTEN_TO_TRANSACTION", error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery("TEST_TODO", fetchTestTodo),
    takeEvery("GET_BALANCE", requestGetBalance),
    takeEvery("POST_PAYMENT_TRANSACTION", requestPostPaymentTransaction),
    takeEvery("GET_LISTEN_TO_TRANSACTION", requestListenToTransaction),
    takeEvery("CONNECT_TO_RIPPLE_API", requestConnectToRippleApi),
  ]);
}

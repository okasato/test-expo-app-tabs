import { call, put, takeEvery, all, take, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { create } from "apisauce";
import {
  testTodoSuccess,
  getBalanceSuccess,
  getBalanceError,
  postPaymentTransactionSuccess,
  postPaymentTransactionError
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

function* requestGetBalance(action) {
  console.log("how are you?");
  try {
    yield rippleLibApi.on("error", (errorCode, errorMessage) => {
      console.log(errorCode + ": " + errorMessage);
    });
    yield rippleLibApi.on("connected", () => {
      console.log("connected");
    });
    yield rippleLibApi.on("disconnected", code => {
      console.log("disconnected, code:", code);
    });
    const getAccountInfo = address => {
      return rippleLibApi.getAccountInfo(address);
    };
    yield rippleLibApi.connect();
    const myAddress = "rGPvYEMkxmeVsLBBPsAekxuFdxbRSxe71k";
    const response = yield call(getAccountInfo, myAddress);
    console.log("RESPONSE", response, response.ok);
    if (response) {
      yield put(getBalanceSuccess(response));
      yield rippleLibApi.disconnect();
    } else {
      yield put(getBalanceError());
    }
  } catch (error) {
    console.log(error);
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
  try {
    yield rippleLibApi.connect();
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
          yield rippleLibApi.disconnect();
          console.log("done and disconnected.");          
        } catch (error) {
          console.log("submit failed.", error);
          yield put(postPaymentTransactionSuccess(error));
        }
      } catch (error) {
        console.log("sign failed", error);          
      }      
    } catch (error) {
      console.log("paymentPrepare failed", error);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery("TEST_TODO", fetchTestTodo),
    takeEvery("GET_BALANCE", requestGetBalance),
    takeEvery("POST_PAYMENT_TRANSACTION", requestPostPaymentTransaction),
  ]);
}

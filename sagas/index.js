import { call, put, takeEvery, all, take, select } from "redux-saga/effects";
import { create } from "apisauce";
import { testTodoSuccess } from "../actions";

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

export default function* rootSaga() {
  yield all([takeEvery("TEST_TODO", fetchTestTodo)]);
}

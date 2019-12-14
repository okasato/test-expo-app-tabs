import { call, put, takeEvery, all, take, select } from 'redux-saga/effects';
import axios from 'axios';
import { testTodoSuccess } from '../actions';

// const api = url => fetch(url).then(response => response.json());
const api = url => axios.get(url)
    .then(response => {
        // console.log("status", response.status);
        // console.log("statusText", response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        return response;
    })
    .catch(error => {
        console.log("error", error.response)
    })

function* fetchTestTodo(action) {
    try {
        const response = yield call(api, 'https://api.coinfield.com/v1/tickers');
        if (response.status === 200) {
            console.log('hey', response.data.markets[0].market)
            yield put(testTodoSuccess(response.status));
        }
        // yield put({ type: 'TEST_TODO', payload: response.status });
    } catch (error) {
        console.log(error)
    }
}

export default function* rootSaga() {
    yield all([
      takeEvery('TEST_TODO', fetchTestTodo),
    ]);
  } 
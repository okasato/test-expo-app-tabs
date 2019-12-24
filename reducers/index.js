const defaultState = {
    test: 'Default',
    testPending: null,
    testSuccess: null,
    testError: null,
    balance: null,
    getBalancePending: null,
    getBalanceSuccess: null,
    getBalanceError: null,
};

const testTodo = (state, action) => {
    // console.log('reducers testTodo', action)
    return Object.assign({}, state, { testPending: true, testSuccess: false, testError: false });
};

const testTodoSuccess = (state, action) => {
    // console.log('reducers testTodoSuccess', action)
    return Object.assign({}, state, { test: action.payload, testPending: false, testSuccess: true, testError: false });
};

const testTodoReset = (state, action) => {
    return Object.assign({}, state, { test: 'Default', testPending: null, testSuccess: null, testError: null });
};

const getBalance = (state, action) => {
    return Object.assign({}, state, { getBalancePending: true, getBalanceSuccess: false, getBalanceError: false });
};

const getBalanceSuccess = (state, action) => {
    return Object.assign({}, state, { balance: action.payload, getBalancePending: false, getBalanceSuccess: true, getBalanceError: false });
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'TEST_TODO': 
            return testTodo(state, action);
        case 'TEST_TODO_SUCCESS': 
            return testTodoSuccess(state, action);
        case 'TEST_TODO_RESET': 
            return testTodoReset(state, action);
        case 'GET_BALANCE':
            return getBalance(state, action);
        case 'GET_BALANCE_SUCCESS':
            return getBalanceSuccess(state, action);
        
        default: 
            return state;
    }
};
const defaultState = {
    test: 'Default',
    testPending: null,
    testSuccess: null,
    testError: null,
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

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'TEST_TODO': 
            return testTodo(state, action);
        case 'TEST_TODO_SUCCESS': 
            return testTodoSuccess(state, action);
        case 'TEST_TODO_RESET': 
            return testTodoReset(state, action);
        
        default: 
            return state;
    }
};
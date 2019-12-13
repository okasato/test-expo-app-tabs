const defaultState = {
    test: 'Default',
};

const testTodo = (state, action) => {
    return Object.assign({}, state, { test: action.test });
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'TEST_TODO': 
            return testTodo(state, action);
        default: 
            return state;
    }
};
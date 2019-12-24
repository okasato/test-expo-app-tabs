export const testTodo = () => {
    return {
        type: 'TEST_TODO',
    }
}

export const testTodoSuccess = data => {
    return {
        type: 'TEST_TODO_SUCCESS',
        payload: data,
    }
}

export const testTodoReset = () => {
    return {
        type: 'TEST_TODO_RESET',
    }
}

export const getBalance = () => {
    return {
        type: 'GET_BALANCE',
    }
}

export const getBalanceSuccess = data => {
    return {
        type: 'GET_BALANCE_SUCCESS',
        payload: data,
    }
}
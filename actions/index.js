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
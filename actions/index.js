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

export const getBalanceError = data => {
    return {
        type: 'GET_BALANCE_ERROR',
        payload: data,
    }
}

export const postPaymentTransaction = (address, destinationAddress, amountValue, secret) => {
    return {
        type: 'POST_PAYMENT_TRANSACTION',
        address,
        secret,
        destinationAddress,
        amountValue,
    }
}

export const postPaymentTransactionSuccess = data => {
    return {
        type: 'POST_PAYMENT_TRANSACTION_SUCCESS',
        payload: data,
    }
}

export const postPaymentTransactionError = data => {
    return {
        type: 'POST_PAYMENT_TRANSACTION_ERROR',
        payload: data,
    }
}
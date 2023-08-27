export function validatePasswords(passwordOne, passwordTwo) {
    if (passwordOne !== passwordTwo) {
        return false;
    }
    return true;
}

export function validateEmptyField(field) {
    if (!field.trim()) {
        return false;
    }
    return true;
}

export function validateEmail(email) {
    const regex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}




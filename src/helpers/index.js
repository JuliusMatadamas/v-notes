const evalEmail = (email) => {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email)
}

const evalPassword = (password) => {
    return password.trim().length > 5
}

const comparePasswords = (password1, password2) => {
    return password1.trim() === password2.trim()
}

const evalContentNote = (content) => {
    return content.trim().length > 10;
}

export { evalEmail, evalPassword, comparePasswords, evalContentNote }
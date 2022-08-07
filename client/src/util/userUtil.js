



export const isLoggedIn = () => {
    return !!localStorage.getItem(`${process.env.REACT_APP_LOGIN_TOKEN}`);
}

export const getToken = () => {
    return localStorage.getItem(`${process.env.REACT_APP_LOGIN_TOKEN }`);
}
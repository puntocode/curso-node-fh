function parseJWT (token) {
    var base64Url = token.split('.')[1]
    var base54 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
}
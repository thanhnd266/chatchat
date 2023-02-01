

const isValidEmail = (email) => {
    return !!email && typeof email === 'string' && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
}

module.exports = {
    isValidEmail,
}



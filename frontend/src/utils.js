export const getError = (error) => {
    return error.response && error.response.data.message //hyde l htyta bl server
    ? error.response.data.message
    : error.message
}

// w bzid l getError funct bl product.js
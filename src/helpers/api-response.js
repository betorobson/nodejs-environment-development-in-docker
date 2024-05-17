const express = require('express');
const { testeFromTS } = require('./teste');

const router = express.Router();
const methodGET = express();

methodGET.use(

    router.get(
        '/helper',
        [

            // (req, res, next) => apiResponse.success(res)
            (req, res) => res.json({helper: 1, fromTS: testeFromTS()})

        ]
    )

);


const success = () => {
    return {
        success: 'done!'
    };
};

module.exports = {
    success,
    methodGET
};

const express = require('express');
const router = express.Router();
const logger = require('pino')();

const app = express();

// app.use(pinoHttp);
app.listen(3002);

logger.info(`
	All good 🕺
	Running on port 3002
`);

app.use(
	router.get(
		'/',
		(req, res, next) => {
			setTimeout(
				() => {
					res.json({
						app2low: 'ok'
					});
				},
				10000
			);
		}
	)
);

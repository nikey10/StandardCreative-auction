import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { privateRoutes, publicRoutes } from './routes';
import { httpLogger, errorHandler, authHandler } from './middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
// import { handleListener } from './listeners'
import { auctionCreated, createBid, auctionFinished } from './listeners/eventListeners'

const app = express();

app.use(httpLogger); // http logger
app.use(cors()); // cors
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: false,
    ieNoOpen: false,
  })
);

// parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.options('*', cors());
// routes
app.use('/api', publicRoutes);
app.use('/api', privateRoutes);
app.get('/api/test', function (request, response) {
  response.send({ result: 'okay' });
});

// swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handling
app.use(errorHandler);

// event listener
auctionCreated();
createBid();
auctionFinished();

export default app;

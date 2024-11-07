import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { getContacts, getContact } from './controllers/contactsController.js';

const logger = pino();

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/contacts', getContacts);
  app.get('/contacts/:contactId', getContact);

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  return app;
}

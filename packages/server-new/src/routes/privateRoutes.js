import { cache } from 'ejs';
import express from 'express';
import { userController, tagsController } from '../controllers';
import * as settings from '../settings';

const privateRoutes = express.Router();

privateRoutes.post(
  '/update-user',
  userController().updateUser
);

privateRoutes.post(
  '/add-tag',
  tagsController().createTag
);

export { privateRoutes };

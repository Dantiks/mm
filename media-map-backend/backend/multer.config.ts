import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export const createMulterOptions = (folderName: string) => {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const dir = path.resolve(
          __dirname,
          '..',
          'static',
          'uploads',
          folderName,
        );
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = uuid.v4() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
      },
    }),
  };
};

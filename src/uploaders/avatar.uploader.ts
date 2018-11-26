const fs = require('fs');

export class AvatarUploader {
  adapter: string;
  rootPath = `storage/uploads`;
  constructor(adapter) {
    this.adapter = adapter;
  }

  // file is a buffer of bytes
  // if you use multer use memoryStorage
  async upload(file: Buffer, { fileName }) {
    if (this.adapter == 'file') {
      return this.uploadLocalFile(file, { fileName });
    }
  }

  async uploadLocalFile(file, { fileName }): Promise<any> {
    const filePath = `${this.rootPath}/${fileName}`;
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, file, err => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve({ path: filePath });
      });
    });
  }
}

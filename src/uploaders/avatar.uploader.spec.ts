import { AvatarUploader } from './avatar.uploader';
const fs = require('fs');

describe('AvatarUploader', () => {
  it('#new', () => {
    const uploader = new AvatarUploader('file');
    expect(uploader).toBeInstanceOf(AvatarUploader);
  });

  it('#upload', async () => {
    const uploader = new AvatarUploader('file');
    const file = fs.readFileSync(`${__dirname}/../../fixtures/node.png`);
    const response = await uploader.upload(file, { fileName: 'node2.png' });
    expect(response.path).toEqual('storage/uploads/node2.png');
  });
});

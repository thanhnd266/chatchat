import cloudinary from 'cloudinary';

const cloudinaryUpload = async ({ files, folder }) => {
  const createReadStreams = await Promise.all(files);
  const fileStreams = createReadStreams.map((file) => file.createReadStream());

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return Promise.all(
    fileStreams.map((fileStream) => {
      return new Promise((resolve, reject) => {
        const cloudStream = cloudinary.v2.uploader.upload_stream(
          { folder },
          function (err, fileUploaded) {
            if (err) {
              reject(err);
            }

            resolve(fileUploaded);
          }
        );

        fileStream.pipe(cloudStream);
      });
    })
  );
};

export default cloudinaryUpload;

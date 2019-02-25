import AWS from 'aws-sdk';

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

AWS.config.update({
    accessKeyId,
    secretAccessKey
});

const s3Bucket = new AWS.S3();

const params = {
    Bucket: 'playlist-populator-bucket',
    Key: '',
    Expires: 60 * 60
};

export const putObjectSignedUrl = () => {
    // generate key
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 20; i++) {
        key += chars[Math.floor(Math.random() * chars.length)]
    }
    params.Key = key;
    return s3Bucket.getSignedUrl('putObject', params);
}

export const getObjectSignedUrl = (key: string) => {
    params.Key = key;
    return s3Bucket.getSignedUrl('getObject', params);
}

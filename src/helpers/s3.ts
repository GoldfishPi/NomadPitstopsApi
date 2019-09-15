import { aws } from "../config.json";
const s3 = require('aws-s3');
const config = {
    bucketName:'pitstop-images',
    region:'ca-central-1',
    accessKeyId:aws.key,
    secretAccessKey:aws.secret,
}

export const s3Client = new s3(config);

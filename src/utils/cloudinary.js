import { v2 as cloudinary } from "cloudinary";
import fs, { unlinkSync } from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudniary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        //todo upload the file on cloudniary
      const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //todo file has been uploaded succesfully!
        // console.log("file is uploaded on clounda", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) //todo Remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudniary}
import ImageKit from "@imagekit/nodejs";
import { toFile } from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY
});

export const uploadFileToImagekit = async(image , filename)=>{
  const file = await imagekit.files.upload({
    file: await toFile(image),
    fileName:filename,
    folder:"Ecommerse"
  });
  return file.url;
}
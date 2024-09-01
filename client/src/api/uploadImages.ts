import { CLOUDNAME, cloudinaryUploadPreset } from "@/constants";
import showToast from "@/utils/toaster";
import axios from "axios";

export default async function uploadImages(images: File[]) {
  try {
    const promises = images.map((image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", cloudinaryUploadPreset);

      return axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`,
        formData
      );
    });
    return (await Promise.all(promises)).map((res) => res.data.secure_url);
  } catch (error: any) {
    showToast(error.message, "error");
  }
}

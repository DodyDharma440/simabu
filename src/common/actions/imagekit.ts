import axios from "axios";
import { post } from "../utils/react-query";

interface ISignIKResponse {
  token: string;
  expire: number;
  signature: string;
}

interface IUploadIKResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  tags: string[];
  AITags: any[];
  versionInfo: {
    id: string;
    name: string;
  };
  isPrivateFile: boolean;
  customCoordinates: string | null;
  customMetadata: Record<string, any>;
  embeddedMetadata: Record<string, any>;
  extensionStatus: Record<string, any>;
  fileType: string;
}

export const useUploadImage = post<any, FormData, {}, IUploadIKResponse>(
  async ({ formValues }) => {
    try {
      const signature = await axios.get<ISignIKResponse>(
        `${process.env["NEXT_PUBLIC_API_BASE_URL"]}/api/auth/imagekit`
      );
      Object.entries(signature.data).forEach(([key, value]) => {
        formValues.append(key, value);
      });
      formValues.append(
        "publicKey",
        process.env["NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY"]!
      );

      return axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formValues
      );
    } catch (e) {
      throw new Error("Error uploading...");
    }
  },
  []
);

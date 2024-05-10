import { DeleteFileBody } from "@/types/file";
import axiosInstance from "@utils/axios";

export const uploadFileRequest = async (
  formData: FormData
): Promise<string> => {
  const { data } = await axiosInstance.post(`/file/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteFileRequest = async (body: DeleteFileBody) => {
  const { data } = await axiosInstance.delete(`/file`, {
    data: body,
  });
  return data;
};

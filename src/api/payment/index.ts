import { Response } from "@/types/common";
import { PaymentDetail, PaymentParam } from "@/types/payment";
import { objectToQueryStringByComma } from "@/utils";
import axiosInstance from "@utils/axios";

export const getPaymentList = async (
  param: PaymentParam
): Promise<Response<PaymentDetail>> => {
  const search = objectToQueryStringByComma(param);
  const { data } = await axiosInstance.get(`/payment?${search}`);
  return data;
};

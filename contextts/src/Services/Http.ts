import axios from "axios";
interface RequestProcessorProp {
  method: string;
  url: string;
  data?: Object;
}
export const http = ({ method, url, data }: RequestProcessorProp) => {
  return axios({
    method,
    url,
    data,
  });
};

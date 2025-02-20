import axios, { AxiosResponse } from "axios";
import Client from "./IClient";

const apiClient = axios.create({
  baseURL: "http://localhost:5228/api",
});

const getClients = async (): Promise<Client[]> => {
  try {
    const res: AxiosResponse<Client[]> = await apiClient.get("/Client");
    return res.data;
  } catch (e) {
    console.log("Something went wrong!", e);
    return [];
  }
};

const clientService = {
  getClients,
};

export default clientService;

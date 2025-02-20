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

const addClient = async (client: Client): Promise<Client> => {
  try {
    const res: AxiosResponse<Client> = await apiClient.post("/Client", client);
    return res.data;
  } catch (e: any) {
    console.log("Something went wrong!", e);
    throw new Error("Failed to add client:"+e)
  }
};

const clientService = {
  getClients,
  addClient,
};

export default clientService;

import axios, { AxiosResponse, AxiosError } from "axios";
import Client from "./IClient";
import ClientModel from "./IClientModel";

const apiClient = axios.create({
  baseURL: "http://localhost:5228/api",
});

const getClients = async (): Promise<Client[]> => {
  try {
    const res: AxiosResponse<Client[]> = await apiClient.get("/Client");
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.log("Axios error occurred:", e.message);
    } else {
      console.log("Unexpected error:", e);
    }
    return [];
  }
};

const addClient = async (client: ClientModel): Promise<Client> => {
  try {
    const res: AxiosResponse<Client> = await apiClient.post("/Client", client);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.log("Axios error occurred:", e.message);
    } else {
      console.log("Unexpected error:", e);
    }
    throw new Error("Failed to add client: " + e);
  }
};

const clientService = {
  getClients,
  addClient,
};

export default clientService;
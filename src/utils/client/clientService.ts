import axios, { AxiosResponse, AxiosError } from "axios";
import Client from "./IClient";
import ClientModel from "./IClientModel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiClient = axios.create({
	baseURL: "http://localhost:5228/api",
});

const getClients = async (): Promise<Client[]> => {
	try {
		const res: AxiosResponse<Client[]> = await apiClient.get("/Client");
		return res.data;
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			toast.error(`Failed to fetch clients: ${e.message}`);
		} else {
			toast.error("Unexpected error occurred while fetching clients.");
		}
		return [];
	}
};

const addClient = async (client: ClientModel): Promise<Client> => {
	try {
		const res: AxiosResponse<Client> = await apiClient.post("/Client", client);
		toast.success("Client added successfully!");
		return res.data;
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			toast.error(`Failed to add client: ${e.message}`);
		} else {
			toast.error("Unexpected error occurred while adding client.");
		}
		throw new Error("Failed to add client: " + e);
	}
};

const deleteClient = async (clientId: number): Promise<Client | null> => {
	try {
		const res: AxiosResponse<Client> = await apiClient.delete(`/Client/${clientId}`);
		toast.success("Client deleted successfully");
		return res.data; 
	} catch (e: unknown) {
		if (e instanceof AxiosError) {
			toast.error(`Failed to delete client: ${e.response?.data?.message || e.message}`);
		} else {
			toast.error("Unexpected error occurred while deleting client.");
		}
		throw e; 
	}
};

const clientService = {
	getClients,
	addClient,
	deleteClient,
};

export default clientService;
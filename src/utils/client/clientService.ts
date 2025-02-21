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

const clientService = {
	getClients,
	addClient,
};

export default clientService;
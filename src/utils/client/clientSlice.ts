import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientService from "./clientService";
import Client from "./IClient";
import ClientModel from "./IClientModel";
import { AxiosError } from "axios";

interface ClientState {
	clients: Client[];
	filteredClients: Client[];
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: string;
}

const initialState: ClientState = {
	clients: [],
	filteredClients: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const getClients = createAsyncThunk(
	"client/getClient",
	async (_, thunkAPI) => {
		try {
			return await clientService.getClients();
		} catch (e: unknown) {
			let message = "An unknown error occurred";
			if (e instanceof AxiosError) {
				message =
					(e.response && e.response.data && e.response.data.message) ||
					e.message ||
					e.toString();
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const addClient = createAsyncThunk(
	"client/addClient",
	async (client: ClientModel, thunkAPI) => {
		try {
			return await clientService.addClient(client);
		} catch (e: unknown) {
			let message = "An unknown error occurred";
			if (e instanceof AxiosError) {
				message =
					(e.response && e.response.data && e.response.data.message) ||
					e.message ||
					e.toString();
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const deleteClient = createAsyncThunk(
	"client/deleteClient",
	async (clientId: number, thunkAPI) => {
		try {
			return await clientService.deleteClient(clientId);
			return clientId;
		} catch (e: unknown) {
			let message = "An unknown error occurred";
			if (e instanceof AxiosError) {
				message =
					(e.response && e.response.data && e.response.data.message) ||
					e.message ||
					e.toString();
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const updateClient = createAsyncThunk(
	"client/updateClient",
	async ({ clientId, clientData }: { clientId: number; clientData: ClientModel }, thunkAPI) => {
		try {
			return await clientService.updateClient(clientId, clientData);
		} catch (e: unknown) {
			let message = "An unknown error occurred";
			if (e instanceof AxiosError) {
				message =
					(e.response && e.response.data && e.response.data.message) ||
					e.message ||
					e.toString();
			}
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const clientSlice = createSlice({
	name: "clients",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = "";
		},
		filterClients: (state, action) => {
			const searchTerm = action.payload.toLowerCase();
			if (searchTerm === "") {
				state.filteredClients = state.clients;
			} else {
				state.filteredClients = state.clients.filter(client =>
					client.clientName.toLowerCase().includes(searchTerm) ||
					client.clientEmail.toLowerCase().includes(searchTerm)
				);
			}
		}
	},
	extraReducers: (builder) => {
		builder

			// Fetching clients
			.addCase(getClients.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getClients.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.clients = action.payload;
				state.filteredClients = action.payload;
			})
			.addCase(getClients.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})

			// Adding client
			.addCase(addClient.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addClient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.clients = [...state.clients, action.payload];
				state.message = "Success adding client!";
			})
			.addCase(addClient.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})

			// Deleting client
			.addCase(deleteClient.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteClient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.clients = state.clients.filter(
					(client) => client.clientId !== action.payload
				);
				state.message = "Client deleted successfully!";
			})
			.addCase(deleteClient.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			})

			// Update client
			.addCase(updateClient.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateClient.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				if (action.payload) {
					state.clients = state.clients.map(client =>
						client.clientId === action.payload.clientId ? action.payload : client
					);
				}
				state.message = "Client updated successfully!";
			})
			.addCase(updateClient.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload as string;
			});
	},
});

export const { reset, filterClients } = clientSlice.actions;
export default clientSlice.reducer;
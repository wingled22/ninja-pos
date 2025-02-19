import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientService from "./clientService";
import Client from "./IClient";
import ClientModel from "./IClientModel";

interface ClientState {
  clients: Client[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ClientState = {
  clients: [],
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
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addClient = createAsyncThunk(
  "client/addClient",
  async (client: ClientModel, thunkAPI) => {
    try {
      return await clientService.addClient(client);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
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
  },
  extraReducers: (builder) => {
    builder

      // pagkuha sa mga kliyente
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // adding client
      .addCase(addClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addClient.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Success adding client!";
      })
      .addCase(addClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});
export const { reset } = clientSlice.actions;
export default clientSlice.reducer;

import { StateSchema } from "../../store";


export const getAuthData = (state: StateSchema) => state.auth.user || null
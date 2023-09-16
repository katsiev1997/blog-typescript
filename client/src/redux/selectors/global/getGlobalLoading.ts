import { StateSchema } from "../../store";

export const getGlobalLoading = (state: StateSchema) => state.global.loading || false
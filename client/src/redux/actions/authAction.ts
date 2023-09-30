import { AuthStateUserData } from "../../utils/typescript";
import { Dispatch } from "redux";
import { AUTH, AUTH_ERROR, AuthType } from "../types/authTypes";
import { GlobalLoadingType, LOADING } from "../types/globalTypes";
import { TOKEN_KEY } from "../../utils/utilStorage";
import { $api } from "../../api";

export const login =
  (userData: AuthStateUserData) =>
  async (dispatch: Dispatch<AuthType | GlobalLoadingType>) => {
    try {
      dispatch({ type: LOADING, payload: true });

      const res = await $api.post("/login", userData);

      if (res.data) {
        dispatch({
          type: AUTH,
          payload: {
            user: res.data.user,
            token: res.data.access_token,
            error: "",
          },
        });

        dispatch({ type: LOADING, payload: false });

        localStorage.setItem(TOKEN_KEY, res.data.access_token);
      }

      window.location.href = "/";
    } catch (error: any) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.message,
      });
      dispatch({ type: LOADING, payload: false });
    }
  };

export const refreshToken =
  () => async (dispatch: Dispatch<AuthType | GlobalLoadingType>) => {
    const token: string | null = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        dispatch({ type: LOADING, payload: true });

        const res = await $api.get("/refreshToken");

        console.log(res);

        dispatch({
          type: AUTH,
          payload: {
            user: res.data.user,
            token: res.data.accessToken,
            error: "",
          },
        });
        dispatch({ type: LOADING, payload: false });
      } catch (error: any) {
        dispatch({
          type: AUTH_ERROR,
          payload: error.response.data.message,
        });
        dispatch({ type: LOADING, payload: false });
      }
    }
  };


export const logout = () => async (dispatch: Dispatch<GlobalLoadingType>) => {
  try {
    
  } catch (error) {
    
  }
}
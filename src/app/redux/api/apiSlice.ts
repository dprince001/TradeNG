import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn
} from "@reduxjs/toolkit/query/react";
import { logOut } from "../api/appSlice";

export const apiHeader = {
  "Content-Type": "application/json",
};

interface RootState {
  app: {
    userInfo: {
      token: string;
      user: {email: string, first_name: string, last_name: string, status: string} | null;
    } | null;
  };
}

export const getBaseUrl = () => "https://tradeng-api.onrender.com/api/v1";

// Base query setup
const rawBaseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    Object.entries(apiHeader).forEach(([key, value]) => {
      if (!headers.has(key)) {
        headers.set(key, value);
      }
    });

    const state = getState() as RootState;
    const token = state?.app?.userInfo?.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn<
  any,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const baseUrl = getBaseUrl();

  let result = await rawBaseQuery(
    { ...args, url: `${baseUrl}${args.url}` },
    api,
    extraOptions
  );

  if (result?.error?.status === 401 && args.url !== "/auth/login") {
    api.dispatch(logOut());
    window.location.href = "/login";
  }

  return result;
};

export const generalApiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "api",
  tagTypes: ["Categories", "Listing", "Review", "Offer"],
  endpoints: (builder) => ({})
});

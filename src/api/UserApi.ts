import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/Store";
import type UserState from "../interfaces/UserState";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (build) => ({
    getUser: build.query<UserState, unknown>({
      query: (id: string) => `/users/${id}`,
    }),
    editUser: build.mutation<unknown, { id: number } & Partial<UserState>>({
      query: ({ id, ...body }) => ({
        method: "PATCH",
        url: `/users/${id}`,
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useEditUserMutation } = UserApi;

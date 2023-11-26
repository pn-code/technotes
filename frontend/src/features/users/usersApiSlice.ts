import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/api/users",
            keepUnusedDataFor: 5,
            transformResponse: (responseData: any[]) => {
                const loadedUsers = responseData.map((user) => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result: any) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map((id: any) => ({ type: "User", id })),
                    ];
                } else return [{ type: "User", id: "LIST" }];
            },
        }),
        createNewUser: builder.mutation({
            query: (initialUserData) => ({
                url: "/api/users",
                method: "POST",
                body: {
                    ...initialUserData,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        updateUser: builder.mutation({
            query: (initialUserData) => ({
                url: "/api/users",
                method: "PATCH",
                body: {
                    ...initialUserData,
                },
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
        deleteUser: builder.mutation({
            query: ({ userId }) => ({
                url: "/api/users",
                method: "DELETE",
                body: { id: userId },
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
    }),
});

export const { useGetUsersQuery } = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select("");

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
    (state: any) => selectUsersData(state) ?? initialState
);

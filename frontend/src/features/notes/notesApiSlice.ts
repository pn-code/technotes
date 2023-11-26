import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({
    sortComparer: (a: Note, b: Note) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => "/api/notes",
            transformResponse: (responseData: any[]) => {
                const loadedNotes = responseData.map((note) => {
                    note.id = note._id;
                    return note;
                });
                return notesAdapter.setAll(initialState, loadedNotes);
            },
            providesTags: (result: any) => {
                if (result?.ids) {
                    return [
                        { type: "Note", id: "LIST" },
                        ...result.ids.map((id: any) => ({ type: "Note", id })),
                    ];
                } else return [{ type: "Note", id: "LIST" }];
            },
        }),
        createNewNote: builder.mutation({
            query: (initialNoteData) => ({
                url: "/api/notes",
                method: "POST",
                body: {
                    ...initialNoteData,
                },
            }),
            invalidatesTags: [{ type: "Note", id: "LIST" }],
        }),
        updateNote: builder.mutation({
            query: (initialNoteData) => ({
                url: "/api/notes",
                method: "PATCH",
                body: {
                    ...initialNoteData,
                },
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "Note", id: arg.id },
            ],
        }),
        deleteNote: builder.mutation({
            query: ({ noteId }) => ({
                url: "/api/notes",
                method: "DELETE",
                body: { id: noteId },
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "Note", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetNotesQuery,
    useCreateNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = notesApiSlice;

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select("");

// creates memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    (notesResult) => notesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds,
    // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(
    (state: any) => selectNotesData(state) ?? initialState
);

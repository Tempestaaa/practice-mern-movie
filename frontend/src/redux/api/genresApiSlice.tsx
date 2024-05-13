import { GenreType } from "../../types/genre.type";
import { GENRE_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: `${GENRE_URL}`,
        method: "POST",
        body: newGenre,
      }),
      invalidatesTags: ["Genre"],
    }),
    updateGenre: builder.mutation({
      query: ({ genreId, updatedGenre }) => ({
        url: `${GENRE_URL}/${genreId}`,
        method: "PUT",
        body: updatedGenre,
      }),
      invalidatesTags: ["Genre"],
    }),
    deleteGenre: builder.mutation({
      query: (genreId) => ({
        url: `${GENRE_URL}/${genreId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Genre"],
    }),
    getAllGenres: builder.query<GenreType[], void>({
      query: () => ({
        url: `${GENRE_URL}`,
      }),
      providesTags: ["Genre"],
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useUpdateGenreMutation,
  useGetAllGenresQuery,
} = genreApiSlice;

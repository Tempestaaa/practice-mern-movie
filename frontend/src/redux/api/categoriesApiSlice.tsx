import { CategoryType } from "../../types/category.type";
import { CATEGORY_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategories: builder.query<CategoryType[], void>({
      query: () => ({
        url: `${CATEGORY_URL}`,
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
} = categoryApiSlice;

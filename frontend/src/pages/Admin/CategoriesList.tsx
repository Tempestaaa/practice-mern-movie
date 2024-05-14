import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoriesApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import { CategoryType } from "../../types/category.type";

const CategoriesList = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({
    _id: "",
    name: "",
  });
  const [updateName, setUpdateName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categories } = useGetAllCategoriesQuery();
  const [createGern] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return toast.error("Category name is required");

    try {
      const res = await createGern({ name }).unwrap();
      if (res.message) {
        return toast.error(res.message);
      }
      setName("");
      toast.success(`${res.name} is created`);
    } catch (error) {
      console.log(error);
      toast.error("Creating category failed, try again");
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updateName) return toast.error("Category name is required");
    try {
      const res = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updateName,
        },
      }).unwrap();
      if (res.message) return toast.error(res.message);
      toast.success(`${res.name} is updated`);
      setSelectedCategory({
        _id: "",
        name: "",
      });
      setUpdateName("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const res = await deleteCategory(selectedCategory._id).unwrap();
      toast.success(res.message);
      setSelectedCategory({
        _id: "",
        name: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Category delection failed. Try again");
    }
  };

  return (
    <div className="ml-40 flex flex-col md:flex-row">
      {/* Admin Menu */}
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories &&
            categories.map((category) => (
              <div key={category._id}>
                <button
                  className="bg-white border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedCategory(category);
                    setUpdateName(category.name);
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CategoryForm
            value={updateName}
            setValue={(value) => setUpdateName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoriesList;

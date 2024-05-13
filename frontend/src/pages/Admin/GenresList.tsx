import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useGetAllGenresQuery,
  useUpdateGenreMutation,
} from "../../redux/api/genresApiSlice";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";
import { GenreType } from "../../types/genre.type";

const GenresList = () => {
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<GenreType>({
    _id: "",
    name: "",
  });
  const [updateName, setUpdateName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: genres } = useGetAllGenresQuery();
  const [createGern] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return toast.error("Genre name is required");

    try {
      const res = await createGern({ name }).unwrap();
      if (res.message) {
        return toast.error(res.message);
      }
      setName("");
      toast.success(`${res.name} is created`);
    } catch (error) {
      console.log(error);
      toast.error("Creating genre failed, try again");
    }
  };

  const handleUpdateGenre = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updateName) return toast.error("Genre name is required");
    try {
      const res = await updateGenre({
        genreId: selectedGenre._id,
        updatedGenre: {
          name: updateName,
        },
      }).unwrap();
      if (res.message) return toast.error(res.message);
      toast.success(`${res.name} is updated`);
      setSelectedGenre({
        _id: "",
        name: "",
      });
      setUpdateName("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const res = await deleteGenre(selectedGenre._id).unwrap();
      toast.success(res.message);
      setSelectedGenre({
        _id: "",
        name: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Genre delection failed. Try again");
    }
  };

  return (
    <div className="ml-40 flex flex-col md:flex-row">
      {/* Admin Menu */}
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Genres</div>
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {genres &&
            genres.map((genre) => (
              <div key={genre._id}>
                <button
                  className="bg-white border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedGenre(genre);
                    setUpdateName(genre.name);
                  }}
                >
                  {genre.name}
                </button>
              </div>
            ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <GenreForm
            value={updateName}
            setValue={(value) => setUpdateName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenresList;

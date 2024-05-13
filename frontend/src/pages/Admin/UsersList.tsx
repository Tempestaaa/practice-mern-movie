import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";

const UsersList = () => {
  const { data: users, refetch, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [editableUserId, setEditableUserId] = useState(" ");
  const [editableUserName, setEditableUserName] = useState(" ");
  const [editableUserEmail, setEditableUserEmail] = useState(" ");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
      } catch (error: any) {
        toast.error(error.data.message || error.message);
      }
    }
  };

  const toggleEdit = async (id: string, username: string, email: string) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });

      setEditableUserId("");
      refetch();
    } catch (error: any) {
      toast.error(error.data.message || error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
              </tr>
            </thead>

            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user._id}</td>

                    {/* USERNAME */}
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg text-black"
                          />
                          <button
                            onClick={() => handleUpdate(user._id)}
                            className="ml-2 bg-blue-500 py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p>{user.username}</p>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-4" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* EMAIL */}
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg text-black"
                          />
                          <button
                            onClick={() => handleUpdate(user._id)}
                            className="ml-2 bg-blue-500 py-2 px-4 rounded-lg"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p>{user.email}</p>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                          >
                            <FaEdit className="ml-4" />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* ADMIN */}
                    <td className="px-4 py-2">
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>

                    {/* DELETE */}
                    <td className="px-4 py-2">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersList;

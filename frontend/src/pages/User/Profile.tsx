import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  useLogoutMutation,
  useProfileMutation,
} from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { logOut, setCredentials } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const [logoutApiCall] = useLogoutMutation();
  const logOutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword)
      return toast.error("Password do not match");

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <div className="container mx-auto p-4 pt-28">
      <div className="flex justify-center align-middle gap-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="p-4 rounded-sm w-full text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="p-4 rounded-sm w-full text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="p-4 rounded-sm w-full text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="p-4 rounded-sm w-full text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className="bg-pink-500 py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>

              <button
                type="button"
                disabled={loadingUpdateProfile}
                onClick={logOutHandler}
                className="bg-red-500 py-2 px-4 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && (
          <div className="absolute top-1/2 -translate-y-1/2">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

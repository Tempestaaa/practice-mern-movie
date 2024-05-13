import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { RootState } from "../../redux/store";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginApi, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginApi({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error: any) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div>
      <section className="pl-40 flex flex-wrap">
        <div className="mr-16 mt-20">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form onSubmit={handlerSubmit} className="container w-[40rem]">
            <div className="my-8">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Adrress
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                className="mt-1 p-2 border rounded w-full text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-8">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                className="mt-1 p-2 border rounded w-full text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 cursor-pointer my-4 py-2 px-4 rounded"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p>
              New Viewer ?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

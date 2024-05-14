import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart, FaFire, FaFilm } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { MdMovie } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logOut } from "../../redux/features/auth/authSlice";
import { RootState } from "../../redux/store";

const links: { name: string; link: string; icon: IconType }[] = [
  {
    name: "home",
    link: "/",
    icon: AiOutlineHome,
  },
  {
    name: "top",
    link: "/top",
    icon: FaFire,
  },
  {
    name: "movies",
    link: "/movies",
    icon: MdMovie,
  },
  {
    name: "series",
    link: "/series",
    icon: FaFilm,
  },
  {
    name: "favourite",
    link: "/favourite",
    icon: FaHeart,
  },
];

const adminRoute: { name: string; link: string }[] = [
  {
    name: "dashboard",
    link: "/admin/dashboard",
  },
  {
    name: "movies",
    link: "/admin/movies",
  },
  {
    name: "categories",
    link: "/admin/categorieslist",
  },
  {
    name: "users",
    link: "/admin/userslist",
  },
];

const Navigation = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [isDropdown, setIsDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => setIsDropdown(!isDropdown);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logOutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/login");
      setIsDropdown(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className={`z-[999] ${
        showSidebar ? "hidden" : "flex"
      } lg:flex sm:hidden hide flex-col justify-between p-2 text-white bg-black w-[3.9%] hover:w-[15%] h-svh fixed transition-[width] duration-300 ease-in-out group overflow-hidden`}
    >
      <div className="flex flex-col justify-center">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              to={link.link}
              className="flex items-center transition-transform transform hover:translate-x-2 hover:text-red-500"
            >
              <Icon className="mr-2 mt-12" size={26} />
              <span className="hide group-hover:block transition-opacity duration-200 ease-in-out mt-12 uppercase font-semibold">
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white line-clamp-1 capitalize">
              {userInfo.username}
            </span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 aspect-square ml-1 ${
                isDropdown ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {isDropdown && userInfo && (
          <ul
            className={`absolute -right-14 mt-2 mr-14 space-y-1 rounded-md bg-slate-950 overflow-hidden ${
              userInfo.isAdmin ? "-top-64" : "-top-[4.5rem]"
            }`}
          >
            {userInfo.isAdmin &&
              adminRoute.map((route) => (
                <li key={route.name}>
                  <Link
                    to={route.link}
                    onClick={() => setIsDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-slate-950 capitalize w-full"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}

            <li>
              <Link
                to="/profile"
                onClick={() => setIsDropdown(false)}
                className="block px-4 py-2 hover:bg-gray-100 hover:text-slate-950 capitalize"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logOutHandler}
                className="block px-4 py-2 hover:bg-red-500 capitalize w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <menu>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-12" size={26} />
              <span className="hide group-hover:block transition-opacity duration-200 ease-in-out mt-12 font-semibold">
                Login
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-12" size={26} />
              <span className="hide group-hover:block transition-opacity duration-200 ease-in-out mt-12 font-semibold">
                Register
              </span>
            </Link>
          </li>
        </menu>
      )}
    </nav>
  );
};

export default Navigation;

import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/User/Profile";
import AdminRoute from "./pages/Admin/AdminRoute";
import UsersList from "./pages/Admin/UsersList";
import CategoriesList from "./pages/Admin/CategoriesList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="userslist" element={<UsersList />} />
          <Route path="categorieslist" element={<CategoriesList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

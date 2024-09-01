import Layout from "@/pages/Layout";
import { Login } from "@/pages/Login";
import Signup from "@/pages/Signup";
import { Route, Routes } from "react-router";
import { ProtectedRoute, PublicRoute } from "./RouterGuard";
import PageNotFound from "@/pages/PageNotFound";
import Dashboard from "@/pages/admin/Dashboard";
import Products from "@/pages/Products";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="products/:productId" element={<div>Single Product</div>} />
        {/* <Route element={<ProtectedRoute requiredRole="user" />}></Route> */}
        <Route element={<PublicRoute />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Admin Routes */}
        <Route path="admin/">
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="login" element={<Login isAdmin={true} />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRouter;

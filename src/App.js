import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";

import theme from "./theme";

// Website Layout & Pages
import WebsiteLayout from "./layouts/website/Layout";
import Home from "./pages/website/home/Home";

// Admin Layout & Utilities
import AdminLayout from "./layouts/admin/Layout";
import PrivateRoute from "./utils/PrivateRoute";

// Lazy-loaded Admin Pages for better performance
const Dashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const Authors = lazy(() => import("./pages/admin/authors/List"));
const AddAuthor = lazy(() => import("./pages/admin/authors/AddAuthor"));
const EditAuthor = lazy(() => import("./pages/admin/authors/EditAuthor"));
const Categories = lazy(() => import("./pages/admin/categories/Categories"));
const AddCategory = lazy(() => import("./pages/admin/categories/AddCategory"));
const Login = lazy(() => import("./pages/admin/auth/Login"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}><CircularProgress /></div>}>
          <Routes>
            {/* Website Routes */}
            <Route path="/" element={<WebsiteLayout />}>
              <Route index element={<Home />} />
            </Route>

            {/* Admin Login */}
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="authors" element={<Authors />} />
              <Route path="author/add" element={<AddAuthor />} />
              <Route path="author/edit/:id" element={<EditAuthor />} />
              <Route path="category" element={<Categories />} />
              <Route path="category/add" element={<AddCategory />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

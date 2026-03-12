import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

import MainLayout from "../../shared/components/layout/MainLayout"
import AdminLayout from "../../shared/components/layout/AdminLayout"
import EditProductPage from "../../features/admin/pages/EditProductPage"

const HomePage = lazy(() => import("../../shared/home/pages/HomePage"))
const AboutPage = lazy(() => import("../../features/about/pages/AboutPage"))
const ProductsPage = lazy(() => import("../../features/products/pages/ProductsPage"))
const ProductDetailsPage = lazy(() => import("../../features/products/pages/ProductDetailsPage"))
const ContactPage = lazy(() => import("../../features/contact/pages/ContactPage"))
const CartPage = lazy(() => import("../../features/cart/pages/CartPage"))
const LoginPage = lazy(() => import("../../features/auth/pages/LoginPage"))
const SignupPage = lazy(() => import("../../features/auth/pages/SignupPage"))

// Admin Pages
const DashboardPage = lazy(() => import("../../features/admin/pages/DashboardPage"))
const ProductsManagement = lazy(() => import("../../features/admin/pages/ProductsManagement"))
const AddProductPage = lazy(() => import("../../features/admin/pages/AddProductPage"))
const OrdersPage = lazy(() => import("../../features/admin/pages/OrdersPage"))
// const OverviewPage = lazy(() => import("../../features/admin/pages/OverviewPage"))
const UsersPage = lazy(() => import("../../features/admin/pages/UsersPage"))
const SettingsPage = lazy(() => import("../../features/admin/pages/SettingsPage"))

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#25492D] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Loading...</p>
          </div>
        </div>
      }
    >
      <Routes>
        {/* Public Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/dashboard/overview" element={<DashboardPage />} /> {/* Redirect Overview to DashboardPage for now since we merged functionality */}
          <Route path="/admin/dashboard/products" element={<ProductsManagement />} />
          <Route path="/admin/dashboard/products/:id" element={<EditProductPage />} />
          <Route path="/admin/dashboard/products/add" element={<AddProductPage />} />
          <Route path="/admin/dashboard/orders" element={<OrdersPage />} />
          <Route path="/admin/dashboard/users" element={<UsersPage />} />
          <Route path="/admin/dashboard/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRouter

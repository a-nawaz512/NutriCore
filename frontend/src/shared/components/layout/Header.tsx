import { useState, type FC } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import Button from "../ui/Button"
import Badge from "../ui/Badge"
import { useAuthStore } from "../../../app/store/auth.store"

const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // const user = useAuthStore((state) => state);

  // console.log("user", user);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ]

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#25492D] tracking-tight">
          NutriCore
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)
                ? "bg-[#25492D] text-white"
                : "text-gray-700 hover:bg-green-50 hover:text-[#25492D]"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Link to="/cart" className="relative flex items-center p-2 rounded-lg hover:bg-green-50 transition-colors">
            <ShoppingCart size={22} className="text-gray-700 hover:text-[#25492D] transition-colors" />
            <Badge color="green" className="absolute -top-1 -right-1 text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full p-0">
              2
            </Badge>
          </Link>

          {user ? (
            <>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 text-gray-700"
              >
                <User size={18} />
                {user.name}
              </Link>

              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>

              <Link to="/signup">
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        {/* Mobile: Cart + Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <Link to="/cart" className="relative flex items-center p-1">
            <ShoppingCart size={22} className="text-gray-700" />
            <Badge color="green" className="absolute -top-1 -right-1 text-xs min-w-[16px] h-[16px] flex items-center justify-center rounded-full p-0">
              2
            </Badge>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                  ? "bg-[#25492D] text-white"
                  : "text-gray-700 hover:bg-green-50 hover:text-[#25492D]"
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3 px-4 pb-4">
            {user ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <User size={16} className="mr-1" />
                    {user.name}
                  </Button>
                </Link>

                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    <User size={16} className="mr-1" />
                    Login
                  </Button>
                </Link>

                <Link to="/signup" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header

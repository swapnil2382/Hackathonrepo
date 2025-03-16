import { User, Menu, X } from "lucide-react"; // Importing the User icon
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload(); // Reload to reflect logout
  };

  const menuLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
    { label: "About", href: "#about" },
    { label: "Investments", href: "/investments" },
    { label: "Stocks", href: "/stocks" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="text-2xl font-extrabold text-indigo-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Investment<span className="text-gray-800">Portal</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-black font-semibold !no-underline hover:text-indigo-600 transition"
              >
                {link.label}
              </a>
            ))}

            {user ? (
              <div className="flex items-center space-x-3">
                <span
                  onClick={() => navigate("/profile")}
                  className="text-gray-800 font-semibold cursor-pointer hover:text-indigo-600 transition flex items-center gap-1"
                >
                  <User size={18} className="text-indigo-600" /> {/* Icon added here */}
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="text-blue font-semibold !no-underline border border-red px-4 py-1.5 rounded hover:bg-gray-200 hover:text-white transition duration-200"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-inner px-6 pt-4 pb-6 space-y-4"
          >
            {menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-gray-700 font-medium hover:text-indigo-600 transition duration-200"
              >
                {link.label}
              </a>
            ))}

            {user ? (
              <>
                <span
                  onClick={() => navigate("/profile")}
                  className="block text-gray-800 font-medium cursor-pointer hover:text-indigo-600 transition duration-200 flex items-center gap-1"
                >
                  <User size={18} className="text-indigo-600" />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="block text-left w-full text-red-500 hover:text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="block text-indigo-600 font-medium hover:underline"
              >
                Login
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

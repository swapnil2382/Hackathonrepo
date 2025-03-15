import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = (event) => {
    event.preventDefault(); // Prevent default behavior

    console.log("Logging out...");

    // Remove token from localStorage
    localStorage.removeItem("token");

    // Reset user state
    setUser(null);

    console.log("User logged out");

    // Force a page reload to update the UI
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-lg top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-indigo-600">Investment-Portal</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-indigo-600 transition">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition">
              About
            </a>
            <a href="/services" className="text-gray-600 hover:text-indigo-600 transition">
              Services
            </a>
            <a href="/contact" className="text-gray-600 hover:text-indigo-600 transition">
              Contact
            </a>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-800">{user.name}</span>
                <span className="text-2xl">👤</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a href="/login" className="text-gray-600 hover:text-indigo-600 transition">
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-600">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md rounded-lg p-4 space-y-2"
          >
            <a href="#" className="block text-gray-600 hover:text-indigo-600">
              Home
            </a>
            <a href="#" className="block text-gray-600 hover:text-indigo-600">
              About
            </a>
            <a href="#" className="block text-gray-600 hover:text-indigo-600">
              Services
            </a>
            <a href="#" className="block text-gray-600 hover:text-indigo-600">
              Contact
            </a>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            ) : (
              <a href="/login" className="block text-gray-600 hover:text-indigo-600">
                Login
              </a>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
}

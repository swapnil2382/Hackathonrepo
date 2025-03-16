import { User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change navbar when scrolled past 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload(); // Reload to reflect logout
  };

  const menuLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/#services" },
    { label: "Contact", path: "/#contact" },
    { label: "About", path: "/#about" },
    { label: "Investments", path: "/investments" },
    { label: "Stocks", path: "/stocks" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-200/70 backdrop-blur-lg shadow-md"
          : "bg-gray-100/90 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="text-2xl font-extrabold text-indigo-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Investment<span className="text-black">Portal</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuLinks.map((link) => (
              <span
                key={link.label}
                onClick={() => navigate(link.path)}
                className="text-black font-semibold cursor-pointer hover:text-gray-800 transition"
              >
                {link.label}
              </span>
            ))}

            {user ? (
              <div className="flex items-center space-x-3">
                <span
                  onClick={() => navigate("/profile")}
                  className="text-black font-semibold cursor-pointer hover:text-indigo-600 transition flex items-center gap-1"
                >
                  <User size={18} className="text-indigo-600" />
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
              <button
                onClick={() => navigate("/login")}
                className="border border-black px-4 py-1.5 rounded hover:bg-gray-300 transition duration-200 text-black"
              >
                Login
              </button>
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
            className="md:hidden bg-gray-100/80 backdrop-blur-lg shadow-inner px-6 pt-4 pb-6 space-y-4"
          >
            {menuLinks.map((link) => (
              <span
                key={link.label}
                onClick={() => {
                  navigate(link.path);
                  setIsOpen(false);
                }}
                className="block text-black font-medium cursor-pointer hover:text-gray-800 transition duration-200"
              >
                {link.label}
              </span>
            ))}

            {user ? (
              <>
                <span
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
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
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="block text-black font-medium hover:text-gray-800 transition duration-200"
              >
                Login
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

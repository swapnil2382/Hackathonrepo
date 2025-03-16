const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4 mt-auto w-full">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="/dashboard" className="hover:text-yellow-400">Dashboard</a></li>
            <li><a href="/investments" className="hover:text-yellow-400">Investments</a></li>
            <li><a href="/portfolio" className="hover:text-yellow-400">Portfolio</a></li>
            <li><a href="/contact" className="hover:text-yellow-400">Contact Us</a></li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold">Investment Tip</h2>
          <p className="mt-2 text-yellow-400 italic">"Invest for the long term!"</p>
        </div>

        <div className="text-right">
          <h2 className="text-lg font-semibold">Connect With Us</h2>
          <div className="mt-2 flex justify-end space-x-4">
            <a href="#" className="hover:text-yellow-400">Twitter</a>
            <a href="#" className="hover:text-yellow-400">LinkedIn</a>
            <a href="#" className="hover:text-yellow-400">Facebook</a>
          </div>
          <p className="mt-2 text-yellow-400">support@investportal.com</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-yellow-400 mt-6 pt-4 text-center">
        <p>&copy; {new Date().getFullYear()} InvestPortal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

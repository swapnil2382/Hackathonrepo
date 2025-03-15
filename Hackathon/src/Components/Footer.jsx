import { useState, useEffect } from "react";

const investmentTips = [
  "Diversify your portfolio to minimize risk.",
  "Long-term investments often yield better returns.",
  "Keep an emergency fund before investing aggressively.",
  "Monitor market trends but avoid emotional trading.",
  "Reinvest your dividends for compound growth.",
];

const Footer = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTip(investmentTips[Math.floor(Math.random() * investmentTips.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-6 px-4 ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/dashboard" >
                Dashboard
              </a>
            </li>
            <li>
              <a href="/investments" >
                Investments
              </a>
            </li>
            <li>
              <a href="/portfolio" >
                Portfolio
              </a>
            </li>
            <li>
              <a href="/contact" >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold">Investment Tip</h2>
          <p className="mt-2 text-yellow-400 italic">{tip}</p>
        </div>

        <div className="text-right">
          <h2 className="text-lg font-semibold ">Connect With Us</h2>
          <div className="mt-2 flex justify-end space-x-4">
            <a href="#" >
              Twitter
            </a>
            <a href="#" >
              LinkedIn
            </a>
            <a href="#" >
              Facebook
            </a>
          </div>
          <p className="mt-2 text-yellow-400">support@investportal.com</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-yellow-400 mt-6 pt-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} InvestPortal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

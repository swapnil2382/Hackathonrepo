import React from "react";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaBalanceScale,
  FaShieldAlt,
} from "react-icons/fa";
const About = () => {
  const features = [
    {
      title: "Smart Investment Suggestions",
      icon: <FaChartLine className="text-5xl text-blue-500" />,
      description:
        "Get AI-driven recommendations tailored to your risk profile and market trends.",
    },
    {
      title: "Profit Estimation Tools",
      icon: <FaMoneyBillWave className="text-5xl text-green-500" />,
      description:
        "Analyze potential returns before making an investment decision.",
    },
    {
      title: "Buy & Sell Assets",
      icon: <FaBalanceScale className="text-5xl text-yellow-500" />,
      description:
        "Trade stocks, bonds, and insurance policies effortlessly in real-time.",
    },
    {
      title: "Real-Time Account Management",
      icon: <FaShieldAlt className="text-5xl text-red-500" />,
      description:
        "Track your portfolio performance, balances, and transaction history securely.",
    },
  ];

  return (
    <div id="about" className="bg-white text-black min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <h2 className="text-4xl font-bold mb-8 text-center">
        About Our Investment Portal
      </h2>
      <p className="max-w-2xl text-center text-black mb-10">
        A smart, AI-powered investment platform designed to help you grow your
        wealth efficiently.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="group perspective">
            <div className="relative w-64 h-64 text-center transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
              <div className="absolute w-full h-full bg-blue-800rounded-lg flex flex-col items-center justify-center shadow-xl p-5 backface-hidden">
                {feature.icon}
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              </div>

              <div className="absolute w-full h-full bg-blue-500 text-white rounded-lg flex items-center justify-center shadow-xl p-5 rotate-y-180 backface-hidden">
                <p>{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

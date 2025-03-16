import React from "react";
import { ArrowRight, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/Home.css";
import Contact from "./Contact";
import Services from "./Services";
import About from "./About";

export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://media.istockphoto.com/id/1470066185/photo/mutual-fund-or-systematic-investment-plan-concept-putting-coin-on-coin-stack.jpg?s=612x612&w=0&k=20&c=pyc0fmFNupQ_OKpjNj8qSVpRhRa0ir9lqmB5TpA25gc=)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="relative z-20 container mx-auto px-4 py-32 md:py-48"
          >
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Your Digital Financial Presence
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                We create innovative investment solutions that help businesses
                grow, engage customers, and achieve their financial goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/sugges"
                  className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-medium transition !no-underline"
                >
                  Investment Solutions <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/calculator"
                  className="inline-flex items-center px-8 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 rounded-full text-lg font-medium transition !no-underline"
                >
                  Investment Calculator
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="bg-slate-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Why Choose Our Investment Platform
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our platform offers comprehensive tools and insights to help you
                make informed investment decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
                  title: "Smart Portfolio Management",
                  description:
                    "Advanced tools to track, analyze, and optimize your investment portfolio for maximum returns.",
                },
                {
                  icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
                  title: "Real-time Market Analysis",
                  description:
                    "Stay informed with real-time market data, trends, and expert insights to make timely decisions.",
                },
                {
                  icon: <PieChart className="h-6 w-6 text-blue-600" />,
                  title: "Diversification Strategies",
                  description:
                    "Custom diversification recommendations based on your risk profile and financial goals.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: false }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition"
                >
                  <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="bg-slate-900 text-white py-16"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of investors who have already transformed their
              financial future with our platform.
            </p>
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Link
                to="/register"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-medium transition"
              >
                Get Started Today
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Additional Sections */}
      <About />
      <Contact />
    </>
  );
}

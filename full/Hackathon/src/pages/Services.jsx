import React from "react";
import { motion } from "framer-motion";
import Pricing from "../Components/Pricing";
import Work from "../Components/Work";

function Services() {
  return (
    <div id="services" className="main flex flex-col items-center">
      {/* Title Animation */}
      <motion.div
        className="title"
        style={{
          textAlign: "center",
          marginTop: "90px",
          background: "gray-100",
        }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <h1 className="text-3xl font-bold">Our Services..</h1>
      </motion.div>

      {/* Pricing Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full"
      >
        <Pricing />
      </motion.div>

      {/* Work Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full"
      >
        <Work />
      </motion.div>
    </div>
  );
}

export default Services;

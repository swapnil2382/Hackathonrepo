import { motion } from "framer-motion";

const Work = () => {
  const steps = [
    {
      id: 1,
      title: "Discovery",
      description:
        "We begin by understanding your business, goals, and requirements through in-depth consultation.",
    },
    {
      id: 2,
      title: "Planning",
      description:
        "We develop a strategic plan and roadmap tailored to your specific needs and objectives.",
    },
    {
      id: 3,
      title: "Execution",
      description:
        "Our team implements the plan, keeping you informed and involved throughout the process.",
    },
    {
      id: 4,
      title: "Delivery",
      description:
        "We deliver the final product, provide training, and ensure everything meets your expectations.",
    },
  ];

  return (
    <motion.div
      className="flex flex-col items-center bg-gray-100 py-10 px-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <motion.span
        className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-full"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
      >
        Our Process
      </motion.span>

      <motion.h2
        className="text-3xl font-bold my-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false }}
      >
        How We Work
      </motion.h2>

      <motion.p
        className="text-gray-600 text-center max-w-2xl mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: false }}
      >
        Our streamlined process ensures efficient delivery of high-quality
        results that meet your specific needs.
      </motion.p>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl w-full">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="w-10 h-10 mx-auto flex items-center justify-center bg-blue-500 text-white font-bold rounded-full text-lg">
              {step.id}
            </div>
            <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
            <p className="text-gray-500 mt-2">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Work;

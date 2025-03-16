import { motion } from "framer-motion";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$999/month",
      description: "Ideal for small businesses and startups",
      features: [
        "Access to real-time stock prices",
        "Basic portfolio tracking",
        "Secure account management",
        "Up to 5 stock transactions per month",
        "Email notifications for price alerts",
      ],
    },
    {
      name: "Professional",
      price: "$1999/month",
      description: "Ideal for growing businesses",
      features: [
        "Advanced investment analytics",
        "AI-powered stock recommendations",
        "Unlimited stock transactions",
        "Monthly portfolio performance reports",
        "Priority customer support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$3999/month",
      description: "Comprehensive solution for large organizations",
      features: [
        "Everything in Professional",
        "Automated high-frequency trading",
        "Dedicated financial advisor",
        "Exclusive market insights & reports",
        "API access for automated trading",
        "Secure multi-user account management",
      ],
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
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`bg-white shadow-lg rounded-lg p-6 text-center border-2 ${
              plan.popular ? "border-blue-500" : "border-gray-200"
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-white py-1 px-3 rounded-full text-xs font-bold mb-3 inline-block">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-semibold">{plan.name}</h3>
            <p className="text-gray-500 my-2">{plan.description}</p>
            <p className="text-3xl font-bold text-blue-600">{plan.price}</p>
            <ul className="text-gray-600 my-4 text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 py-1">
                  ✅ {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Pricing;

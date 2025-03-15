const Pricing = () => {
    const plans = [
      {
        name: "Basic",
        price: "$999/month",
        description: "Ideal for small businesses and startups",
        features: [
          "Website Design & Development",
          "Basic SEO Optimization",
          "Mobile Responsive Design",
          "Content Management System",
          "5 Pages Included",
          "3 Months Support"
        ],
        buttonText: "Get Started",
      },
      {
        name: "Professional",
        price: "$1999/month",
        description: "Ideal for growing businesses",
        features: [
          "Everything in Basic",
          "E-commerce Functionality",
          "Advanced SEO Strategy",
          "Social Media Integration",
          "10 Pages Included",
          "6 Months Support",
          "Performance Analytics"
        ],
        buttonText: "Get Started",
        popular: true
      },
      {
        name: "Enterprise",
        price: "$3999/month",
        description: "Comprehensive solution for large organizations",
        features: [
          "Everything in Professional",
          "Custom Web Application",
          "API Development & Integration",
          "Advanced Security Features",
          "Unlimited Pages",
          "12 Months Support",
          "Dedicated Account Manager"
        ],
        buttonText: "Get Started",
      }
    ];
  
    return (
      <div className="flex flex-col items-center bg-gray-100 py-10 px-5">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white shadow-lg rounded-lg p-6 text-center border-2 ${plan.popular ? 'border-blue-500' : 'border-gray-200'}`}
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
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Pricing;
  
import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your form is submitted successfully, " + name + "!");
  };

  return (
    <motion.div
      id="contact"
      className="contact w-100 px-5 mb-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div id="contact" className="contact w-100 px-5 mb-5 ">
          <div>
            <h2 style={{ fontSize: "45px" }} className="ms-160">
              Contact Us
            </h2>
            <p className="ms-170">How can I help you</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="main flex">
        {/* Contact Form */}
        <motion.div
          style={{ width: "40%", border: "2px solid black" }}
          className="contact-form w-xl ms-48 me-20 p-10 rounded-3xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div id="contact" className="section-padding">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows={4}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Divider Line */}
        <motion.div
          style={{ border: "2px solid black" }}
          className="line"
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        ></motion.div>

        {/* Office Address */}
        <motion.div
          style={{ width: "80%" }}
          className="border3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="ms-20">Office Address</h2>
          <p className="ms-20">
            Saraswati College of Engineering, Kharghar
            <br />
            New Panvel
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.236204432233!2d73.05780733605842!3d19.040152072758282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c23c0d76935f%3A0xdc48e289b198623a!2sSaraswati%20College%20of%20Engineering%2C%20Kharghar!5e1!3m2!1sen!2sin!4v1742065826239!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            className="ml-5"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;

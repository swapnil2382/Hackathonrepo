import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    alert("Your form is submit successfully " + name + "!");
  };

  return (
    <div className='contact w-100 px-5 mb-5 '>
      <div>
        <h2 style={{ fontSize: "45px" }} className='ms-160'>Contact Us</h2>
        <p className='ms-170'>How can I help you</p>
      </div>

      <div className='main flex'>
        <div style={{ width: "40%",border:"2px solid black"}} className='contact-form w-xl ms-48 me-20 p-10 rounded-3xl'>
          <div id="contact" className="section-padding">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
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
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows={4} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div style={{ border: "2px solid black" }} className='line'></div>

        <div style={{ width: "80%" }} className='border3'>
          <h2 className='ms-20'>Office Address</h2>
          <p className='ms-20'>
            Saraswati college of Engineering Kharghar<br />
            New Panvel
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

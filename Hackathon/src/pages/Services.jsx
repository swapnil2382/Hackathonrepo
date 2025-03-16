import React from "react";
import Pricing from "../Components/Pricing";
import Work from "../Components/Work";
function Services() {
  return (
    <div id="services" classname="main flex">
      <div
        classname="title"
        style={{
          textAlign: "center",
          marginTop: "90px",
          background: "+gray-100",
        }}
      >
        <h1>Our Services..</h1>
      </div>
      <Pricing />
      <Work />
    </div>
  );
}

export default Services;

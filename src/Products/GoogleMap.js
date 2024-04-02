import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";

function MyComponent() {
  window.initMap = () => {
    console.log("yeah");
  };
  return (
    <div>
      <Helmet>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=window.initMap&libraries=drawing&v=weekly"
          defer
          type="text/javascript"
        />
      </Helmet>
    </div>
  );
}

export default React.memo(MyComponent);

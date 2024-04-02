import React, { useEffect } from "react";
import css from "./map.module.css";

export const MapDashboard = (props) => {
  const { datas } = props;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCciQMcEJ6gzi5H3NI0zydZU3xkxgG8lQg&libraries=maps,marker&v=weekly&callback=initMap";
    script.async = true;
    // script.defer = true;

    script.addEventListener("load", () => {
      initMap(datas);
    });

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [datas]);

  return <div id="map88" style={{ width: "100%", height: "100%" }}></div>;
};

async function initMap(datas) {
  try {
    const { Map } = await window.google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
    const center = {
      lat: 47.920392,
      lng: 106.917149,
    };
    const map = new Map(document.getElementById("map88"), {
      center: center,
      zoom: 14,
      mapId: "4504f8b37365c3d0",
    });

    datas.map((data) => {
      const priceTag = document.createElement("div");

      if (data.latitude !== 0 && data.longitude !== 0) {
        priceTag.className = `${css.price_tag}`;
        const markerOptions = {
          position: { lat: data.latitude, lng: data.longitude },
          content: priceTag,
          map: map,
        };
        const marker = new AdvancedMarkerElement(map, markerOptions);
      }
    });
  } catch (error) {
    console.log("map error", error);
  }
}



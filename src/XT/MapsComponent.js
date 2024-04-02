import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import locationIcon from "../assets/Location.svg";
import Deleteicon from "../assets/Location_red.svg";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 47.920092,
  lng: 106.917277,
};

const MyComponent = (props) => {
  console.log("props maps ++++++", props);

  const [onedaydata, setOnedaydata] = useState([]);
  const [lastElementdata, setLastElementdata] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState();
  const [allPoints, setAllPoints] = useState([]);

  const [distance, setDistance] = useState("");
  const { isLoaded } = useJsApiLoader({
    id: "direction-example",
    googleMapsApiKey: "AIzaSyAaJmUv5wc-0e8SV2-nUFI1o50kIyVPkvI",
  });

  const [map, setMap] = React.useState(null);
  let totalKM = [];
  let totKM = "";

  useEffect(() => {
    setLastElementdata([]);
    setDirectionsResponse();
    setOnedaydata([]);

    setDistance([]);

    const dateall = [];
    if (props.mapState) {
      setSelectedMarker(null);

      props.marshrutdata.map((item) => {
        if (props.mapState === item.CreatedDate.split(",")[0]) {
          if (item.coordinate[0] !== 0) {
            dateall.push(item);
          }
        }
      });
    }
    setOnedaydata(dateall);
  }, [props]);
  // console.log("oneday data", onedaydata);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const markerOnload = (marker) => {};
  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 10,
  };

  const clickOnloadMarker = (marker) => {
    // console.log("marker onClick: ", marker);
    setSelectedMarker(marker);
  };
  // console.log("selectedMarker", selectedMarker);
  async function calculateRoute(item) {
    let start;
    let end;
    let waypts = [];
    console.log("item", item);
    if (item) {
      item.map((x, index) => {
        if (index === 0) {
          start = {
            lat: x.coordinate[1],
            lng: x.coordinate[0],
          };
        } else if (index === item.length - 1) {
          end = {
            lat: x.coordinate[1],
            lng: x.coordinate[0],
          };
        } else if (index > 0 && index <= item.length - 2) {
          let tseg = {
            lat: x.coordinate[1],
            lng: x.coordinate[0],
          };

          waypts.push({
            location: tseg,
            stopover: false,
          });
        }
      });
    }

    console.log("start", start);
    console.log("end", end);
    console.log("waypts", waypts);
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: start,
      destination: end,
      waypoints: waypts,
      travelMode: "DRIVING",
    });
    console.log("result", results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
  }

  const calculateHandler = (item) => {
    let productID = [];
    let chunkSize = 20;
    let chunks = [];
    let updata;
    if (item.length >= 1) {
      console.log("ajillalaa");
      updata =
        item &&
        item
          .filter((x) => x.coordinate[0] !== 0)
          .sort((a, b) => a.CreatedDate - b.CreatedDate);
      console.log("updata", updata);
      if (updata.length >= 1) {
        for (let i = 0; i < updata.length; i += chunkSize) {
          chunks.push(updata.slice(i, i + chunkSize));
        }
      }
    }
    console.log("updata", updata);
    setAllPoints(updata);

    let start;
    let end;
    let waypts = [];

    if (chunks) {
      chunks.map((item, index) => {
        if (item) {
          item.map((x, index) => {
            if (index === 0) {
              start = {
                lat: x.coordinate[1],
                lng: x.coordinate[0],
              };
            } else if (index === item.length - 1) {
              end = {
                lat: x.coordinate[1],
                lng: x.coordinate[0],
              };
            } else if (index > 0 && index <= item.length - 2) {
              let tseg = {
                lat: x.coordinate[1],
                lng: x.coordinate[0],
              };

              waypts.push({
                location: tseg,
                stopover: false,
              });
            }
          });
          console.log("start", start);
          console.log("end", end);
          console.log("waypts", waypts);
          CalculateDistance(start, end, waypts);
          start = "";
          end = "";
          waypts = [];
        }
      });
    }
  };
  async function CalculateDistance(a, b, c) {
    const directionsService = await new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: a,
        destination: b,
        waypoints: c,
        travelMode: "DRIVING",
      },
      function (result, status) {
        console.log("result", result);
        if (status == "OK") {
          setDirectionsResponse(result);
          totalKM.push(result.routes[0].legs[0].distance.text);

          setDistance(result.routes[0].legs[0].distance.text);
          totKM += Number(result.routes[0].legs[0].distance.text.split(" ")[0]);
        }
      }
    );
  }
  console.log("totalKM", totKM);

  console.log("directionsResponse", directionsResponse);

  return isLoaded ? (
    <div>
      <div
        style={{
          marginLeft: "15px",
        }}
      >
        <div>
          {" "}
          <button
            // onClick={() => calculateRoute(lastElementdata)}
            onClick={() => calculateHandler(props.marshrutdata)}
            style={{
              background: "#ffa600",
              padding: "6px 10px",
              border: "none",
              fontSize: "12px",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "6px",
            }}
          >
            Зам тооцоолох
          </button>{" "}
        </div>
        <div>
          Нийт явсан зам : {distance} {totKM}
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {allPoints &&
          allPoints?.map((item, index) => {
            return (
              <Marker
                onLoad={markerOnload}
                position={{
                  lat: item.coordinate[1],
                  lng: item.coordinate[0],
                }}
                onClick={() => {
                  clickOnloadMarker(item);
                }}
                icon={
                  onedaydata.length === index + 1 ? Deleteicon : locationIcon
                }
              ></Marker>
            );
          })}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.coordinate[1],
              lng: selectedMarker.coordinate[0],
            }}
          >
            <div style={divStyle}>
              <span>{selectedMarker?.user}</span>
              <span>{selectedMarker?.msg}</span>
              <span>{selectedMarker?.CreatedDate}</span>
            </div>
          </InfoWindow>
        )}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(MyComponent);

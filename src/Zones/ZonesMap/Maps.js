import React, { useEffect, useRef, useState, useContext } from "react";
import ZonesHook from "../../Hooks/ZonesHook";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import myHeaders from "../../components/MyHeader/myHeader";

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MyMapComponent({
  center,
  zoom,
  onPolygon,
  coords,
  coordinates,
  merhchants,
  supplier,
}) {
  const ref = useRef();
  // console.log("coordinates", coordinates);
  let businessTypes = [
    {
      business_type_id: 1,
      business_type_name: "8 нэрийн дэлгүүр",
      channel_id: 1,
      channel_name: "Хүнсний дэлгүүр",
    },
    {
      business_type_id: 2,
      business_type_name: "6 нэрийн дэлгүүр",
      channel_id: 1,
      channel_name: "Хүнсний дэлгүүр",
    },
    {
      business_type_id: 3,
      business_type_name: "ТҮЦ",
      channel_id: 1,
      channel_name: "Хүнсний дэлгүүр",
    },
    {
      business_type_id: 4,
      business_type_name: "Лангуу, Павильон",
      channel_id: 2,
      channel_name: "Зах бөөний төв",
    },
    {
      business_type_id: 5,
      business_type_name: "Бөөний төв",
      channel_id: 2,
      channel_name: "Зах бөөний төв",
    },
    {
      business_type_id: 6,
      business_type_name: "Ресторан",
      channel_id: 3,
      channel_name: "ХоРеКа",
    },
    {
      business_type_id: 7,
      business_type_name: "Цайны газар",
      channel_id: 3,
      channel_name: "ХоРеКа",
    },
    {
      business_type_id: 8,
      business_type_name: "Зоогийн газар",
      channel_id: 3,
      channel_name: "ХоРеКа",
    },
    {
      business_type_id: 9,
      business_type_name: "Олон үндэстний хоол",
      channel_id: 3,
      channel_name: "ХоРеКа",
    },
    {
      business_type_id: 10,
      business_type_name: "Кафе, Кофе шоп",
      channel_id: 3,
      channel_name: "ХоРеКа",
    },
    {
      business_type_id: 11,
      business_type_name: "Паб, Лаунж",
      channel_id: 3,
      channel_name: "ХоРеКа",
    },
    {
      business_type_id: 12,
      business_type_name: "Караоке",
      channel_id: 3,
      channel_name: "ХоРеКа",
    },
    {
      business_type_id: 13,
      business_type_name: "Зочид буудал",
      channel_id: 3,
      channel_name: "ХоРеКа",
    },
    {
      business_type_id: 14,
      business_type_name: "Бар",
      channel_id: 3,
      channel_name: "ХоРеКа",
    },
    {
      business_type_id: 15,
      business_type_name: "Үсчин, гоо сайхан",
      channel_id: 4,
      channel_name: "Албан Байгууллага",
    },
    {
      business_type_id: 16,
      business_type_name: "Цэцэрлэг",
      channel_id: 4,
      channel_name: "Албан Байгууллага",
    },
    {
      business_type_id: 17,
      business_type_name: "Сургууль",
      channel_id: 4,
      channel_name: "Албан Байгууллага",
    },
    {
      business_type_id: 18,
      business_type_name: "Фитнес",
      channel_id: 4,
      channel_name: "Албан Байгууллага",
    },
    {
      business_type_id: 19,
      business_type_name: "Эмнэлэг",
      channel_id: 4,
      channel_name: "Албан Байгууллага",
    },
    {
      business_type_id: 20,
      business_type_name: "Үйлдвэр",
      channel_id: 4,
      channel_name: "Албан Байгууллага",
    },
    {
      business_type_id: 22,
      business_type_name: "Оффис",
      channel_id: 4,
      channel_name: "Албан Байгууллага",
    },
    {
      business_type_id: 21,
      business_type_name: "Эмийн сан",
      channel_id: 5,
      channel_name: "Эмийн Сан",
    },
  ];

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    const infoWindow = new window.google.maps.InfoWindow();
    console.log("item map merchant", merhchants);
    merhchants?.map((item) => {
      let busname = "hi";
      console.log(
        "item coordinates",
        item[`${supplier}`].tradeshops[0].address.coordinate[0]
      );

      if (item[`${supplier}`].tradeshops[0].channel) {
        businessTypes?.map((x) => {
          if (
            Number(x.channel_id) ===
            Number(item[`${supplier}`].tradeshops[0].channel)
          ) {
            busname = x.channel_name;
          }
        });
      }
      const marker = new window.google.maps.Marker({
        position: {
          lat: item[`${supplier}`]?.tradeshops[0].address.coordinate[1],
          lng: item[`${supplier}`]?.tradeshops[0].address.coordinate[0],
        },
        title: item[`${supplier}`]?.tradeshops[0].name,
        map,
      });

      marker.addListener("mouseover", () => {
        // infoWindow.setContent(`${item.u_las_name}-${busname}`);
        infoWindow.setContent(`<div style={{
          display:"flex",
          flexDirection:"column"
        }}>
        <div style={{
          display:"flex"
        }}><span style={{
          fontWeight:"700"
        }}>Хэрэглэгчийн нэр : </span>
        <span>${item[`${supplier}`].tradeshops[0].name}</span></div>
        <div style={{
          display:"flex"
        }}><span style={{
          fontWeight:"700"
        }}>Бизнесийн төрөл : </span>
        <span>${busname}</span></div>    
        </div>`);
        infoWindow.open(marker.getMap(), marker);
      });

      return marker;
    });

    var drawingManager = new window.google.maps.drawing.DrawingManager({
      // drawingMode: window.google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      editable: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
      },

      polygonOptions: {
        editable: true,

        // fillColor: "red",
        strokeColor: "#ffa400",
      },
    });
    drawingManager.setMap(map);

    window.google.maps.event.addListener(
      drawingManager,
      "overlaycomplete",
      function (event) {
        const polygonCoordinates = event?.overlay?.latLngs
          ?.getArray()
          .map((it) =>
            it
              .getArray()
              .map((point) => [
                Number(parseFloat(point.toJSON().lng).toFixed(7)),
                Number(parseFloat(point.toJSON().lat).toFixed(7)),
              ])
          );
        onPolygon(polygonCoordinates);
        // console.log(polygonCoordinates);
        window.google.maps.event.addListener(rectangle, "click", function () {
          window.google.maps.event.addListener(
            rectangle.getPath(),
            "set_at",
            function () {
              console.log("test++++++++");
            }
          );

          window.google.maps.event.addListener(
            rectangle.getPath(),
            "insert_at",
            function () {
              console.log("test-aaaaaaaaa");
            }
          );
          // setSelection(newShape);
        });
      }
    );

    window.google.maps.event.addListener(
      drawingManager,
      "click",
      function (event) {
        console.log("event", event);
      }
    );

    // const initialPolygon = [...coordinates];

    const rectangle = new window.google.maps.Polygon({
      editable: true,
      // draggable: true,
      // paths: initialPolygon.length > 0 ? initialPolygon : null,
      strokeColor: "#ffa400",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      // fillColor: "#ffa400",
      fillOpacity: 0.35,
    });

    rectangle.setMap(map);

    // listen to changes
    ["bounds_changed", "dragstart", "drag", "dragend", "click"].forEach(
      (eventName) => {
        rectangle.addListener(eventName, () => {
          console.log({ bounds: rectangle.getBounds()?.toJSON(), eventName });
        });
      }
    );

    window.google.maps.event.addListener(
      rectangle.getPath(),
      "insert_at",
      function () {
        console.log("hehehe");
      }
    );

    window.google.maps.event.addListener(rectangle, "click", function () {
      window.google.maps.event.addListener(
        rectangle.getPath(),
        "set_at",
        function () {
          console.log("test----");
        }
      );

      window.google.maps.event.addListener(
        rectangle.getPath(),
        "insert_at",
        function () {
          console.log("test");
        }
      );
      // setSelection(newShape);
    });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        right: "0px",
        width: "100%",
        height: "100vh",
        padding: "0px",
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "100%",
          background: "#fff",
          position: "absolute",
        }}
        ref={ref}
        id="map"
      />
    </div>
  );
}

export default function Maps(props) {
  const center = { lat: 47.918743, lng: 106.917562 };
  const zoom = 14;
  const [coords, setCoords] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  const [merhchants, setMerchants] = useState(props.merchantdata);
  const zonectx = useContext(ZonesHook);
  console.log(
    "data+++14234",
    props.data.data.userData.company_id.replaceAll("|", "")
  );

  //   console.log("c=>", coords);
  useEffect(() => {
    zonectx.setCoords(coords);
  }, [coords]);

  return (
    <div style={{ width: "100vh", height: "100vh" }}>
      <Wrapper
        libraries={["drawing"]}
        apiKey={process.env.GOOGLE_MAP_KEY}
        render={render}
      >
        <MyMapComponent
          onPolygon={(polygonCoordinates) => {
            setCoords((prev) => prev.concat(polygonCoordinates));
          }}
          coordinates={coordinates}
          center={center}
          zoom={zoom}
          merhchants={merhchants}
          supplier={
            props.data.data.userData.company_id === "|1|"
              ? 13884
              : props.data.data.userData.company_id.replaceAll("|", "")
          }
        />
      </Wrapper>
    </div>
  );
}

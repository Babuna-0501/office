import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Polygon,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import ZonesHook from "../../Hooks/ZonesHook";
import myHeaders from "../../components/MyHeader/myHeader";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function MyComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_KEY,
  });
  const zonectx = useContext(ZonesHook);
  const [map, setMap] = React.useState(null);
  const [path, setPath] = useState();
  const [center, setCenter] = useState({});
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [channelname, setChannelname] = useState([]);
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  // console.log("-------------------props.data+++++", props.data.company_id);
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

  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);
  const onLoadTwo = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );
  const onUnmountTwo = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  // console.log("The path state is", path);

  const GetData = () => {
    var requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };
    // let urlOld = `https://api2.ebazaar.mn/api/zones?supplier=${props?.supplier}&id=${zonectx?.updateID}`;
    let urlNew = `https://api2.ebazaar.mn/api/zones?&id=${zonectx?.updateID}`;
    fetch(urlNew, requestOptions)
      .then((r) => r.json())
      .then((res) => {
        let arrMain = [];
        // console.log("res", res.data);
        res.data.map((item) => {
          props.setName(item.name);
          props.setPriority(item.priority);
          props.setSupplierid(item.supplier);
        });
        const [{ _id, ...data }] = res.data;
        // console.log("data", data);
        props.setUpdateData(data);
        let cenx = [];
        let ceny = [];
        res.data.map((item) => {
          item.polygons.coordinates.map((x) => {
            let arr = [];

            x.map((t) => {
              arr.push({
                lat: t[1],
                lng: t[0],
              });
              cenx.push(t[1]);
              ceny.push(t[0]);
            });
            arrMain.push(arr);
          });
        });

        let averagex = cenx.reduce((a, b) => a + b, 0) / cenx.length;
        let averagey = ceny.reduce((a, b) => a + b, 0) / ceny.length;
        setCenter({
          lat: parseFloat(averagex),
          lng: parseFloat(averagey),
        });

        setPath(...arrMain);
      });
  };
  useEffect(() => {
    try {
      GetData();
    } catch (error) {
      console.log("error fetch maps data", error);
    }
  }, []);
  useEffect(() => {
    zonectx.setCoords(path);
  }, [path]);
  const options = {
    fillColor: "#00000066",
    strokeColor: "#ffa600",
  };

  const onLoad = (marker) => {
    // console.log("marker: ", marker);
  };

  const divStyle = {
    background: `white`,
    padding: 5,
  };
  console.log("setSelectedMarker", selectedMarker);
  useEffect(() => {
    let data = [];
    if (selectedMarker) {
      businessTypes.map((x) => {
        if (
          x.channel_id ==
          selectedMarker[
            `${
              props.data.company_id === "|1|"
                ? 13884
                : props.data.company_id.replaceAll("|", "")
            }`
          ].tradeshops[0].channel
        ) {
          // console.log("aa", x);
          data.push(x.channel_name);
        }
      });
    }
    setChannelname(data);
  }, [selectedMarker]);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      //   onLoad={onLoad}
      //   onUnmount={onUnmount}
      version="weekly"
    >
      <Polygon
        editable
        // draggable
        path={path}
        // Event used when manipulating and adding points
        onMouseUp={onEdit}
        // Event used when dragging the whole Polygon
        // onDragEnd={onEdit}
        onLoad={onLoadTwo}
        onUnmount={onUnmountTwo}
        options={options}
      />
      {/* position: { lat: item.g_latitude, lng: item.g_longtitude },
        title: item.u_las_name ? `${item.u_las_name}` : `${item.c_name}`, */}
      {props.merchantsinfo?.map((item, index) => {
        let supplier =
          props.data.company_id === "|1|"
            ? 13884
            : props.data.company_id.replaceAll("|", "");
        let position = {
          lat: item[`${supplier}`].tradeshops[0].address.coordinate[1],
          lng: item[`${supplier}`].tradeshops[0].address.coordinate[0],
        };
        return (
          <Marker
            onLoad={onLoad}
            position={position}
            onClick={() => {
              setSelectedMarker(item);
            }}
          ></Marker>
        );
      })}

      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker[
              `${
                props.data.company_id === "|1|"
                  ? 13884
                  : props.data.company_id.replaceAll("|", "")
              }`
            ].tradeshops[0].address.coordinate[1],
            lng: selectedMarker[
              `${
                props.data.company_id === "|1|"
                  ? 13884
                  : props.data.company_id.replaceAll("|", "")
              }`
            ].tradeshops[0].address.coordinate[0],
          }}
        >
          <div style={divStyle}>
            <div>
              {" "}
              <span style={{ fontWeight: "700" }}>Хэрэглэгчийн нэр :</span>
              <span>
                {selectedMarker
                  ? selectedMarker[
                      `${
                        props.data.company_id === "|1|"
                          ? 13884
                          : props.data.company_id.replaceAll("|", "")
                      }`
                    ].tradeshops[0].name
                  : selectedMarker[
                      `${
                        props.data.company_id === "|1|"
                          ? 13884
                          : props.data.company_id.replaceAll("|", "")
                      }`
                    ].customer_name}
              </span>
            </div>
            <div>
              {" "}
              <span style={{ fontWeight: "700" }}>Бизнесийн төрөл :</span>
              <span>{channelname ? channelname[0] : ""}</span>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

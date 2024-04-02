import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { GoogleMap, useJsApiLoader, Polygon } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function MyComponent(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBG-O-vGiMoFkgA80anIDQCl06SDotkOVo",
  });

  const [path, setPath] = useState(null);
  const [center, setCenter] = useState(null);

  const options = {
    fillColor: "#00000066",
    strokeColor: "#ffa600",
  };

  useEffect(() => {
    var result = [];
    let centerX = [];
    let centerY = [];
    props.data.coordinates[0].forEach((item) => {
      result.push({
        lat: Number(item[1]),
        lng: Number(item[0]),
      });
    });
    props.data.coordinates[0].forEach((item) => {
      centerX.push(Number(item[1]));
      centerY.push(Number(item[0]));
    });
    setPath(result);
    const averageX = centerX.reduce((a, b) => a + b, 0) / centerX.length;
    const averageY = centerY.reduce((a, b) => a + b, 0) / centerY.length;
    setCenter([averageX, averageY]);
  }, [props]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: center[0],
        lng: center[1],
      }}
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

        // Event used when dragging the whole Polygon
        // onDragEnd={onEdit}

        options={options}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

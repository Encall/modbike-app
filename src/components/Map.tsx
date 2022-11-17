import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import axios from "axios";
import useGeoLocation from "../hooks/useGeoLocation";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "65ffcf93cf012c75",
      streetViewControl: false,
      mapTypeControl: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const [map, setMap] = useState(null);

  const mapRef = useRef<GoogleMap>();

  const userLocation = useGeoLocation();

  const [markers, setMarkers] =
    useState<
      { node: string; lat: string; lng: string; date: string; time: string }[]
    >();

  useEffect(() => {
    {
      useGeoLocation;
    }
    axios.get("https://iot.encall.space/view.php").then((response) => {
      setMarkers(response.data.markers);
    });
    const interval = setInterval(() => {
      axios.get("https://iot.encall.space/view.php").then((response) => {
        setMarkers(response.data.markers);
      });
      console.log("====================================");
    }, 10000); // 10000ms
    return () => clearInterval(interval);
  }, []);

  return isLoaded ? (
    <div className="h-screen w-screen">
      {/* {console.log(markers)} */}
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={userLocation.position}
        zoom={18}
        options={options}
        onLoad={onLoad}
      >
        {markers?.map((marker) => {
          return (
            <Marker
              position={{
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              }}
              key={parseFloat(marker.node)}
            />
          );
        })}
        <Marker position={userLocation.position} />
      </GoogleMap>
    </div>
  ) : (
    <>abc</>
  );
};

export default React.memo(Map);

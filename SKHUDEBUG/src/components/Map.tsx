import { useState } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import styles from "../styles/Map.module.less";
import { useEffect } from "react";

interface MapProps {
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  onChangeRadius: (radius: React.ChangeEvent<HTMLInputElement>) => void;
  radius: number;
  latitude: number;
  longitude: number;
}

const center = {
  lat: 37.566535,
  lng: 126.977992,
};

const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const MapWithSearch: React.FunctionComponent<MapProps> = ({
  setLatitude,
  setLongitude,
  onChangeRadius,
  radius,
  latitude,
  longitude,
}) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  useEffect(() => {
    if (circle) {
      circle.setRadius(radius);
    }
  }, [radius, circle]);

  console.log(latitude, longitude);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        map?.panTo(location);
        map?.setZoom(14);
        setLatitude(location.lat());
        setLongitude(location.lng());

        if (circle) {
          circle.setCenter(location);
        } else {
          const newCircle = new google.maps.Circle({
            center: location,
            radius: radius,
            strokeColor: "red",
            strokeOpacity: 0.6,
            fillColor: "gray",
            fillOpacity: 0.5,
            map: map,
          });

          setCircle(newCircle);
        }

        if (marker) {
          marker.setPosition(location);
        } else {
          console.log(map);
        }
        const newMarker = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          icon: {
            url: "logo.png",
            scaledSize: new window.google.maps.Size(32, 32),
          },
        });
        setMarker(newMarker);
      }
    } else {
      console.log("로딩 중");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_MAP_API}
      libraries={["places"]}
    >
      <div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className={styles.AutoComplateInput}>
            <input type="text" placeholder="장소를 검색하세요" />
            <div className={styles.radiusBtn}>
              <label htmlFor="radius1">
                <p>100m</p>
                <input
                  type="radio"
                  id="radius1"
                  name="radius"
                  value="100"
                  onChange={onChangeRadius}
                />
              </label>
              <label htmlFor="radius2">
                <p>300m</p>
                <input
                  type="radio"
                  id="radius2"
                  name="radius"
                  value="300"
                  onChange={onChangeRadius}
                />
              </label>
              <label htmlFor="radius3">
                <p>500m</p>
                <input
                  type="radio"
                  id="radius3"
                  name="radius"
                  value="500"
                  onChange={onChangeRadius}
                />
              </label>
            </div>
          </div>
        </Autocomplete>
        <div className={styles.MapStyle}>
          <GoogleMap
            options={{ disableDefaultUI: true, styles: myStyles }}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={10}
            onLoad={(mapInstance) => {
              setMap(mapInstance);
              const initialCircle = new google.maps.Circle({
                center: center,
                radius: 500,
                strokeColor: "blue",
                strokeOpacity: 0.6,
                fillColor: "white",
                fillOpacity: 0.5,
                map: mapInstance,
              });
              setCircle(initialCircle);
            }}
          />
        </div>
      </div>
    </LoadScript>
  );
};

export default MapWithSearch;

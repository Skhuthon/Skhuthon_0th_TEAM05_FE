import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  OverlayView,
} from "@react-google-maps/api";
import styles from "../styles/Map.module.less";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import mapStore from "../stores/MapStore";

interface MapProps {
  findHunterStatus?: boolean;
  bugHunts?: BugHunt[];
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

const MapWithSearch: React.FunctionComponent<MapProps> = observer(
  ({ findHunterStatus, bugHunts }) => {
    const [autocomplete, setAutocomplete] =
      useState<google.maps.places.Autocomplete | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [circle, setCircle] = useState<google.maps.Circle | null>(null);
    const [markerPosition, setMarkerPosition] = useState<google.maps.LatLng[]>(
      []
    );
    const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
      setAutocomplete(autocompleteInstance);
    };

    useEffect(() => {
      if (map && bugHunts) {
        const positions: google.maps.LatLng[] = [];

        bugHunts.forEach((bugHunt) => {
          const position = new google.maps.LatLng(
            bugHunt.latitude,
            bugHunt.longitude
          );

          positions.push(position);
        });

        setMarkerPosition(positions);
      }
    }, [map, bugHunts]);

    useEffect(() => {
      if (circle) {
        circle.setRadius(mapStore.radius);
      }
    }, [mapStore.radius, circle]);

    const onPlaceChanged = () => {
      if (autocomplete !== null) {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const location = place.geometry.location;
          map?.panTo(location);
          map?.setZoom(14);
          mapStore.setLatitude(location.lat());
          mapStore.setLongitude(location.lng());
          setMarkerPosition([location]);

          if (circle) {
            circle.setCenter(location);
          } else {
            const newCircle = new google.maps.Circle({
              center: location,
              radius: mapStore.radius,
              strokeColor: "blue",
              strokeOpacity: 0.6,
              fillColor: "gray",
              fillOpacity: 0.5,
              map: map,
            });

            setCircle(newCircle);
          }
        }
      } else {
        console.log("로딩 중");
      }
    };

    const clickBugModal = () => {
      mapStore.setBugModalStatus(true);
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
                    onChange={(e) => mapStore.setRadius(Number(e.target.value))}
                  />
                </label>
                <label htmlFor="radius2">
                  <p>300m</p>
                  <input
                    type="radio"
                    id="radius2"
                    name="radius"
                    value="300"
                    onChange={(e) => mapStore.setRadius(Number(e.target.value))}
                  />
                </label>
                <label htmlFor="radius3">
                  <p>500m</p>
                  <input
                    type="radio"
                    id="radius3"
                    name="radius"
                    value="500"
                    onChange={(e) => mapStore.setRadius(Number(e.target.value))}
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
            >
              {markerPosition.map((item) => {
                return (
                  <OverlayView
                    position={item}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  >
                    <div className={styles.customMarker}>
                      {findHunterStatus && (
                        <button
                          className={styles.markerContent}
                          onClick={clickBugModal}
                        >
                          <img src="/images/bug.png" />
                        </button>
                      )}
                    </div>
                  </OverlayView>
                );
              })}
            </GoogleMap>
          </div>
        </div>
      </LoadScript>
    );
  }
);

export default MapWithSearch;

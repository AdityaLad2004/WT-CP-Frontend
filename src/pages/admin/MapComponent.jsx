import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

const LeafletDrawControl = ({ isAdmin }) => {
  const map = useMap();
  const drawnItemsRef = useRef(new L.FeatureGroup());

  useEffect(() => {
    const drawnItems = drawnItemsRef.current;
    map.addLayer(drawnItems);

    // Load saved layers (for both citizen and admin)
    const savedGeoJSON = localStorage.getItem("adminDrawnRegions");
    if (savedGeoJSON) {
      const parsed = JSON.parse(savedGeoJSON);
      L.geoJSON(parsed, {
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
          }
          drawnItems.addLayer(layer);
        }
      });
    }

    // Admin-only: allow drawing
    if (isAdmin) {
      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems
        },
        draw: {
          polygon: true,
          rectangle: true,
          polyline: false,
          marker: false,
          circle: false,
          circlemarker: false
        }
      });

      map.addControl(drawControl);

      map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        const name = prompt("Enter name for the region:");
        if (name) {
          layer.bindPopup(name);
          layer.feature = {
            type: "Feature",
            properties: { name },
            geometry: layer.toGeoJSON().geometry
          };
          drawnItems.addLayer(layer);

          // Save all layers to localStorage
          const allGeoJSON = drawnItems.toGeoJSON();
          localStorage.setItem("adminDrawnRegions", JSON.stringify(allGeoJSON));
        }
      });

      return () => {
        map.removeControl(drawControl);
      };
    }
  }, [map, isAdmin]);

  return null;
};

const MapComponent = ({ isAdmin = false }) => {
  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletDrawControl isAdmin={isAdmin} />
    </MapContainer>
  );
};

export default MapComponent;

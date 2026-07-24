'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';

// Helper component to update map center dynamically when user moves or searches
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && map && typeof map.setView === 'function') {
      map.setView(center, zoom || 15);
    }
  }, [center, zoom, map]);
  return null;
}

export default function LeafletMapInner({
  userLocation,
  markers = [],
  routePath = [],
  heatmap = false,
  zoom = 14,
  height = '100%'
}) {
  const [customIcons, setCustomIcons] = useState({});

  useEffect(() => {
    // Fix default Leaflet icon paths
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Create glowing custom DivIcons
    const userIcon = L.divIcon({
      className: 'user-live-marker',
      html: `<div style="width:24px;height:24px;border-radius:50%;background:#22d3ee;border:3px solid #fff;box-shadow:0 0 16px #22d3ee;animation:pulseDot 1.5s infinite alternate;"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const policeIcon = L.divIcon({
      className: 'police-live-marker',
      html: `<div style="width:28px;height:28px;border-radius:50%;background:#6366f1;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 14px #6366f1;font-family:'Material Symbols Rounded';font-size:16px;">local_police</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const havenIcon = L.divIcon({
      className: 'haven-live-marker',
      html: `<div style="width:28px;height:28px;border-radius:50%;background:#10b981;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 14px #10b981;font-family:'Material Symbols Rounded';font-size:16px;">verified</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const hazardIcon = L.divIcon({
      className: 'hazard-live-marker',
      html: `<div style="width:28px;height:28px;border-radius:50%;background:#ef4444;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 14px #ef4444;font-family:'Material Symbols Rounded';font-size:16px;">warning</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    setCustomIcons({ userIcon, policeIcon, havenIcon, hazardIcon });
  }, []);

  const defaultCenter = userLocation ? [userLocation.lat, userLocation.lng] : [41.8781, -87.6298];

  return (
    <div style={{ width: '100%', height, position: 'relative', overflow: 'hidden' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />

      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        style={{ width: '100%', height: '100%', background: '#080c18' }}
        zoomControl={false}
      >
        <ChangeView center={defaultCenter} zoom={zoom} />

        {/* Dark Matter Tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO &copy; OpenStreetMap'
          maxZoom={19}
        />

        {/* User Real-time Live GPS Position */}
        {userLocation && customIcons.userIcon && (
          <>
            <Marker position={[userLocation.lat, userLocation.lng]} icon={customIcons.userIcon}>
              <Popup>
                <div style={{ color: '#000', fontWeight: 'bold' }}>📍 Your Live GPS Location</div>
                <div style={{ fontSize: 11, color: '#666' }}>Lat: {userLocation.lat.toFixed(5)}, Lng: {userLocation.lng.toFixed(5)}</div>
              </Popup>
            </Marker>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={200}
              pathOptions={{ fillColor: '#22d3ee', fillOpacity: 0.12, color: '#22d3ee', weight: 1.5 }}
            />
          </>
        )}

        {/* Heatmap Overlay */}
        {heatmap && userLocation && (
          <>
            <Circle center={[userLocation.lat + 0.005, userLocation.lng + 0.005]} radius={400} pathOptions={{ fillColor: '#10b981', fillOpacity: 0.25, color: '#10b981', weight: 0 }} />
            <Circle center={[userLocation.lat - 0.008, userLocation.lng - 0.004]} radius={350} pathOptions={{ fillColor: '#ef4444', fillOpacity: 0.3, color: '#ef4444', weight: 0 }} />
            <Circle center={[userLocation.lat + 0.002, userLocation.lng - 0.009]} radius={500} pathOptions={{ fillColor: '#f59e0b', fillOpacity: 0.2, color: '#f59e0b', weight: 0 }} />
          </>
        )}

        {/* Real-time Custom Markers */}
        {markers.map((m, idx) => {
          const icon = m.type === 'police' ? customIcons.policeIcon : m.type === 'haven' ? customIcons.havenIcon : customIcons.hazardIcon;
          return (
            <Marker key={idx} position={[m.lat, m.lng]} icon={icon || undefined}>
              <Popup>
                <div style={{ color: '#000', fontWeight: 'bold' }}>{m.title}</div>
                <div style={{ fontSize: 12, color: '#444', marginTop: 2 }}>{m.desc}</div>
                {m.type === 'hazard' && <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 'bold', marginTop: 4 }}>⚠️ Active Alert</div>}
              </Popup>
            </Marker>
          );
        })}

        {/* Real-time Route Polyline */}
        {routePath && routePath.length > 0 && (
          <Polyline
            positions={routePath}
            pathOptions={{ color: '#6366f1', weight: 6, opacity: 0.9, dashArray: '1, 2' }}
          />
        )}
      </MapContainer>
    </div>
  );
}

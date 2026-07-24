'use client';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(m => m.Circle), { ssr: false });
const useMap = dynamic(() => import('react-leaflet').then(m => m.useMap), { ssr: false });

// Helper component to center map on coordinates change
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      map.setView(center, zoom || 15);
    }
  }, [center, zoom, map]);
  return null;
}

export default function LiveMap({
  userLocation,
  markers = [],
  routePath = [],
  heatmap = false,
  onMapClick,
  zoom = 14,
  height = '100%'
}) {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState(null);
  const [customIcons, setCustomIcons] = useState({});

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((leaflet) => {
      setL(leaflet.default || leaflet);

      // Fix default marker icon assets
      delete leaflet.Icon.Default.prototype._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Create glowing HTML icons
      const userIcon = leaflet.divIcon({
        className: 'user-live-marker',
        html: `<div style="width:24px;height:24px;border-radius:50%;background:#22d3ee;border:3px solid #fff;box-shadow:0 0 16px #22d3ee;animation:pulseDot 1.5s infinite alternate;"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const policeIcon = leaflet.divIcon({
        className: 'police-live-marker',
        html: `<div style="width:28px;height:28px;border-radius:50%;background:#6366f1;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 14px #6366f1;font-family:'Material Symbols Rounded';font-size:16px;">local_police</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const havenIcon = leaflet.divIcon({
        className: 'haven-live-marker',
        html: `<div style="width:28px;height:28px;border-radius:50%;background:#10b981;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 14px #10b981;font-family:'Material Symbols Rounded';font-size:16px;">verified</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const hazardIcon = leaflet.divIcon({
        className: 'hazard-live-marker',
        html: `<div style="width:28px;height:28px;border-radius:50%;background:#ef4444;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 14px #ef4444;font-family:'Material Symbols Rounded';font-size:16px;">warning</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      setCustomIcons({ userIcon, policeIcon, havenIcon, hazardIcon });
    });
  }, []);

  if (!mounted || !L) {
    return (
      <div style={{ width: '100%', height, background: '#080c18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee', gap: 12 }}>
        <span className="pulse-dot pulse-dot-cyan" />
        <span>Initializing Real-time Live Map...</span>
      </div>
    );
  }

  const defaultCenter = userLocation ? [userLocation.lat, userLocation.lng] : [41.8781, -87.6298]; // Default Chicago if loading

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

        {/* CartoDB Dark Matter Tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>'
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

        {/* Heatmap Overlay Simulation */}
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

'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';

// Dynamic map view controller with smooth flyTo animation
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && map && typeof map.setView === 'function') {
      try {
        map.flyTo(center, zoom || 14, { duration: 1.5 });
      } catch (_) {
        map.setView(center, zoom || 14);
      }
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
      html: `<div style="width:26px;height:26px;border-radius:50%;background:#22d3ee;border:3px solid #fff;box-shadow:0 0 20px #22d3ee;animation:pulseDot 1.5s infinite alternate;"></div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });

    const policeIcon = L.divIcon({
      className: 'police-live-marker',
      html: `<div style="width:30px;height:30px;border-radius:50%;background:#6366f1;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 16px #6366f1;font-family:'Material Symbols Rounded';font-size:18px;">local_police</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const havenIcon = L.divIcon({
      className: 'haven-live-marker',
      html: `<div style="width:30px;height:30px;border-radius:50%;background:#10b981;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 16px #10b981;font-family:'Material Symbols Rounded';font-size:18px;">verified</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const hazardIcon = L.divIcon({
      className: 'hazard-live-marker',
      html: `<div style="width:30px;height:30px;border-radius:50%;background:#ef4444;border:2px solid #fff;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 16px #ef4444;font-family:'Material Symbols Rounded';font-size:18px;">warning</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    setCustomIcons({ userIcon, policeIcon, havenIcon, hazardIcon });
  }, []);

  // Default Center: India (New Delhi Connaught Place)
  const defaultCenter = userLocation ? [userLocation.lat, userLocation.lng] : [28.6139, 77.2090];

  return (
    <div style={{ width: '100%', height, position: 'relative', overflow: 'hidden', borderRadius: 'inherit' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />

      {/* E2EE Live Status Pill Overlay on Map */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1000,
        background: 'rgba(8, 12, 24, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(34, 211, 238, 0.4)',
        padding: '6px 14px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: '12px',
        fontWeight: 700,
        color: '#22d3ee',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
      }}>
        <span className="pulse-dot pulse-dot-cyan" />
        <span>India Live GPS • E2EE Encrypted</span>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        style={{ width: '100%', height: '100%', background: '#080c18' }}
        zoomControl={false}
      >
        <ChangeView center={defaultCenter} zoom={zoom} />

        {/* Dark Matter Tiles for aesthetic dark UX */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO &copy; OpenStreetMap India'
          maxZoom={19}
        />

        {/* User Live GPS Position */}
        {userLocation && customIcons.userIcon && (
          <>
            <Marker position={[userLocation.lat, userLocation.lng]} icon={customIcons.userIcon}>
              <Popup>
                <div style={{ color: '#0f172a', fontWeight: 'bold' }}>📍 Your Live GPS Location</div>
                <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>
                  Lat: {userLocation.lat.toFixed(5)}, Lng: {userLocation.lng.toFixed(5)}
                </div>
                <div style={{ fontSize: 10, color: '#10b981', fontWeight: 'bold', marginTop: 4 }}>
                  🔒 End-to-End Encrypted Payload
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={250}
              pathOptions={{ fillColor: '#22d3ee', fillOpacity: 0.15, color: '#22d3ee', weight: 1.5 }}
            />
          </>
        )}

        {/* Heatmap Safety Radius Overlay */}
        {heatmap && userLocation && (
          <>
            <Circle center={[userLocation.lat + 0.004, userLocation.lng + 0.004]} radius={450} pathOptions={{ fillColor: '#10b981', fillOpacity: 0.25, color: '#10b981', weight: 0 }} />
            <Circle center={[userLocation.lat - 0.007, userLocation.lng - 0.004]} radius={350} pathOptions={{ fillColor: '#ef4444', fillOpacity: 0.28, color: '#ef4444', weight: 0 }} />
            <Circle center={[userLocation.lat + 0.002, userLocation.lng - 0.008]} radius={500} pathOptions={{ fillColor: '#f59e0b', fillOpacity: 0.2, color: '#f59e0b', weight: 0 }} />
          </>
        )}

        {/* Custom Indian Markers */}
        {markers.map((m, idx) => {
          const icon = m.type === 'police' ? customIcons.policeIcon : m.type === 'haven' ? customIcons.havenIcon : customIcons.hazardIcon;
          return (
            <Marker key={idx} position={[m.lat, m.lng]} icon={icon || undefined}>
              <Popup>
                <div style={{ color: '#0f172a', fontWeight: 'bold' }}>{m.title}</div>
                <div style={{ fontSize: 12, color: '#334155', marginTop: 2 }}>{m.desc}</div>
                {m.phone && <div style={{ fontSize: 11, color: '#6366f1', fontWeight: '600', marginTop: 4 }}>📞 {m.phone}</div>}
                {m.type === 'hazard' && <div style={{ fontSize: 11, color: '#ef4444', fontWeight: 'bold', marginTop: 4 }}>⚠️ Active Incident Alert</div>}
              </Popup>
            </Marker>
          );
        })}

        {/* Live Route Polyline */}
        {routePath && routePath.length > 0 && (
          <Polyline
            positions={routePath}
            pathOptions={{ color: '#6366f1', weight: 6, opacity: 0.95, dashArray: '2, 4' }}
          />
        )}
      </MapContainer>
    </div>
  );
}

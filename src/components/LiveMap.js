'use client';
import dynamic from 'next/dynamic';

const LeafletMapInner = dynamic(() => import('./LeafletMapInner'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', minHeight: 300, background: '#080c18', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee', gap: 12 }}>
      <span className="pulse-dot pulse-dot-cyan" />
      <span>Loading Live Interactive Map...</span>
    </div>
  )
});

export default function LiveMap(props) {
  return <LeafletMapInner {...props} />;
}

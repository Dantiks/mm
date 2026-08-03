import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import { PageHero } from '../components/UI/DesignKit';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import realMarkersData from '../data/realMarkers.json';
import realCategoriesData from '../data/realCategories.json';

// Fix Leaflet marker icons in Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Position {
  lat: number;
  lng: number;
}

interface ViolationType {
  id: number;
  violationType: string;
  badge?: string;
  icon?: string;
}

interface MapMarker {
  id: number;
  position: Position;
  authorRegion: string;
  authorCity: string;
  mediaLink?: string;
  image?: string;
  authorComment?: string;
  moderatorComment?: string;
  isApproved?: boolean;
  violationTypeId: number;
  violationType?: ViolationType;
  createdAt?: string;
}

// Create custom SVG markers for each category type
const createCustomMarkerIcon = (categoryId: number) => {
  let color = '#dc2626'; // Red for Hate Speech (id 3)
  let label = 'HATE';

  if (categoryId === 1) {
    color = '#2563eb'; // Blue for Disinformation / Fake News (id 1)
    label = 'FAKE';
  } else if (categoryId === 2) {
    color = '#d97706'; // Amber/Orange for Digital Fraud / Scams (id 2)
    label = 'SCAM';
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 48" width="36" height="48">
      <path d="M18 0C8.059 0 0 8.059 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.059 27.941 0 18 0z" fill="${color}"/>
      <circle cx="18" cy="18" r="13" fill="#ffffff"/>
      <text x="18" y="22" font-size="9" font-weight="900" text-anchor="middle" fill="${color}" font-family="sans-serif">${label}</text>
    </svg>
  `;

  return new L.Icon({
    iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -38],
  });
};

const MapPage: React.FC = () => {
  const [markers, setMarkers] = useState<MapMarker[]>(realMarkersData as any);
  const [categories] = useState<ViolationType[]>(realCategoriesData as any);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Kyrgyzstan Center coordinates
  const KG_CENTER: [number, number] = [41.2044, 74.7661];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const markersRes = await axios.get('/api/markers?isApproved=true');
        if (Array.isArray(markersRes.data) && markersRes.data.length > 0) {
          setMarkers(markersRes.data);
        }
      } catch (error) {
        // Fallback to realMarkersData JSON loaded directly
        console.log('Using embedded database dump markers');
      }
    };
    fetchData();
  }, []);

  const filteredMarkers = selectedCategory 
    ? markers.filter(m => (m.violationTypeId || m.violationType?.id) === selectedCategory) 
    : markers;

  return (
    <div className="bg-slate-50 min-h-screen font-inter">
      <PageHero
        eyebrow="МЕДИАКАРТА КЫРГЫЗСТАНА"
        title="Интерактивная карта нарушений"
        subtitle="Карта зафиксированных цифровых нарушений, фейков и мошенничеств по всем регионам Кыргызстана"
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 -mt-8 relative z-10 pb-20">
        
        {/* Category Filters Header */}
        <div className="bg-white rounded-3xl shadow-xl p-4 border border-slate-200/80 mb-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all font-extrabold text-xs cursor-pointer ${
              selectedCategory === null
                ? 'bg-navy text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>Все нарушения ({markers.length})</span>
          </button>
          
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = markers.filter(m => (m.violationTypeId || m.violationType?.id) === cat.id).length;
            let badgeColor = 'bg-blue-600';
            if (cat.id === 2) badgeColor = 'bg-amber-600';
            if (cat.id === 3) badgeColor = 'bg-red-600';

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all font-bold text-xs cursor-pointer ${
                  isSelected
                    ? `${badgeColor} text-white shadow-md`
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.badge || cat.violationType}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Leaflet Map Box */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/80">
          <div className="h-[680px] w-full relative">
            <MapContainer
                center={KG_CENTER}
                zoom={7}
                scrollWheelZoom={true}
                className="h-full w-full z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {filteredMarkers.map((marker) => {
                  if (!marker.position || !marker.position.lat || !marker.position.lng) return null;
                  const catId = marker.violationTypeId || marker.violationType?.id || 1;
                  
                  return (
                    <Marker 
                      key={marker.id} 
                      position={[marker.position.lat, marker.position.lng]}
                      icon={createCustomMarkerIcon(catId)}
                    >
                      <Popup className="custom-leaflet-popup">
                        <div className="p-2 max-w-sm space-y-3 font-inter">
                          
                          {/* Category Badge */}
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white ${
                              catId === 3 ? 'bg-red-600' : catId === 2 ? 'bg-amber-600' : 'bg-blue-600'
                            }`}>
                              {catId === 3 ? 'Кастык тили (Язык вражды)' : catId === 2 ? 'Санариптик шылуундар' : 'Жалган маалымат (Фейк)'}
                            </span>
                          </div>

                          {/* Location Info */}
                          <div className="text-xs text-slate-600 space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-navy">
                              <MapPin className="h-3.5 w-3.5 text-red-600 shrink-0" />
                              <span>Локация: {marker.authorRegion}, {marker.authorCity}</span>
                            </div>
                            {marker.createdAt && (
                              <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                                <Calendar className="h-3 w-3 shrink-0" />
                                <span>{marker.createdAt.split('T')[0] || marker.createdAt}</span>
                              </div>
                            )}
                          </div>

                          {/* Screenshot Image */}
                          {marker.image && (
                            <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                              <img
                                src={marker.image}
                                alt="Скриншот нарушения"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback image if file path resolves differently
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                          )}

                          {/* Author Comment */}
                          {marker.authorComment && (
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-800 leading-relaxed font-medium">
                              <p className="font-bold text-[10px] uppercase text-slate-400 mb-0.5">Сообщение заявителя:</p>
                              <p>"{marker.authorComment}"</p>
                            </div>
                          )}

                          {/* Moderator Legal Comment */}
                          {marker.moderatorComment && (
                            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
                              <p className="font-bold text-[10px] uppercase text-amber-700 mb-0.5">Экспертный комментарий / правовая оценка:</p>
                              <p className="line-clamp-4">{marker.moderatorComment}</p>
                            </div>
                          )}

                          {/* Primary Source Link */}
                          {marker.mediaLink && (
                            <a
                              href={marker.mediaLink}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-2xs"
                            >
                              <span>Перейти к первоисточнику</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}

                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapPage;

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import { PageHero } from '../components/UI/DesignKit';

// Исправление для иконок Leaflet в Webpack
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
  icon: string;
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
  violationType: ViolationType;
}

const getMarkerIcon = (iconName?: string) => {
  if (!iconName) return new L.Icon.Default();
  return new L.Icon({
    iconUrl: `http://localhost:5000/api/static/uploads/icons/${iconName}`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

const MapPage: React.FC = () => {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [categories, setCategories] = useState<ViolationType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Координаты центра Кыргызстана
  const KG_CENTER: [number, number] = [41.2044, 74.7661];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [markersRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/markers?isApproved=true'),
          axios.get('http://localhost:5000/api/violation-types')
        ]);
        setMarkers(markersRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных карты:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredMarkers = selectedCategory 
    ? markers.filter(m => m.violationType?.id === selectedCategory) 
    : markers;

  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHero
        title="Интерактивная карта"
        subtitle="Карта зафиксированных цифровых нарушений по всему Кыргызстану"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-20">
        <div className="bg-white rounded-3xl shadow-xl p-4 border border-slate-100 mb-6 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-bold text-sm ${
              selectedCategory === null
                ? 'bg-white border-2 border-[#1976d2] text-navy shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 border-2 border-transparent'
            }`}
          >
            Все нарушения
          </button>
          
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all font-bold text-sm ${
                  isSelected
                    ? 'bg-white border-2 border-[#1976d2] text-navy shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 border-2 border-transparent'
                }`}
              >
                {cat.icon && (
                  <img 
                    src={`http://localhost:5000/api/static/uploads/icons/${cat.icon}`} 
                    alt={cat.violationType} 
                    className={`w-7 h-7 object-contain transition-all ${isSelected ? 'opacity-100 scale-110' : 'opacity-60 grayscale'}`} 
                  />
                )}
                {cat.violationType}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="h-[600px] w-full relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
              </div>
            ) : (
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
                  
                  return (
                    <Marker 
                      key={marker.id} 
                      position={[marker.position.lat, marker.position.lng]}
                      icon={getMarkerIcon(marker.violationType?.icon)}
                    >
                      <Popup className="rounded-xl">
                        <div className="p-1 min-w-[200px]">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                              {marker.violationType?.violationType || 'Нарушение'}
                            </span>
                          </div>
                          
                          <p className="text-sm text-slate-700 font-medium mb-2">
                            <span className="text-slate-400">Локация:</span> {marker.authorRegion}, {marker.authorCity}
                          </p>
                          
                          {marker.authorComment && (
                            <p className="text-sm text-slate-600 mb-3 bg-slate-50 p-2 rounded-lg italic border-l-2 border-slate-300">
                              "{marker.authorComment}"
                            </p>
                          )}
                          
                          {marker.image && (
                            <img 
                              src={`http://localhost:5000/api/static/uploads/screenshots/${marker.image}`} 
                              alt="Скриншот нарушения" 
                              className="w-full h-32 object-cover rounded-lg mb-3 shadow-sm"
                              onError={(e) => {
                                if (!e.currentTarget.src.includes('/news1.png')) {
                                  e.currentTarget.src = '/news1.png';
                                }
                              }}
                            />
                          )}
                          
                          {marker.mediaLink && (
                            <a 
                              href={marker.mediaLink} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-navy font-bold text-sm hover:text-red-500 transition-colors block text-center bg-slate-50 hover:bg-red-50 p-2 rounded-lg"
                            >
                              Перейти к первоисточнику
                            </a>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;

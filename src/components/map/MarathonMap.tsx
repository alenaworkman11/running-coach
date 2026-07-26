"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import {
  defaultMapCenter,
  defaultMapZoom,
  cityMapZoom,
  marathonCities,
  type MarathonCityKey,
} from "@/lib/marathonCities";

interface MarathonMapProps {
  selectedCity: MarathonCityKey | null;
  onCitySelect: (city: MarathonCityKey) => void;
  cityLabels: Record<MarathonCityKey, string>;
  majorLabel: string;
  hereLabel: string;
}

function createPinIcon(active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="marathon-pin${active ? " marathon-pin--active" : ""}"><span class="marathon-pin__dot"></span><span class="marathon-pin__pulse"></span></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

function MapFlyTo({
  selectedCity,
}: {
  selectedCity: MarathonCityKey | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedCity) {
      const city = marathonCities.find((c) => c.key === selectedCity);
      if (city) {
        map.flyTo([city.lat, city.lng], cityMapZoom, { duration: 1.2 });
      }
    } else {
      map.flyTo(defaultMapCenter, defaultMapZoom, { duration: 1.2 });
    }
  }, [map, selectedCity]);

  return null;
}

function CityMarker({
  cityKey,
  lat,
  lng,
  label,
  majorLabel,
  hereLabel,
  isSelected,
  onSelect,
}: {
  cityKey: MarathonCityKey;
  lat: number;
  lng: number;
  label: string;
  majorLabel: string;
  hereLabel: string;
  isSelected: boolean;
  onSelect: (city: MarathonCityKey) => void;
}) {
  const markerRef = useRef<L.Marker>(null);
  const icon = useMemo(() => createPinIcon(isSelected), [isSelected]);

  useEffect(() => {
    if (isSelected) {
      markerRef.current?.openPopup();
    }
  }, [isSelected]);

  return (
    <Marker
      ref={markerRef}
      position={[lat, lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect(cityKey),
      }}
    >
      <Popup className="marathon-popup">
        <div className="marathon-popup__content">
          <p className="marathon-popup__city">{label}</p>
          <p className="marathon-popup__major">{majorLabel}</p>
          <p className="marathon-popup__here">{hereLabel}</p>
        </div>
      </Popup>
    </Marker>
  );
}

export function MarathonMap({
  selectedCity,
  onCitySelect,
  cityLabels,
  majorLabel,
  hereLabel,
}: MarathonMapProps) {
  return (
    <MapContainer
      center={defaultMapCenter}
      zoom={defaultMapZoom}
      className="h-full w-full rounded-3xl"
      scrollWheelZoom={false}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapFlyTo selectedCity={selectedCity} />
      {marathonCities.map((city) => (
        <CityMarker
          key={city.key}
          cityKey={city.key}
          lat={city.lat}
          lng={city.lng}
          label={cityLabels[city.key]}
          majorLabel={majorLabel}
          hereLabel={hereLabel}
          isSelected={selectedCity === city.key}
          onSelect={onCitySelect}
        />
      ))}
    </MapContainer>
  );
}

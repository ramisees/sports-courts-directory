"use client";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useRef, useEffect } from "react";

function Map({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && window.google) {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    }
  }, [center, zoom]);

  return <div ref={ref} style={{ width: "100%", height: "300px", borderRadius: "1rem" }} />;
}

export default function LiveMap() {
  const center = { lat: 40.785091, lng: -73.968285 }; // Central Park, NY
  const zoom = 13;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

  return (
    <div className="my-8 rounded-2xl overflow-hidden shadow-lg border border-gray-700/50">
      <Wrapper apiKey={apiKey} render={status => <div>{status === Status.LOADING ? "Loading map..." : status === Status.FAILURE ? "Failed to load map" : null}</div>}>
        <Map center={center} zoom={zoom} />
      </Wrapper>
    </div>
  );
}

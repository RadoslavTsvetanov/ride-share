import React, { useState } from "react";

interface NominatimPlace {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  [key: string]: any; // allow extra fields from API
}

interface UseSearchPlaceReturn {
  SearchPlace: React.FC;
  onSubmit: () => void;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Custom hook for searching places via OpenStreetMap Nominatim API.
 * Exposes a SearchPlace component and an onSubmit handler.
 */
export const useSearchPlace = (
  onSubmit?: (place: NominatimPlace) => void
): UseSearchPlaceReturn => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<NominatimPlace[]>([]);
  const [selected, setSelected] = useState<NominatimPlace | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(false);

  const handleSearch = async (): Promise<void> => {
    if (!query.trim() || !isActive) return;
    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`;
      const res = await fetch(url, {
        headers: { "User-Agent": "MyReactApp/1.0 (youremail@example.com)" },
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const data: NominatimPlace[] = await res.json();
      setResults(data.slice(0, 10));
    } catch (err) {
      console.error("Error fetching locations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = (): void => {
    if (selected && onSubmit) {
      onSubmit(selected);
    }
  };

  const SearchPlace: React.FC = () => {
    if (!isActive) return null;
    return (
      <div className="max-w-md mx-auto p-4 border rounded-2xl shadow-sm bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        {loading && <p className="mt-3 text-gray-500 text-sm">Loading...</p>}

        <ul className="mt-3 space-y-1 max-h-64 overflow-y-auto">
          {results.map((r) => (
            <li
              key={r.place_id}
              onClick={() => setSelected(r)}
              className={`p-2 border rounded-lg cursor-pointer ${
                selected?.place_id === r.place_id
                  ? "bg-blue-100 border-blue-400"
                  : "hover:bg-gray-100"
              }`}
            >
              {r.display_name}
            </li>
          ))}
        </ul>

        {selected && (
          <div className="mt-3">
            <button
              onClick={handleOk}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        )}
      </div>
    );
  };

  return { SearchPlace, onSubmit: handleOk, setIsActive };
};

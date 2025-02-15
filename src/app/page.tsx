'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { useCountries } from './hooks/useCountryQueries';
import { CountrySearchParams } from './types/country';
import LoadingCards from './components/skeleton';
import Card from './components/card';

const TIMEZONES = [
  'UTC', 'UTC+01:00', 'UTC+02:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00',
  'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00',
  'UTC+12:00', 'UTC-01:00', 'UTC-02:00', 'UTC-03:00', 'UTC-04:00', 'UTC-05:00',
  'UTC-06:00', 'UTC-07:00', 'UTC-08:00', 'UTC-09:00', 'UTC-10:00', 'UTC-11:00',
  'UTC-12:00'
];

// const CountryCard = ({ country }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
//       <div className="aspect-video relative">
//         <Image
//           width={100}
//           height={100}
//           src={country.flags.png}
//           alt={`${country.name.common} flag`}
//           className="object-cover w-full h-full"
//         />
//       </div>
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-2">{country.name.common}</h2>
//         <div className="flex flex-wrap gap-2 mb-2">
//           <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
//             {country.region}
//           </span>
//           {country.capital && (
//             <span className="px-2 py-1 text-sm border border-gray-300 rounded-full">
//               {country.capital[0]}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

export default function HomePage() {
  const [searchParams, setSearchParams] = useState<CountrySearchParams>({});
  const [debouncedParams, setDebouncedParams] = useState<CountrySearchParams>({});
  const { ref, inView } = useInView();
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  
  const {
    data: paginatedData,
    searchData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isSearching,
    isSearchLoading,
    isFetchingNextPage,
  } = useCountries(debouncedParams);

  const countriesToDisplay = isSearching
    ? searchData || []
    : paginatedData?.pages?.flatMap(page => page.countries) || [];

  const resetSearch = () => {
    setSearchParams({});
    setDebouncedParams({});
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(searchParams);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isSearching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isSearching]);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Countries of the World</h1>
      
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchParams.name || ''}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setSearchParams(prev => ({ ...prev, name: e.target.value }))}
          />
          
          <input
            type="text"
            placeholder="Search by capital"
            value={searchParams.capital || ''}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setSearchParams(prev => ({ ...prev, capital: e.target.value }))}
          />
          
          <div className="relative">
            <button
              type="button"
              className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onClick={() => {
                setIsRegionOpen(!isRegionOpen);
                setIsTimezoneOpen(false);
              }}
            >
              {searchParams.region || "Select Region"}
            </button>
            
            {isRegionOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {["Africa", "Americas", "Asia", "Europe", "Oceania"].map((region) => (
                  <button
                    key={region}
                    type="button"
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setSearchParams(prev => ({ ...prev, region }));
                      setIsRegionOpen(false);
                    }}
                  >
                    {region}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              className="w-full px-4 py-2 text-left rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onClick={() => {
                setIsTimezoneOpen(!isTimezoneOpen);
                setIsRegionOpen(false);
              }}
            >
              {searchParams.timezone || "Select Timezone"}
            </button>
            
            {isTimezoneOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {TIMEZONES.map((timezone) => (
                  <button
                    key={timezone}
                    type="button"
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setSearchParams(prev => ({ ...prev, timezone }));
                      setIsTimezoneOpen(false);
                    }}
                  >
                    {timezone}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isSearching && (
            <button
              onClick={resetSearch}
              className="col-span-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {(isLoading || isSearchLoading) ? (
        <LoadingCards />
      ) : countriesToDisplay.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No countries found matching your criteria</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countriesToDisplay.map((country) => (
              <Link href={`/country/${country.cca2}`} key={country.cca2}>
                <Card country={country} />
              </Link>
            ))}
          </div>

          {!isSearching && (
            <div ref={ref} className="mt-8 text-center">
              {isFetchingNextPage && (
                <div className="animate-pulse">
                  Loading more countries...
                </div>
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
}
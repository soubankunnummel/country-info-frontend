'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useCountry } from '@/app/hooks/useCountryQueries';

export default function CountryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: country, isLoading } = useCountry(params.code as string);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="h-[300px] w-full md:w-[400px] bg-gray-200 animate-pulse rounded-lg" />
              <div className="flex-1 space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Country not found</h1>
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <button 
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Countries
      </button>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <Image
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className="w-16 h-auto"
              width={100}
              height={100}
              
            />
            <div>
              <h1 className="text-3xl font-bold">{country.name.common}</h1>
              <p className="text-gray-500">{country.name.official}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">General Information</h3>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-500">Region:</span>{' '}
                    {country.region}
                  </p>
                  <p>
                    <span className="text-gray-500">Population:</span>{' '}
                    {country.population.toLocaleString()}
                  </p>
                  {country.capital && (
                    <p>
                      <span className="text-gray-500">Capital:</span>{' '}
                      {country.capital.join(', ')}
                    </p>
                  )}
                </div>
              </div>

              <hr className="border-gray-200" />
 
            </div>

            <div className="space-y-4">
              {country.currencies && (
                <div>
                  <h3 className="font-semibold mb-2">Currencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(country.currencies).map(([code, currency]) => (
                      <span 
                        key={code}
                        className="px-2 py-1 text-sm bg-gray-100 rounded-full"
                      >
                        {currency.name} ({currency.symbol})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <hr className="border-gray-200" />

              {country.languages && (
                <div>
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(country.languages).map((language) => (
                      <span 
                        key={language}
                        className="px-2 py-1 text-sm border border-gray-300 rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <hr className="border-gray-200" />

              <div>
                <h3 className="font-semibold mb-2">Timezones</h3>
                <div className="flex flex-wrap gap-2">
                  {country.timezones.map((timezone) => (
                    <span 
                      key={timezone}
                      className="px-2 py-1 text-sm bg-gray-100 rounded-full"
                    >
                      {timezone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
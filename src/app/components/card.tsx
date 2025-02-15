import Image from 'next/image';
import React from 'react'
import { Country } from '../types/country';

export default function Card({ country } : { country: Country }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
    <div className="aspect-video relative">
      <Image
        width={100}
        height={100}
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{country.name.common}</h2>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
          {country.region}
        </span>
        {country.capital && (
          <span className="px-2 py-1 text-sm border border-gray-300 rounded-full">
            {country.capital[0]}
          </span>
        )}
      </div>
    </div>
  </div>
);
  
}

import { Country, CountrySearchParams } from '../types/country';

const API_URL =  'http://localhost:5000/api';

class ApiError extends Error {
    constructor(public status: number, message: string) {
      super(message);
      this.name = 'ApiError';
    }
  }


  async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  
    if (!response.ok) {
      throw new ApiError(response.status, 'API request failed');
    }
  
    return response.json();
  }


  export const countryApi = {
    getAllCountries: async (page: number = 1, limit: number = 20) => {
      const data = await fetchApi<Country[]>('/countries');
      const start = (page - 1) * limit;
      return {
        countries: data.slice(start, start + limit),
        nextPage: data.length > start + limit ? page + 1 : undefined,
        total: data.length
      };
    },
  
    getCountryByCode: (code: string) => 
      fetchApi<Country>(`/countrie/${code}`),
  
    // getCountriesByRegion: (region: string) => 
    //   fetchApi<Country[]>(`/countries/region/${region}`),
    
    // getCountriesByCapital: (capital: string) =>
    //   fetchApi<Country[]>(`/countries/capital/${capital}`),
  
    searchCountries: (params: CountrySearchParams) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, value);
      });
      return fetchApi<Country[]>(`/countries/search?${searchParams}`);
    },
  };
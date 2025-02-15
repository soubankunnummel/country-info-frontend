import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { CountrySearchParams } from "../types/country";
import { countryApi } from "../services/api";


export const useCountries = (params: CountrySearchParams = {}) => {
    const hasSearchParams = Object.values(params).some(value => !!value);
  
    // Use infinite query for pagination when no search params
    const infiniteQuery = useInfiniteQuery({
      queryKey: ['countries', 'paginated'],
      queryFn: ({ pageParam = 1 }) => countryApi.getAllCountries(pageParam, 20),
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      enabled: !hasSearchParams,
    });
  
    // Use regular query for search results
    const searchQuery = useQuery({
      queryKey: ['countries', 'search', params],
      queryFn: () => countryApi.searchCountries(params),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      enabled: hasSearchParams,
    });
  
    return {
      ...infiniteQuery,
      searchData: searchQuery.data,
      isSearching: hasSearchParams,
      isSearchLoading: searchQuery.isLoading,
      isFetching: infiniteQuery.isFetching || searchQuery.isFetching,
    };
  };

  export const useCountry = (code: string) => {
    return useQuery({
      queryKey: ['country', code],
      queryFn: () => countryApi.getCountryByCode(code),
      enabled: !!code,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });
  };


  // export const useCountryRegion = (region: string) => {
  //   return useQuery({
  //     queryKey: ['country', region],
  //     queryFn: () => countryApi.getCountriesByRegion(region),
  //     enabled: !!region,
  //     staleTime: 5 * 60 * 1000,
  //     gcTime: 10 * 60 * 1000,
  //   });
  // };
  // export const useCountryCapital = (capital: string) => {
  //   return useQuery({
  //     queryKey: ['country', capital],
  //     queryFn: () => countryApi.getCountriesByCapital(capital),
  //     enabled: !!capital,
  //     staleTime: 5 * 60 * 1000,
  //     gcTime: 10 * 60 * 1000,
  //   });
  // };

//   export const useSearchCountries = (params: CountrySearchParams) => {
//     return useQuery({
//       queryKey: ['countries', 'search', params],
//       queryFn: () => countryApi.searchCountries(params),
//       enabled: Object.values(params).some(value => !!value),
//       staleTime: 5 * 60 * 1000,
//       gcTime: 10 * 60 * 1000,
//     });
//   };
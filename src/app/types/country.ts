export interface Country {
    name: {
      common: string;
      official: string;
    };
    cca2: string;
    cca3: string;
    capital?: string[];
    region: string;
    subregion?: string;
    population: number;
    timezones: string[];
    flags: {
      png: string;
      svg: string;
    };
    currencies?: {
      [key: string]: {
        name: string;
        symbol: string;
      };
    };
    languages?: {
      [key: string]: string;
    };
  }
  
  export interface CountrySearchParams {
    name?: string;
    capital?: string;
    region?: string;
    timezone?: string;
    page?: number;
    limit?: number;
  }
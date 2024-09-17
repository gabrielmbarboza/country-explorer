export interface ICountry {
  id: number;
  identifier: string;
  name: string;
  area?: string;
  location?: string;
  languages?: string;
  capital?: string;
  latitude?: number;
  longitude?: number;
  population?: number;
  currency_units?: string;
  timezones?: string;
  osm_code?: string;
  history?: string;
}

export interface IApiResponse {
  data: ICountry[]
}

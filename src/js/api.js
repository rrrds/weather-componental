const API_KEY = 'fe82917089f7afb293cb0e0619603570';

const API_UNITS = 'metric';
const API_URL = '//api.openweathermap.org/data/2.5/';
const API_CURRENT = `${API_URL}weather?APPID=${API_KEY}&units=${API_UNITS}&q=`;
const API_FORECAST = `${API_URL}forecast?APPID=${API_KEY}&units=${API_UNITS}&q=`;

export function fetchData(apiUrl) {
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) return {};
      return response.json();
    })
    .catch(() => {});
}

export function fetchCurrentData(cityName) {
  return fetchData(API_CURRENT + cityName);
}

export function fetchForecastData(cityName) {
  return fetchData(API_FORECAST + cityName);
}

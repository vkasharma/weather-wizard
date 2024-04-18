import type { DescriptionsProps } from "antd";
import type { WeatherData } from "./types";
import { CONFIG } from "./constants";

export const makeWeatherIconUrl = (icon: string): string =>
	`https://openweathermap.org/img/wn/${icon}@2x.png`;

export const makeWeatherApiUrl = (city: string): string =>
	`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG.openWeatherMapApiKey}&units=metric`;

export const formatWeatherData = (
	weatherData: WeatherData
): DescriptionsProps["items"] => {
	const { clouds, wind, main } = weatherData;

	return [
		{
			key: "1",
			label: "temp",
			children: `${main.temp}°C`,
			contentStyle: { fontWeight: "bold" },
		},
		{
			key: "2",
			label: "min temp",
			children: `${main.temp_min}°C`,
		},
		{
			key: "3",
			label: "max temp",
			children: `${main.temp_max}°C`,
		},
		{
			key: "4",
			label: "feels like",
			children: `${main.feels_like}°C`,
		},
		{
			key: "5",
			label: "clouds",
			children: `${clouds.all}%`,
		},
		{
			key: "6",
			label: "wind",
			children: `${wind.speed} m/s`,
		},
		{
			key: "7",
			label: "humidity",
			children: `${main.humidity}%`,
		},
		{
			key: "8",
			label: "pressure",
			children: `${main.pressure} hPa`,
		},
		{
			key: "9",
			label: "visibility",
			children: `${weatherData.visibility} meters`,
		},
		{
			key: "10",
			label: "sunrise",
			children: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
		},
		{
			key: "11",
			label: "sunset",
			children: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
		},
	];
};

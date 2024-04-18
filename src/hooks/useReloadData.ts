import { useEffect } from "react";
import { useLocalStorage } from "./localStorage";
import { LocalStorage } from "../common/enums";
import type { WeatherData } from "../common/types";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { makeWeatherApiUrl } from "../common/utils";

export const useReloadData = (): void => {
	const [weatherData, setWeatherData] = useLocalStorage<Array<WeatherData>>(
		LocalStorage.WEATHER_DATA,
		[]
	);
	useEffect(() => {
		// We are calling apis in loop as openweathermap does not support multiple cities in one call (atl east in free tier)
		const fetchAllApis = async (): Promise<void> => {
			try {
				const fetchPromises = weatherData.map((data) =>
					axios
						.get(makeWeatherApiUrl(`${data.name},${data.sys.country}`))
						.then((response: AxiosResponse<WeatherData>) => {
							return response.data;
						})
				);
				const results = await Promise.all(fetchPromises);
				setWeatherData(results);
			} catch (error) {
				console.error("Failed to fetch from APIs:", error);
			}
		};

		fetchAllApis();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty dependency array means this effect will only run once after the initial render
};

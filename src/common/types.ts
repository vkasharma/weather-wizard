export type FunctionComponent = React.ReactElement | null;
interface Coordinates {
	lon: number;
	lat: number;
}

export interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface Main {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
	sea_level?: number; // Optional as it may not appear in all JSON responses
	grnd_level?: number; // Optional as it may not appear in all JSON responses
}

interface Wind {
	speed: number;
	deg: number;
	gust?: number; // Optional as it may not appear in all JSON responses
}

interface Rain {
	"1h": number;
}

interface Clouds {
	all: number;
}

interface SystemInfo {
	type: number;
	id: number;
	country: string;
	sunrise: number;
	sunset: number;
}

export interface WeatherData {
	coord: Coordinates;
	weather: Array<Weather>;
	base: string;
	main: Main;
	visibility: number;
	wind: Wind;
	rain: Rain;
	clouds: Clouds;
	dt: number;
	sys: SystemInfo;
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export interface CityOption {
	value: string;
	label: string;
}

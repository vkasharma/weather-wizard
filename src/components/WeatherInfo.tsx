import type React from "react";
import type { WeatherData } from "../common/types";
import { Button, Card, Descriptions, Image, Space, Typography } from "antd";
import { useLocalStorage } from "../hooks/localStorage";
import { LocalStorage } from "../common/enums";
import { CloseOutlined } from "@ant-design/icons";
import { formatWeatherData, makeWeatherIconUrl } from "../common/utils";

const Text = Typography.Text;

export const WeatherInfo: React.FC<{ activeCity?: WeatherData }> = ({
	activeCity,
}) => {
	const [weatherData, setWeatherData] = useLocalStorage<Array<WeatherData>>(
		LocalStorage.WEATHER_DATA,
		[]
	);

	if (!activeCity) {
		return null;
	}

	const items = formatWeatherData(activeCity);
	const isFavorite = weatherData.some((city) => city.id === activeCity.id);
	const weather = activeCity.weather[0] ? activeCity.weather[0] : undefined;

	return (
		<Card
			title={
				<Space>
					<Text>{`${activeCity.name}, ${activeCity.sys.country}`}</Text>
					{weather && (
						<Image
							src={makeWeatherIconUrl(weather.icon)}
							width={42}
							preview={false}
						/>
					)}
					<Text style={{ fontWeight: 400 }} type="secondary">
						{weather?.description}
					</Text>
				</Space>
			}
			extra={
				isFavorite && (
					<Button
						onClick={() => {
							setWeatherData(
								weatherData.filter((city) => city.id !== activeCity.id)
							);
						}}
						icon={<CloseOutlined />}
						type="text"
					></Button>
				)
			}
		>
			<Descriptions size={"small"} items={items} />
			<Text
				style={{
					fontStyle: "italic",
					fontSize: 12,
					float: "right",
				}}
				type="secondary"
			>
				as of {new Date(activeCity.dt * 1000).toLocaleString()}
			</Text>
		</Card>
	);
};

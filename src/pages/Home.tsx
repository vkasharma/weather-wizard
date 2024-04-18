import { AutoComplete, Card, Col, Flex, Modal, Row, message } from "antd";
import type {
	CityOption,
	FunctionComponent,
	WeatherData,
} from "../common/types";
import { CONFIG } from "../common/constants";
import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import axios from "axios";
import cityList from "../common/current.city.list.min.json";
import { WeatherInfo } from "../components/WeatherInfo";
import { useLocalStorage } from "../hooks/localStorage";
import { LocalStorage } from "../common/enums";
import { makeWeatherApiUrl } from "../common/utils";

const cityListOptions = cityList as Array<CityOption>;

export const Home = (): FunctionComponent => {
	const [searchText, setSearchText] = useState<string>("");
	const [activeCity, setActiveCity] = useState<WeatherData | undefined>();
	const [options, setOptions] = useState<Array<CityOption>>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [weatherData, setWeatherData] = useLocalStorage<Array<WeatherData>>(
		LocalStorage.WEATHER_DATA,
		[]
	);

	useEffect(() => {
		if (!searchText) {
			setOptions([]);
		} else {
			setOptions(
				cityListOptions.filter((city) =>
					city.label.toLowerCase().includes(searchText.toLowerCase())
				)
			);
		}
	}, [searchText]);

	const error = (msg: string): void => {
		messageApi.open({
			type: "error",
			content: msg,
			duration: 5,
			style: {
				marginTop: "12vh",
			},
		});
	};

	const onSelect = (value: string): void => {
		axios
			.get(makeWeatherApiUrl(value.replace(", ", ",")))
			.then((response: AxiosResponse<WeatherData>) => {
				setActiveCity(response.data);
			})
			.catch((err) => {
				if (axios.isAxiosError(err)) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					error(`Failed to fetch weather data: ${err.response?.data.message}`);
				} else {
					error("Unexpected error occurred");
				}
			});
	};

	const clear = (): void => {
		setActiveCity(undefined);
		setSearchText("");
	};

	return (
		<>
			{contextHolder}
			<Card styles={{ body: { padding: 70 } }}>
				<Row>
					<Col span={12} offset={6}>
						<Flex justify="center" align="center" vertical>
							<AutoComplete
								value={searchText}
								options={options}
								style={{ width: 340 }}
								onSelect={onSelect}
								onSearch={setSearchText}
								placeholder={CONFIG.searchText}
								allowClear
								size="large"
								autoFocus
								id={CONFIG.searchInputId}
								defaultActiveFirstOption
							/>
						</Flex>
					</Col>
				</Row>
			</Card>
			<Card
				styles={{ body: { padding: 20, height: "70vh", overflow: "auto" } }}
				style={{ marginTop: 20 }}
			>
				<Row gutter={[16, 16]}>
					{weatherData.map((city) => (
						<Col span={12} xs={24} sm={12} key={city.id}>
							<WeatherInfo activeCity={city} />
						</Col>
					))}
				</Row>
			</Card>
			<Modal
				open={!!activeCity}
				onCancel={clear}
				okText={CONFIG.addToFavorites}
				onOk={() => {
					const cityExists = weatherData.find(
						(city) => city.id === activeCity?.id
					);
					if (!cityExists) {
						activeCity && setWeatherData([...weatherData, activeCity]);
					}
					clear();
				}}
				width={600}
				styles={{ content: { padding: 10 } }}
				closeIcon={false}
			>
				<WeatherInfo activeCity={activeCity} />
			</Modal>
		</>
	);
};

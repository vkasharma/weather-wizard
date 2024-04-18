import { Home } from "./pages/Home";
import type { FunctionComponent } from "./common/types";
import { App as AntdApp, ConfigProvider, theme as antdTheme } from "antd";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useLocalStorage } from "./hooks/localStorage";
import { themeConfig } from "./common/antd";
import { LocalStorage } from "./common/enums";
import { Layout } from "./components/layout";
import { useReloadData } from "./hooks/useReloadData";

const App = (): FunctionComponent => {
	useReloadData();
	const [themeMode] = useLocalStorage(LocalStorage.THEME_MODE, "light");
	const theme = {
		algorithm:
			themeMode === "dark"
				? antdTheme.darkAlgorithm
				: antdTheme.defaultAlgorithm,
		...themeConfig,
	};
	return (
		<ConfigProvider theme={theme}>
			<AntdApp>
				<HappyProvider>
					<Layout>
						<Home />
					</Layout>
				</HappyProvider>
			</AntdApp>
		</ConfigProvider>
	);
};

export default App;

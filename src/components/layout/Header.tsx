import type React from "react";
import { Button, Layout, Space, theme, Image, Typography, Grid } from "antd";
import { MoonOutlined, ReloadOutlined, SunOutlined } from "@ant-design/icons";
import { useLocalStorage } from "../../hooks/localStorage";
import { LocalStorage } from "../../common/enums";
import { CONFIG } from "../../common/constants";

const { useToken } = theme;
const Title = Typography.Title;

export const Header: React.FC = () => {
	const { token } = useToken();
	const [themeMode, setThemeMode] = useLocalStorage(
		LocalStorage.THEME_MODE,
		"light"
	);
	const breakpoint = Grid.useBreakpoint();
	const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;

	const headerStyles: React.CSSProperties = {
		backgroundColor: token.colorBgElevated,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0px 24px",
		height: "64px",
		position: "sticky",
		top: 0,
		zIndex: 999,
	};

	return (
		<Layout.Header style={headerStyles}>
			<div>
				<Space>
					<div>
						<Image src="merlin.png" width={42} preview={false} />
					</div>
					{isSmall && (
						<Title
							style={{
								fontSize: "inherit",
								fontWeight: 700,
							}}
						>
							{CONFIG.appName}
						</Title>
					)}
				</Space>
			</div>
			<Space align="center" size="middle">
				<Button
					style={{ textAlign: "left" }}
					icon={<ReloadOutlined />}
					onClick={() => {
						window.location.reload();
					}}
					block
				>
					{"Refresh"}
				</Button>
				<Button
					style={{ textAlign: "left" }}
					icon={themeMode === "light" ? <MoonOutlined /> : <SunOutlined />}
					onClick={() => {
						setThemeMode(themeMode === "light" ? "dark" : "light");
					}}
					block
				>
					{themeMode === "light" ? "Dark mode" : "Light mode"}
				</Button>
			</Space>
		</Layout.Header>
	);
};

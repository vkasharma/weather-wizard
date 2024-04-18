import type React from "react";

import { Grid, Layout as AntdLayout } from "antd";

import { Header } from "./Header";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
	const breakpoint = Grid.useBreakpoint();
	const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;

	return (
		<AntdLayout style={{ minHeight: "100vh" }}>
			<AntdLayout>
				<Header />
				<AntdLayout.Content
					style={{
						padding: isSmall ? 18 : 9,
					}}
				>
					{children}
				</AntdLayout.Content>
			</AntdLayout>
		</AntdLayout>
	);
};

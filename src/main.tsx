import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<App />);
}

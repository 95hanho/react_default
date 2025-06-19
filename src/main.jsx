import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import store from "./reducers/index.js";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosInterceptor } from "./AxiosInterceptor";
import PropTypes from "prop-types";
import { AuthProvider } from "./AuthProvider";

export default function AppProvider({ children }) {
	return (
		<>
			<AxiosInterceptor>
				<AuthProvider>{children}</AuthProvider>
			</AxiosInterceptor>
			{import.meta.env.VITE_OUTDIR == "test" && (
				/* 데이터확인용 */
				<ReactQueryDevtools />
			)}
		</>
	);
}

AppProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

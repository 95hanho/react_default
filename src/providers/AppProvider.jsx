import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PropTypes from "prop-types";
import AxiosInterceptor from "./AxiosInterceptor";
import AuthProvider from "./AuthProvider";

export default function AppProvider({ children }) {
	return (
		<>
			<AuthProvider>
				<AxiosInterceptor>{children}</AxiosInterceptor>
			</AuthProvider>
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

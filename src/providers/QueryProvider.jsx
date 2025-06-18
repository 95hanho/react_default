import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import PropTypes from "prop-types";

// react-query 사용하기 위한 컴포넌트
export default function QueryProvider({ children }) {
	const [queryClient] = useState(() => new QueryClient());

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

QueryProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

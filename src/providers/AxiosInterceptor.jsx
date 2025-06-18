import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { instance } from "../api/instance";

const AxiosInterceptor = ({ children }) => {
	const location = useLocation();

	// 요청 성공
	const requestFulfill = async (config) => {
		console.log(config.url);

		if (config.url.startsWith("/bapi")) {
			// config.url = import.meta.env.VITE_BASEURL + config.url;
		}

		return config;
	};
	// 요청 에러
	const requestReject = (err) => {
		console.log(err.message + "--->>>" + err.config.url);
		return Promise.reject(err);
	};
	// 응답 성공
	const responseFulfill = (res) => {
		return res;
	};
	// 응답 에러
	const responseReject = (err) => {
		return Promise.reject(err.response);
	};

	const requestInterceptors = instance.interceptors.request.use(requestFulfill, requestReject);
	const responseInterceptors = instance.interceptors.response.use(responseFulfill, responseReject);
	useEffect(() => {
		return () => {
			instance.interceptors.request.eject(requestInterceptors);
			instance.interceptors.response.eject(responseInterceptors);
		};
	}, [location.pathname, requestInterceptors, responseInterceptors]);

	return children;
};

export { AxiosInterceptor };

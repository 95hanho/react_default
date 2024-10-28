import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const instance = axios.create({
	// baseURL: "https://m-dev.exc.co.kr",
	// baseURL: "https://apihome.exc.co.kr",
	//   baseURL: "http://localhost:9238",
});

const baseURL1 = "https://apihome.exc.co.kr";

const AxiosInterceptor = ({ children }) => {
	const location = useLocation();

	// 요청 성공
	const requestFulfill = async (config) => {
		// console.log(config);
		if (config.url.startsWith("/api")) {
			config.baseURL = baseURL1;
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
		return Promise.reject(err.response.data);
	};

	const requestInterceptors = instance.interceptors.request.use(requestFulfill, requestReject);
	const responseInterceptors = instance.interceptors.response.use(responseFulfill, responseReject);
	useEffect(() => {
		return () => {
			instance.interceptors.request.eject(requestInterceptors);
			instance.interceptors.response.eject(responseInterceptors);
		};
	}, [location.pathname]);

	return children;
};

export default instance;
export { AxiosInterceptor };

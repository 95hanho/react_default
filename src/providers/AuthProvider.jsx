import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useTestUserToken from "../hooks/test/useTestUserToken";
import { isTokenExpired } from "../libs/auth";
import { authContext } from "../contexts/authContext";
import { getCookie, hasCookie, removeCookie, setCookie } from "../libs/cookie";

export const AuthProvider = ({ children }) => {
	// const navigate = useNavigate();
	const [loginOn, set_loginOn] = useState(false);
	const [accessToken, set_accessToken] = useState(null);

	const { mutate: reissueToken } = useTestUserToken();

	useEffect(() => {
		// console.log(accessToken);
	}, [accessToken]);

	const loginToken = (aToken, rToken) => {
		set_loginOn(true);
		setTokens(aToken, rToken);
	};

	const setTokens = (aToken, rToken) => {
		console.log("setTokens");
		set_accessToken(aToken);
		localStorage.setItem("accessToken", aToken);
		setCookie("refreshToken", rToken, 60 * 10); // 10분
	};

	const tokenCheck = () => {
		if (!loginOn) return;
		console.log("tokenCheck", accessToken);
		const rToken = getCookie("refreshToken");
		if (!rToken || (rToken && isTokenExpired(rToken)) || !accessToken) logout();
		else if (accessToken && isTokenExpired(accessToken)) {
			console.log("리토큰 실행");
			reissueToken(
				{ refresh_token: rToken },
				{
					onSuccess(data) {
						console.log(data);
					},
					onError(err) {
						console.log(err);
					},
				}
			);
		} else {
			console.log("로그인토큰 유지");
		}
	};

	const logout = async () => {
		console.log("로그아웃");
		set_loginOn(false);
		set_accessToken(null);
		localStorage.removeItem("accessToken");
		removeCookie("refreshToken");
	};

	useEffect(() => {
		const aToken = localStorage.getItem("accessToken");
		if (aToken) set_accessToken(aToken);
		set_loginOn(hasCookie("refreshToken"));
	}, []);

	return <authContext.Provider value={{ loginOn, accessToken, loginToken, logout, tokenCheck }}>{children}</authContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

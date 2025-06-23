import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useTestUserToken from "../hooks/test/useTestUserToken";
import { isTokenExpired } from "../libs/auth";
import { authContext } from "../contexts/authContext";
import { getCookie, hasCookie, removeCookie, setCookie } from "../libs/cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/* 인증관련 설정 */
export default function AuthProvider({ children }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, set_loading] = useState(true); // 토큰 검사 후 실행 로딩
	const [loginOn, set_loginOn] = useState(false); // 로그인이 돼있는지
	const [accessToken, set_accessToken] = useState(null); // 인증토큰

	const { mutate: reissueToken } = useTestUserToken();

	useEffect(() => {
		// console.log(accessToken);
	}, [accessToken]);

	// 토큰 세팅
	const setTokens = (aToken, rToken) => {
		console.log("setTokens");
		set_accessToken(aToken);
		localStorage.setItem("accessToken", aToken);
		setCookie("refreshToken", rToken, 60 * 10); // 10분
	};

	// 로그인 시 세팅
	const loginToken = (aToken, rToken) => {
		set_loginOn(true);
		setTokens(aToken, rToken);
	};

	// 토큰 재발급
	const reissueAccessToken = () => {
		const rToken = getCookie("refreshToken");
		// console.log("reissueAccessToken =>", rToken);

		return new Promise((resolve, reject) => {
			if (!rToken || isTokenExpired(rToken)) {
				logout();
				navigate("/");
				reject("Refresh token expired");
				return;
			}
			reissueToken(
				{ refresh_token: rToken },
				{
					onSuccess(data) {
						setTokens(data.access_token, data.refresh_token);
						resolve(data.access_token); // ✅ 새 accessToken 반환
					},
					onError(err) {
						console.log("재발급 실패", err);
						logout();
						navigate("/");
						reject(err);
					},
				}
			);
		});
	};

	// 로그아웃
	const logout = async () => {
		console.log("로그아웃");
		dispatch({ type: "loding/LODING_OFF" });
		set_loginOn(false);
		set_accessToken(null);
		localStorage.removeItem("accessToken");
		removeCookie("refreshToken");
	};

	// 새로고침or처음로드 시 토큰검사
	useEffect(() => {
		const aToken = localStorage.getItem("accessToken");
		if (aToken) set_accessToken(aToken);
		set_loginOn(hasCookie("refreshToken"));
		set_loading(false); // 초기 새로고침 시 동작
	}, []);

	if (loading) return null; // 처음 새로고침 시 useEffect를 무조건 하고 실행하기
	return <authContext.Provider value={{ loginOn, accessToken, loginToken, reissueAccessToken, logout }}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

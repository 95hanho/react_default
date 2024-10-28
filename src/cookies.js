import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, minutes, secure) => {
	cookies.set(name, value, {
		maxAge: 60 * minutes,
		secure: secure ? secure : false,
		path: "/",
	});
};

export const getCookie = (name) => {
	return cookies.get(name, { path: "/" });
};

export const removeCookie = (name) => {
	cookies.remove(name, { path: "/" });
};

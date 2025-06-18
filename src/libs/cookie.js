import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name) => cookies.get(name);
export const setCookie = (name, value, seconds) => {
	cookies.set(name, value, {
		path: "/",
		secure: true,
		expires: new Date(Date.now() + seconds * 1000),
	});
};
export const removeCookie = (name) => {
	cookies.remove(name);
};
export const hasCookie = (name) => {
	return cookies.get(name) ? true : false;
};

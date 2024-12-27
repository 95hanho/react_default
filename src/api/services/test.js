import { get_normal, post_urlFormData } from "../apiFilter";

export const testLogin = () => post_urlFormData().then(({data}) => data);
export const testAPI = () => {
	return get_normal("http://localhost:9367/api/users").then((res) => {
		return res.data;
	});
};
export const getUsers = () => {
	return get_normal("http://localhost:9367/api/users").then((res) => {
		return res.data;
	});
};
export const noticeAPI = () => {
	return get_normal("/notice.json");
};
export const boardAPI = () => {
	return get_normal("/board.json");
};
export const communityAPI = () => {
	return get_normal("/community.json");
};

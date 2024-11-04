import { get_normal } from "./apiDOC";

// 아이디 중복체크
export const id_duplCheck_before = () => {
	return get_normal("");
};
// 회원가입
export const joinUser = (obj) => {
	return post_urlFormData(`http://localhost:9367/api/user`, obj).then(({ data }) => {
		return data;
	});
};

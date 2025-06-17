import { get_normal, post_urlFormData } from "../apiFilter";

// 아이디 중복체크
// export const id_duplCheck = (id) => {
// 	return get_normal(`/api/user/id/${id}`);
// };
export const id_duplCheck = (id) => {
	return get_normal(`/api/user/id/${id}`);
};
// 회원가입
export const joinUser = (obj) => {
	return post_urlFormData(`/api/user/sign-up`, obj);
};

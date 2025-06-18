import { useMutation } from "@tanstack/react-query";
import { post_urlFormData } from "../../api/apiFilter";
import { API_URL } from "../../api/endpoints";

export default function useTestUserToken() {
	return useMutation({
		mutationFn: async (refresh_token) => (await post_urlFormData(API_URL.TEST_USER_TOKEN, { refresh_token })).data,
	});
}

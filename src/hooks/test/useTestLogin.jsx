import { useMutation } from "@tanstack/react-query";
import { post_urlFormData } from "../../api/apiFilter";
import { API_URL } from "../../api/endpoints";

export default function useTestLogin() {
	return useMutation({
		mutationFn: async (obj) => (await post_urlFormData(API_URL.TEST_USER, { ...obj })).data,
	});
}

import { useMutation } from "@tanstack/react-query";
import { post_urlFormData } from "../../api/apiFilter";
import { API_URL } from "../../api/endpoints";

export default function useTestPhoneAuth() {
	return useMutation({
		mutationFn: async (phone) => (await post_urlFormData(API_URL.TEST_PHONE_AUTH, { phone })).data,
	});
}

import { useMutation } from "@tanstack/react-query";
import { get_normal } from "../../api/apiFilter";
import { API_URL } from "../../api/endpoints";

export default function useTestIdDuplCheck() {
	return useMutation({
		queryFn: async (id) => (await get_normal(API_URL.TEST_ID_DUPL_CHECK, { id })).data,
	});
}

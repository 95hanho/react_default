import { useQuery } from "@tanstack/react-query";
import { get_normal } from "../../api/apiFilter";
import { API_URL } from "../../api/endpoints";

export default function useTestgetUserInfo(id) {
	return useQuery({
		queryKey: ["testGetUserInfo", { id }],
		queryFn: () => get_normal(API_URL.TEST_USER, { id }),
		select: (res) => res.data,
	});
}

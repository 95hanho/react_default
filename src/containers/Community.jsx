import { useEffect } from "react";
import { communityAPI } from "../services/test";

export default function Community() {
	console.log("Community");

	useEffect(() => {
		communityAPI().then(({ data }) => {
			console.log(data);
		});
	}, []);

	return <h2>Community</h2>;
}

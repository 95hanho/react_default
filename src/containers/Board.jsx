import { useEffect } from "react";
import { boardAPI } from "../services/test";

export default function Board() {
	console.log("Board");

	useEffect(() => {
		boardAPI().then(({ data }) => {
			console.log(data);
		});
	}, []);

	return <h2>Board</h2>;
}

import { Link, useLocation } from "react-router-dom";

export default function Nav() {
	const location = useLocation();

	if (location.pathname !== "/") {
		return (
			<div>
				<Link to={"/1"}>notice</Link>|<Link to={"/2"}>board</Link>|<Link to={"/3"}>community</Link>
			</div>
		);
	}
}

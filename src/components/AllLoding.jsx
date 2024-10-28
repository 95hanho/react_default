import { useSelector } from "react-redux";
import "./AllLoding.css";

export default function AllLoding() {
	const lodingOn = useSelector((state) => state.loding.ing);

	if (lodingOn) {
		return (
			<div className="loding-wrap">
				<div>로딩 아이콘</div>
			</div>
		);
	}
}

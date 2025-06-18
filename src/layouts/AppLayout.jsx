import PropTypes from "prop-types";
import AllLoding from "../components/AllLoding";
import Nav from "../components/Nav";

export default function AppLayout({ children }) {
	return (
		<>
			<Nav />
			{children}
			<AllLoding />
		</>
	);
}

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

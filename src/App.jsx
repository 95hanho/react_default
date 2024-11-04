import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Notice from "./containers/Notice.jsx";
import { useEffect, useState } from "react";
import Board from "./containers/Board.jsx";
import Community from "./containers/Community.jsx";
import { testAPI } from "./services/test.js";
import { AxiosInterceptor } from "./hooks/AxiosInterceptor.jsx";
import AllLoding from "./components/AllLoding.jsx";
import Login from "./containers/Login.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserSearch from "./containers/UserSearch.jsx";
import UserSignUp from "./containers/UserSignUp.jsx";
import UserFindId from "./containers/UserFindId.jsx";
import UserFindPwd from "./containers/UserFindPwd.jsx";
import UserChangePwd from "./containers/UserChangePwd.jsx";

const queryClient = new QueryClient();

const Change_router = () => {
	const location = useLocation();
	useEffect(() => {
		// testAPI().then(({ data }) => {
		// console.log(data);
		// });
	}, [location.pathname]);
};

function App() {
	return (
		<>
			<div className="wrapper">
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<AxiosInterceptor>
							<Change_router />
							<Routes>
								{/* 로그인 */}
								<Route path="/" element={<Login />} />
								{/* 회원가입 */}
								<Route path="/user/sign-up" element={<UserSignUp />} />
								{/* 아이디찾기 */}
								<Route path="/user/find-id" element={<UserFindId />} />
								{/* 비밀번호찾기 */}
								<Route path="/user/find-pwd" element={<UserFindPwd />} />
								{/* 비밀번호변경 */}
								<Route path="/user/change-pwd" element={<UserChangePwd />} />

								<Route path="/user-search" element={<UserSearch />} />
								<Route path="/1" element={<Notice />} />
								<Route path="/1" element={<Notice />} />
								<Route path="/2" element={<Board />} />
								<Route path="/3" element={<Community />} />
							</Routes>
						</AxiosInterceptor>
					</BrowserRouter>
					<AllLoding />
					<ReactQueryDevtools /> {/* 데이터확인용 */}
				</QueryClientProvider>
			</div>
		</>
	);
}

export default App;

import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import UserSignUp from "../pages/UserSignUp";
import UserFindId from "../pages/UserFindId";
import UserFindPwd from "../pages/UserFindPwd";
import UserChangePwd from "../pages/UserChangePwd";
import UserSearch from "../pages/UserSearch";
import AppLayout from "../layouts/AppLayout";
import AppProvider from "../providers/AppProvider";

const router = createBrowserRouter([
	{
		/* 로그인 */
		path: "/",
		element: (
			<AppProvider>
				<AppLayout>
					<Outlet />
				</AppLayout>
			</AppProvider>
		),
		children: [
			{
				path: "/",
				element: <Login />,
			},
			{
				/* 회원가입 */
				path: "/user/sign-up",
				element: <UserSignUp />,
			},
			{
				/* 아이디 찾기 */
				path: "/user/find-id",
				element: <UserFindId />,
			},
			{
				/* 비밀번호 찾기 */
				path: "/user/find-pwd",
				element: <UserFindPwd />,
			},
			{
				/* 비밀번호 변경 */
				path: "/user/change-pwd",
				element: <UserChangePwd />,
			},
			{
				path: "/user-search",
				element: <UserSearch />,
			},
			{
				path: "/1",
			},
			{
				path: "/2",
			},
			{
				path: "/3",
			},
		],
	},
]);

export default router;

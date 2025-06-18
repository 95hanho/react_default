import { useNavigate } from "react-router-dom";
import useTestLogin from "../hooks/test/useTestLogin";
import { useState } from "react";
import styled from "@emotion/styled";
import useAuth from "../hooks/context/useAuth";

const LoginMain = styled.div`
	padding: 30px;
`;

export default function Login() {
	const navigate = useNavigate();

	const [user, set_user] = useState({
		id: "hoseongs",
		password: "aaaaaa1!",
	});

	const { loginToken, loginOn } = useAuth();
	const { mutate: login } = useTestLogin();

	const login_before = (e) => {
		console.log("login_before");
		e.preventDefault();
		if (!user.id) {
			alert("아이디를 입력해주세요.");
			return;
		}
		if (!user.password) {
			alert("비밀번호를 입력해주세요.");
			return;
		}
		login(
			{ ...user },
			{
				onSuccess(data) {
					console.log(data);
					// navigate("/1");
					loginToken(data.access_token, data.refresh_token);
				},
				onError(err) {
					console.log(err);
					if (err.status === 400) {
						alert(err.data.msg);
						return;
					}
					alert("서버 오류!!");
				},
			}
		);
	};

	if (!loginOn) {
		return (
			<LoginMain id="login">
				<form onSubmit={login_before}>
					<h4>로그인</h4>
					<div>
						아이디:{" "}
						<input
							type="text"
							value={user.id}
							onChange={(e) =>
								set_user((prev) => ({
									...prev,
									id: e.target.value,
								}))
							}
						/>
					</div>
					<div>
						비밀번호:{" "}
						<input
							type="password"
							autoComplete="false"
							value={user.password}
							onChange={(e) => set_user((prev) => ({ ...prev, password: e.target.value }))}
						/>
					</div>
					<div>
						<input type="submit" value={"로그인"} /> <input type="button" value={"회원가입"} onClick={() => navigate("/user/sign-up")} />{" "}
						<input type="button" value={"아이디찾기"} onClick={() => navigate("/user/sign-up")} />{" "}
						<input type="button" value={"비밀번호찾기"} onClick={() => navigate("/user/sign-up")} />
					</div>
				</form>
			</LoginMain>
		);
	}
}

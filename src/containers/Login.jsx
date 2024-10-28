import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();

	const login_before = (e) => {
		e.preventDefault();
		console.log("login_before");
		navigate("/1");
	};

	return (
		<div>
			<form onSubmit={login_before}>
				<h4>로그인</h4>
				<div>
					아이디: <input type="text" />
				</div>
				<div>
					비밀번호: <input type="password" autoComplete="false" />
				</div>
				<div>
					<input type="submit" value={"로그인"} />{" "}
					<input type="button" value={"회원가입"} onClick={() => navigate("/user")} />
				</div>
			</form>
		</div>
	);
}

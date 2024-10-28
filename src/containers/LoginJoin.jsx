import { useState } from "react";
import { joinUser } from "../services/test";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function LoginJoin() {
	const navigate = useNavigate();

	let [message, set_message] = useState("");
	const [user, set_user] = useState({
		id: "",
		nickName: "",
		password: "",
	});
	const joinUser_fn = useMutation({
		mutationFn: () => joinUser(user),
		onMutate(a, b, c) {},
		onSuccess(a, b, c) {
			console.log(a, b, c);
			navigate("/user-search");
		},
		onError(a, b, c) {
			console.log(a, b, c);
		},
		// 결과에 관계 없이 무언가 실행됨
		onSettled(a, b, c) {
			// console.log(a, b, c);
		},
	});

	const joinUser_before = (e) => {
		e.preventDefault();
		let m = "";
		if (!user.id) m = "* 아이디를 입력해주세요.";
		else if (!user.nickName) m = "* 닉네임를 입력해주세요.";
		else if (!user.password) m = "* 비밀번호를 입력해주세요.";

		set_message(m);
		if (m) return;
		else joinUser_fn.mutate();
	};

	/* 		example.mutate(user, {
				onSuccess(a, b, c) {
					console.log(a, b, c);
				},
			}); */

	return (
		<form onSubmit={joinUser_before}>
			<div>
				아이디 : <input type="text" value={user.id} onChange={(e) => set_user({ ...user, id: e.target.value })} />
			</div>
			<div>
				닉네임 :{" "}
				<input type="text" value={user.nickName} onChange={(e) => set_user({ ...user, nickName: e.target.value })} />
			</div>
			<div>
				비밀번호 :{" "}
				<input
					type="password"
					autoComplete="false"
					value={user.password}
					onChange={(e) => set_user({ ...user, password: e.target.value })}
				/>
			</div>
			<div>
				<input type="submit" value="가입" />
			</div>
			<p className="c_red">{message}</p>
		</form>
	);
}

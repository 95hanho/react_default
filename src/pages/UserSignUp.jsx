import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { id_duplCheck, joinUser } from "../api/services/user";

export default function UserSignUp() {
	const navigate = useNavigate();

	let [id_msg, set_id_msg] = useState("");
	const origin_user = {
		user_id: "",
		user_pwd: "",
		user_name: "",
		email: "",
		user_nickName: "",
	};
	const [user, set_user] = useState(origin_user);
	const change_user = (e) => {
		if (e.target.name == "user_id") {
			if (id_msg) set_id_msg("");
			set_id_duplStatus(false);
		}
		set_user({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const [id_duplStatus, set_id_duplStatus] = useState(false);

	const reset_user = () => {
		set_user({ ...origin_user });
		set_id_msg("");
		set_id_duplStatus(false);
	};
	const joinUser_fn = useMutation({
		mutationFn: () => joinUser(user),
		// Mutation이 시작되기 직전에 특정 작업을 수행
		onMutate(a, b, c) {},
		onSuccess({ data }) {
			console.log(data);
			// reset_user();
			// navigate("/user-search");
			return data;
		},
		onError(err) {
			console.log(err);
			// 사용 가능한 아이디입니다.
		},
		// 결과에 관계 없이 무언가 실행됨
		onSettled(a, b) {
			// console.log(a, b);
		},
	});
	// 알람과 포커스
	const alertAndFocus = (name, ment) => {
		let formEle = document.signUpForm;
		alert(ment);
		formEle[name].focus();
	};

	// 아이디 중복 체크
	const id_duplCheck_before = () => {
		if (!user.user_id) {
			set_id_msg(`'아이디'를(을) 입력해주세요.`);
		} else {
			id_duplCheck(user.user_id)
				.then(({ data }) => {
					set_id_duplStatus(true);
					set_id_msg(`사용가능한 아이디 입니다.`);
				})
				.catch((err) => {
					if (err.code === "ID_DUPLICATED") {
						set_id_msg(`중복된 아이디입니다.`);
					}
					console.log(err);
				});
		}
	};
	const signUpUser_before = (e) => {
		e.preventDefault();
		const regExp_obj = {
			user_pwd: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}$/,
			email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
		};
		const alertAndMark = (name, ment) => {
			if (!user[name]) {
				alertAndFocus(name, `'${ment}'를(을) 입력해주세요.`);
			} else if (regExp_obj[name] && !regExp_obj[name].test(user[name])) {
				alertAndFocus(name, `'${ment}'의 형식에 맞지 않습니다.`);
			} else return false;
			return true;
		};
		const valueName = ["아이디", "비밀번호", "이름", "이메일", "닉네임"];
		const nameList = Object.keys(user);

		for (let index in valueName) {
			if (alertAndMark(nameList[index], valueName[index])) return;
			if (index == 0 && !id_duplStatus) {
				alert("아이디 중복확인을 해주세요.");
				return;
			}
		}
		joinUser_fn.mutate();
	};

	return (
		<section id="userSignUp">
			<form name="signUpForm" onSubmit={signUpUser_before}>
				<div>
					아이디 : <input type="text" name="user_id" value={user.user_id} onChange={change_user} />
					<button type="button" onClick={id_duplCheck_before}>
						중복확인
					</button>
				</div>
				<p className={id_duplStatus ? "c_green" : "c_red"}>{id_msg}</p>
				<div>
					비밀번호 :{" "}
					<input
						type="password"
						autoComplete="false"
						name="user_pwd"
						value={user.user_pwd}
						onChange={change_user}
					/>
				</div>
				<p className="c_red">* 6-15자의 영문+숫자 조합</p>
				<div>
					이름 :{" "}
					<input type="text" name="user_name" value={user.user_name} onChange={change_user} />
				</div>
				<div>
					이메일 : <input type="email" name="email" value={user.email} onChange={change_user} />
				</div>
				<div>
					닉네임 :{" "}
					<input
						type="text"
						name="user_nickName"
						value={user.user_nickName}
						onChange={change_user}
					/>
				</div>
				<div>
					<input type="submit" value="가입" />
				</div>
			</form>
		</section>
	);
}

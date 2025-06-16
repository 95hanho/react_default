import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { joinUser } from "../services/user";

export default function UserSignUp() {
  const navigate = useNavigate();

  let [id_msg, set_id_msg] = useState("");
  let [pwd_msg, set_pwd_msg] = useState("");
  const origin_user = {
    user_id: "",
    user_pwd: "",
    user_name: "",
    email: "",
    user_nickName: ""
  };
  const [user, set_user] = useState(origin_user);
  const change_user = (e) => {
    set_user({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const reset_user = () => {
    set_user({ ...origin_user });
  };
  const joinUser_fn = useMutation({
    mutationFn: () => joinUser(user),
    onMutate(a, b, c) {},
    onSuccess(a, b, c) {
      console.log(a, b, c);
      navigate("/user-search");
    },
    onError(a, b, c) {
      console.log(a, b, c);
      // 사용 가능한 아이디입니다.
    },
    // 결과에 관계 없이 무언가 실행됨
    onSettled(a, b, c) {
      // console.log(a, b, c);
    }
  });
  // 아이디 중복 체크
  const id_duplCheck_before = () => {};
  const signUpUser_before = (e) => {
    e.preventDefault();
    let formEle = document.signUpForm;
    const regExp_obj = {
      user_pwd:
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}$/,
      email:
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    };
    const alertAndMark = (name, ment) => {
      if (!user[name]) {
        alert(`'${ment}'를(을) 입력해주세요.`);
        formEle[name].focus();
      } else if (regExp_obj[name] && !regExp_obj[name].test(user[name])) {
        alert(`'${ment}'의 형식에 맞지 않습니다.`);
        formEle[name].focus();
      } else return false;
      return true;
    };
    const valueName = ["아이디", "비밀번호", "이름", "이메일", "닉네임"];
    const nameList = Object.keys(user);

    for (let index in valueName) {
      if (alertAndMark(nameList[index], valueName[index])) return;
    }
    // joinUser_fn.mutate();
  };

  return (
    <section id="userSignUp">
      <h2>회원가입</h2>
      <form name="signUpForm" onSubmit={signUpUser_before}>
        <div>
          아이디 :{" "}
          <input
            type="text"
            name="user_id"
            value={user.user_id}
            onChange={change_user}
          />
          <button onClick={id_duplCheck_before}>중복확인</button>
        </div>
        <p className="c_red"></p>
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
          <input
            type="text"
            name="user_name"
            value={user.user_name}
            onChange={change_user}
          />
        </div>
        <div>
          이메일 :{" "}
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={change_user}
          />
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

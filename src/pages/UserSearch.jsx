import { css } from "@emotion/css";

export default function UserSearch() {
	console.log("UserSearch");

	return (
		<>
			<h2>User리스트</h2>
			<div
				className={css`
					padding: 10px;
					&:hover {
						color: #f00;
					}
				`}
			>
				<table>
					<thead>
						<tr>
							<th>No. </th>
							<th>아이디</th>
							<th>닉네임</th>
							<th>비번</th>
							<th>생성날짜</th>
							<th>토큰</th>
						</tr>
					</thead>
					<tbody>
						{/* {userList &&
							userList.map((v, i) => (
								<tr key={"userList" + v.id}>
									<td>{i + 1}</td>
									<td>{v.id}</td>
									<td>{v.nickName}</td>
									<td>{v.password}</td>
									<td>{v.createDate}</td>
									<td>{v.refreshToken}</td>
								</tr>
							))} */}
					</tbody>
				</table>
			</div>
		</>
	);
}

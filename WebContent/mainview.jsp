<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		String loginUser = null;
	//	session객체로 업캐스팅되어 있어서 String으로 다운캐스팅한다.
		loginUser = (String)session.getAttribute("loginUser");
		if(loginUser == null){			
	%>
			<script>
				alert("로그인 후 이용하세요");
				location.href = "loginview.jsp";
			</script>
	<%
		}else{
			
	%>
	<table>
		<tr>
			<td><%=loginUser%>님 방문을 환영합니다.</td>
			<td><a href ="logout_session.jsp">로그아웃</a></td>
			<td><a href ="joinOut.jsp">회원 탈퇴</a></td>
		</tr>
	</table>
	<%
		}
	%>
</body>
</html>
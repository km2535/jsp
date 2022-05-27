<%@page import="com.koreait.dao.UserDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>
<jsp:useBean id="newUser" class="com.koreait.dto.UserDTO"></jsp:useBean>
<jsp:setProperty property="*" name="newUser"/>
<%
	/* String [] hobbies = newUser.getUserhobby();
	for(int i = 0; i<hobbies.length; i++){
		System.out.print(hobbies[i]);
	} */
	
	UserDAO udao = new UserDAO();
	if(udao.join(newUser)){
		session.setAttribute("joinUser", newUser);
	%>
		<script>
			alert("회원가입을 축하합니다.");
			location.href="loginview.jsp";
		</script>
	<%
		 
	}else{ 
		
	%>
		<script>
			alert("잠시 후 다시 이용해주세요"); 
			location.href="joinview.jsp";
		</script>
	<%
		
	}
%>
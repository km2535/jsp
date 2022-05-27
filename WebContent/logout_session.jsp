<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	if(session.getAttribute("loginUser") != null){
		// 로그인 정보를 비롯하여 모든 회원 정보를 없애기 위한 코드
		session.invalidate();
		//루트 경로.
		response.sendRedirect(request.getContextPath());
	}
%>
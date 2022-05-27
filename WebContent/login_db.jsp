<%@page import="com.koreait.dao.UserDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	UserDAO udao = new UserDAO(); 
	
	String userid = request.getParameter("userid");
	String userpw = request.getParameter("userpw");
	
	if(udao.login(userid, userpw)){
		//로그인 정보를 저장하기 위해서 세션에 저장한다.
		session.setAttribute("loginUser", userid);
		response.sendRedirect("mainview.jsp");
	}else{
		response.sendRedirect("loginview.jsp?l=f");
	}

%>
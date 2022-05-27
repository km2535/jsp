<%@page import="com.koreait.dao.UserDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	UserDAO udao = new UserDAO(); 
	String userid = request.getParameter("userid");
	
	if(udao.checkId(userid)){
		out.println("O");
	}else{
		out.println("x");
	}

%>
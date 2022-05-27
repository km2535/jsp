package com.koreait.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.koreait.dto.UserDTO;

public class UserDAO {
	Context context;
	DataSource ds;
	Connection conn;
	PreparedStatement ps;
	ResultSet rs;
	
	public boolean join(UserDTO newUser) {
		int result = 0;
		try {
			context = new InitialContext(null);
			ds = (DataSource) context.lookup("java:comp/env/jdbc/mysql");
			conn = ds.getConnection();
			
			String sql = "insert into test_user values(?,?,?,?,?,?,?,?,?)";
			ps = conn.prepareStatement(sql);
			ps.setString(1, newUser.getUserid());
			ps.setString(2, newUser.getUserpw());
			ps.setString(3, newUser.getUsername());
			ps.setString(4, newUser.getUsergender());
			ps.setString(5, newUser.getZipcode());
			ps.setString(6, newUser.getAddr());
			ps.setString(7, newUser.getAddrdetail());
			ps.setString(8, newUser.getAddretc());
			
			String [] hobbies = newUser.getUserhobby();
			String hobbyStr = hobbies[0];
			for (int i = 1; i < hobbies.length; i++) {
				hobbyStr += ","+hobbies[i];
			}
			ps.setString(9, hobbyStr);
			result = ps.executeUpdate();
			
		} catch (NamingException ne) {
			System.out.println(ne);
		}catch (SQLException se) {
			System.out.println(se);
		}
		return result == 1;
	}
	
	public boolean checkId(String userid) {
		try {
			context = new InitialContext(null);
			ds = (DataSource) context.lookup("java:comp/env/jdbc/mysql");
			conn = ds.getConnection();
			
			String sql = "select * from test_user where userid=?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, userid);
			
			rs = ps.executeQuery();
			
			return !rs.next();
			
		} catch (NamingException ne) {
			System.out.println(ne);
		}catch (SQLException se) {
			System.out.println(se);
		}
		return false;
	}
	
	public boolean login(String userid, String userpw) {
		try {
			context = new InitialContext(null);
			ds = (DataSource) context.lookup("java:comp/env/jdbc/mysql");
			conn = ds.getConnection();
			
			String sql = "select * from test_user where userid=? and userpw =?";
			ps = conn.prepareStatement(sql);
			ps.setString(1, userid);
			ps.setString(2, userpw);
			
			rs = ps.executeQuery();
			
			return rs.next();
			
		} catch (NamingException ne) {
			System.out.println(ne);
		}catch (SQLException se) {
			System.out.println(se);
		}
		return false;
	}
}

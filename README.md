# jsp-day-06

![](https://velog.velcdn.com/images/km2535/post/285858d2-31ea-4718-b49a-f5dbf0d6e834/image.jpg)

이번 jsp은 실습위주로 진행되었으며 위 그림과 같이 작성되었다.

## 위 프로젝트는 DBCP, JNDI를 활용하여 작성되었다.

- DBCP세팅하기
  - apache-tomcat >> conf >> context.xml 복사 >> 내 프로젝트 파일 >> WebContent >> META-INF >> 붙여넣기
  - apache-tomcat >> lib >> tomcat-dbcp 복사 >> 내 프로젝트 파일 >> WebContent >> WEB-INF >> lib >> 붙여넣기
  - 이제 아파치 서버를 작동 시킬 때 connect pool에서 connection객체를 가져오기 위해 해당 Resource 파일을 작성한다. Resource는 context.xml파일에 작성하면된다. 외부 API를 만드는 것인데 JNDI에 대한 설명은 아래를 참고한다

## JNDI(Java Naming and Directory Interface)

디렉터리 서비스에서 제공하는 데이터 및 객체를 발견하고 참고하기 위한 자바 API이며 외부에 있는 객체를 가져오기 위한 기술이다.

> JNDI 공식 문서
> https://docs.oracle.com/cd/E19823-01/819-1552/jndi.html

- 외부자원 편집
  - ```jsp
    context.xml
    <Context>
    <!--아래는 기본 작성 form                            -->
    <WatchedResource>WEB-INF/web.xml</WatchedResource>
    <WatchedResource>WEB-INF/tomcat-web.xml</WatchedResource>
    <WatchedResource>${catalina.base}/conf/web.xml</WatchedResource>
    <!-- Uncomment this to disable session persistence across Tomcat restarts -->
    <!--
    context 태그 안에 Resource 태그를 만들어 옵션으로 connection 속성을 채워주면된다.
    -->
    <Resource
       name="jdbc/mysql"
        auth="Container"
    	type="javax.sql.DataSource"
    	driverClassName = "com.mysql.cj.jdbc.Driver"
    	url="jdbc:mysql://localhost:3306/jsp"
    	username="아이디"
    	password="비밀번호"
    	maxActive="20"
    	maxIdle="20"
    	maxWait="-1"
    />
    <!--
    	name		:	dbcp를 이용하기 위한 name(key값)
    	maxActive	:	연결 최대 허용 갯수
    	maxIdle		:	항상 연결상태를 유지하는 개수
    					(보편적으로 maxActive와 maxIdle의 개수를 같게 해준다.)
    	maxWait		:	커넥션 풀에 연결  가능한 커넥션이 없을 경우 대기하는 시간
     -->
     </Context>
    ```

이제 외부 자원까지 세팅을 완료하였다면 DBCP를 활용하기 위한 DAO를 세팅한다.
DAO에는 Context객체를 활용하기 위한 context 객체와 그 context객체를 DataSource 객체화를 위한 준비가 필요한다.

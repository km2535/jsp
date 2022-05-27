function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;
            
            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}
function checkId(){
	const userid = document.joinForm.userid;
	if(userid.value.length<5 || userid.value.length>12){
		alert("아이디는 5자 이상 12자 이하로 입력해주세요!");
		userid.focus();
		return false;
	}
	const result = document.getElementById("result");
	const xhr = new XMLHttpRequest();
	console.log("들어오")
	
	xhr.open("GET","checkId_db.jsp?userid="+userid.value,true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				let txt = xhr.responseText;
				txt = txt.trim();
				if(txt == "O"){
					result.innerHTML = "사용할 수 있는 아이디입니다!";
				}
				else{
					result.innerHTML = "이미 존재하는 아이디입니다!";
				}
				
			}
		}	
	}
	xhr.send();
}
//회원가입 유효성 검사
function join(){
	const joinForm = document.joinForm;
	const result = document.getElementById("result");
	
	const userid = joinForm.userid;
	if(userid.value == ""){
		alert("아이디를 입력하세요!");
		userid.focus();
		//userid.style.borderColor = "red";
		return false;
	}
	if(userid.value.length < 5 || userid.value.length > 12){
		alert("아이디는 5자 이상 12자 이하로 작성해주세요!");
		userid.focus();
		return false;
	}
	//userid.style.borderColor = "black";
	if(result.innerHTML == ""){
		alert("아이디 중복검사를 해주세요!")
		return false;
	}
	if(result.innerHTML != "사용할 수 있는 아이디입니다!"){
		alert("아이디가 중복되었습니다!");
		userid.focus();
		return false;
	}
	const userpw = joinForm.userpw;
	const userpw_re = joinForm.userpw_re;
	if(userpw.value == ""){
		alert("비밀번호를 입력하세요!");
		userpw.focus();
		return false;
	}
	//정규식 
	let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/;
	if(!reg.test(userpw.value)){
		alert("비밀번호는 8자 이상, 숫자, 대문자, 소문자, 특수문자를 모두 포함해야 한다.");
		userpw.focus();
		return false;
	}
	if(userpw.value.length < 8){
		alert("비밀번호는 8자 이상으로 작성해주세요!")
		userpw.focus();
		return false;
	}
	
	if(/(\w)\1\1\1/.test(userpw.value)){
		alert("같은 문자를 4번 이상 연속해서 사용하실 수 없습니다.");
		usserpw.focus();
		return false;
	}
	if(userpw.value.search(" ")!= -1){
		alert("비밀번호는 공백을 포함할 수 없습니다.");
		userpw.focus();
		return false;
	}
	if(userpw_re.value == ""){
		alert("비밀번호 확인을 해주세요!");
		userpw.focus();
		return false;
	}
	if(userpw.value != userpw_re.value){
		alert("비밀번호 확인을 다시 해주세요!");
		userpw.focus();
		return false;
	}
	const username = joinForm.username;
	if(username.value == ""){
		alert("이름을 입력하세요!");
		username.focus();
		return false;
	}
	const zipcode = joinForm.zipcode;
	if(zipcode.value ==""){
		alert("주소찾기 해라");
		sample6_execDaumPostcode();
		return false;
	}
	const addrdetail = joinForm.addrdetail;
	if(addrdetail.value == ""){
		alert("집 없냐?");
		addrdetail.focus();
		return false;
	}
	const hobbies = joinForm.userhobby;
	let check = false;
	console.log(hobbies);
	for(let hobby of hobbies){
		if(hobby.checked){
			check = true;
			break;
		}
	}
	if(!check){
		alert("취미는 1개 이상이다.")
		return false;
	}	
	return true;
}

//로그인 유효성 검사 
function sendit(){
	const userid = document.loginForm.userid;
	const userpw = document.loginForm.userpw;
	
	if(userid.value == ""){
		alert("아이디를 입력하세요!")
		userid.focus();
		return false;
	}
	if(userpw.value == ""){
		alert("비밀번호를 입력하세요!")
		userpw.focus();
		return false;
	}
	return true;
}










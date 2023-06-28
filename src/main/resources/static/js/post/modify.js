/**
 * 포스트 업데이트 & 삭제
 */
document.addEventListener('DOMContentLoaded', ()=>{
    const postModifyForm = document.querySelector('#postModifyForm');
    
    //모든 변수를 밖에다 선언하는건 좋지 않음. 진짜 사용하는 거 함수 안에다가 쓰는게 더 좋은 코드임
    const inputId = document.querySelector('input#id');
    const inputTitle = document.querySelector('input#title');
    const textareaContent = document.querySelector('textarea#content');
    
    const btnUpdate = document.querySelector('#btnUpdate');
    btnUpdate.addEventListener('click' , (e) => {
        //포스트 업데이트
        console.log("update");
        e.preventDefault(); // 기본 동작인 폼 제출 기능을 막음.
        
        const id = inputId.value; // 포스트 번호
        const title = inputTitle.value; // 포스트 제목
        const content = textareaContent.value; // 포스트 내용
        
        if (title === '' || content === '') {
            // 제목 또는 내용이 비어 있으면
            alert('제목과 내용은 반드시 입력해야 합니다.');
            return; // 함수 종료
        }
        
        const result = confirm(`NO.${id} 포스트를 업데이트할까요?`);
        if (!result) {
           return;
        }
         postModifyForm.action = '/post/update'; // 업데이트 요청 주소
         postModifyForm.method = 'post'; // 요청 방식
         postModifyForm.submit(); // 폼 제출(요청 보내기)
        
    });
    
    const btnDelete = document.querySelector('#btnDelete');
    btnDelete.addEventListener('click', (e) => {
        //포스트 삭제
        const id = inputId.value;
        const result = confirm(`NO.${id} 정말 삭제할까요?`);
        console.log(`삭제확인 = ${result}`);
        
        if(!result){
            return;
            }
            
        postModifyForm.action = '/post/delete'; //submit 요청주소
        postModifyForm.method = 'post'; //submit 요청 방식
        postModifyForm.submit(); //폼 제출(submit), 요청 보내기
        
        
    });
    
});

 
 
 
 
 
 
 
 
 
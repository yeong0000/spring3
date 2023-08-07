/**
 * recipe.js
 * 사진업로드
 * 글자수 체크 / 글자수 제한
 * 추가 버튼 클릭
 */

//대표 사진 업로드
document.addEventListener('DOMContentLoaded', () => {
    // 이미지 클릭 시 파일 업로드 창 띄우기
    const uploadImage = document.getElementById("uploadImage");
    const fileInput = document.getElementById("fileInput");
    const previewImage = document.getElementById("previewImage");
    
    uploadImage.addEventListener("click", function() {
        fileInput.click();
    });

    //파일 선택 시 이벤트 처리 미리보기
    fileInput.addEventListener("change", function(){
         // 선택된 파일 정보를 서버로 업로드하거나 필요한 작업 수행
        console.log("Selected file:", this.files[0].name);
        
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function() {
                //미리보기 이미지의 src 속성 설정
                previewImage.src = reader.result;
                //미리보기 이미지 표시
                previewImage.style.display = "block";
                // 파일 업로드 시 이미지를 대체하기 위해 업로드 이미지를 숨김
                uploadImage.style.display = "none";
                
            });

            reader.readAsDataURL(file);
        } else {
            // 파일 선택을 취소하거나 파일이 선택되지 않았을 때, 미리보기 이미지를 숨김
            previewImage.style.display = "none";
            // 미리보기 이미지의 클릭 동작을 기본 설정으로 되돌림
            previewImage.style.cursor = "default";
            // 파일 업로드 시 이미지를 대체하기 위해 업로드 이미지를 다시 표시
            uploadImage.style.display = "block";
        }
    });

});

//글자수 체크 / 제한
document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById("title");
    const contentTextarea = document.getElementById("content");
    const makingTextarea = document.getElementById("making");
    const maxLengthInput = 20;
    const maxLengthTextarea = 240;
    const maxLengthSpan = 150;

    // input 요소에 입력된 텍스트 길이를 표시하는 함수
    function updateTextLength(event) {
        const input = event.target;
        let maxLength;
        let textLengthIndicator;
        
        if (input === titleInput) {
            maxLength = maxLengthInput;
            textLengthIndicator = document.getElementById("CurrentTextLengthInput");
        } else if (input === contentTextarea) {
            maxLength = maxLengthTextarea;
            textLengthIndicator = document.getElementById("CurrentTextLengthTextarea");
        } else if (input === makingTextarea) {
            maxLength = maxLengthSpan;
            textLengthIndicator = document.getElementById("CurrentTextLengthSpan");
        }

        const currentLength = input.value.length;

        if (currentLength > maxLength) {
            input.value = input.value.substring(0, maxLength);
            textLengthIndicator.textContent = `${maxLength}/${maxLength}`;
            alert(`${maxLength}자를 초과하여 입력할 수 없습니다.`);
        } else {
            textLengthIndicator.textContent = `${currentLength}/${maxLength}`;
        }
    }

    // 페이지 로드 시 텍스트 길이 초기화
    updateTextLength({ target: titleInput });
    updateTextLength({ target: contentTextarea });
    updateTextLength({ target: makingTextarea });

    // input 요소와 textarea 요소에 텍스트 입력 시 길이 업데이트
    titleInput.addEventListener("input", updateTextLength);
    contentTextarea.addEventListener("input", updateTextLength);
    makingTextarea.addEventListener("input", updateTextLength);
});

//필수재료 추가 버튼 누르면 input 추가 / 삭제버튼
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ingredientContainer');
    const btnReq = document.getElementById('btnReq');

    btnReq.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.classList.add('d-flex');

        const newInput1 = createInput('Required_Ingredients', '예) 당근');
        const newInput2 = createInput('Required_Ingredients', '예) 1개');
        
         // 삭제 버튼 추가
        const deleteButton = document.createElement('img');
        deleteButton.src = '/image/del.svg';
        deleteButton.alt = '삭제';
        deleteButton.style.cursor = 'pointer';
        deleteButton.addEventListener('click', () => {
            container.removeChild(newRow);
        });
        
        newRow.appendChild(newInput1);
        newRow.appendChild(newInput2);
        
        // 삭제 버튼 추가
        newRow.appendChild(deleteButton);

        container.appendChild(newRow);
    });

    function createInput(name, placeholder) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', name);
        //input.setAttribute('required', 'required');
        //input.setAttribute('autofocus', 'autofocus');
        input.setAttribute('placeholder', placeholder);
        input.classList.add('form-control');
        return input;
    }
});

// 부재료 추가버튼
document.addEventListener('DOMContentLoaded',() => {
    const container = document.getElementById('AddIngredIentContainer');
    const btnAdd = document.getElementById('btnAdd');

    btnAdd.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.classList.add('d-flex');
        const newInput = createInput('Additional_Ingredients', '예) 달걀');
        
        // 삭제 버튼 추가
        const removeButton = document.createElement('img');
        removeButton.src = '/image/del.svg';
        removeButton.alt = '삭제';
        removeButton.style.cursor = 'pointer';
        removeButton.addEventListener('click', () => {
            container.removeChild(newRow);
        });
        
        newRow.appendChild(newInput);
        
        // 삭제 버튼 추가
        newRow.appendChild(removeButton);

        container.appendChild(newRow);
    });

    function createInput(name, placeholder) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', name);
        input.setAttribute('placeholder', placeholder);
        input.classList.add('form-control');
        return input;
    }
});

// 양념 추가버튼
document.addEventListener('DOMContentLoaded',() => {
    const container = document.getElementById('SeaningIngredientContainer');
    const btnSeaning = document.getElementById('btnSeaning');

    btnSeaning.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.classList.add('d-flex');
        const newInput = createInput('Seaning', '예) 소금, 1큰술');
        
        // 삭제 버튼 추가
        const deleteButton = document.createElement('img');
        deleteButton.src = '/image/del.svg';
        deleteButton.alt = '삭제';
        deleteButton.style.cursor = 'pointer';
        deleteButton.addEventListener('click', () => {
            container.removeChild(newRow);
        });
        
        newRow.appendChild(newInput);
        
        // 삭제 버튼 추가
        newRow.appendChild(deleteButton);

        container.appendChild(newRow);
    });

    function createInput(name, placeholder) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', name);
        input.setAttribute('placeholder', placeholder);
        input.classList.add('form-control');
        return input;
    }
});

// 단계추가
document.addEventListener('DOMContentLoaded',() => {
    const container = document.getElementById('makingContainer');
    const btnStep = document.getElementById('btnStep');

    btnStep.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.classList.add('d-flex');
        const newInput = createInput( 'making','만드는 방법을 입력하세요.');
        newRow.appendChild(newInput);

        // 이미지 업로드 영역 추가
        const imageUploadArea = createImageUploadArea();
        newRow.appendChild(imageUploadArea);

        // 삭제 버튼 추가
        const deleButton = document.createElement('img');
        deleButton.src = '/image/del.svg';
        deleButton.alt = '삭제';
        deleButton.style.cursor = 'pointer';
        deleButton.addEventListener('click', () => {
            container.removeChild(newRow);
        });
        
        
        // 삭제 버튼 추가
        newRow.appendChild(deleButton);

        container.appendChild(newRow);
    });

    function createInput(name, placeholder) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', name);
        input.setAttribute('placeholder', placeholder);
        input.classList.add('form-control');
        return input;
    }
    
    //이미지 업로드
    function createImageUploadArea() {
        const imageUploadArea = document.createElement('div');
        imageUploadArea.id = 'recipe-image-upload';

        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.id = 'recipeUploadInput';

        const plusIcon = document.createElement('img');
        plusIcon.id = 'recipeUpload';
        plusIcon.src = '/image/save.svg';
        plusIcon.alt = 'plus-icon';
        plusIcon.style.cursor = 'pointer';

        // 이미지 미리보기
        const imagePreview = document.createElement('img');
        imagePreview.id = 'preImage';
        imagePreview.src = '#';
        imagePreview.alt = 'Image Preview';
        imagePreview.style.display = 'none';

        imageUploadArea.appendChild(fileInput);
        imageUploadArea.appendChild(plusIcon);
        imageUploadArea.appendChild(imagePreview);

        return imageUploadArea;
    }
    
    
});

// 기준량 +,-
document.addEventListener('DOMContentLoaded',()=>{
     // 결과를 표시할 element
  const resultElement = document.getElementById('result');

  // + 버튼 클릭 이벤트
  document.getElementById('plusInput').addEventListener('click', () => {
    let number = parseInt(resultElement.innerText);
    number = number + 1;
    resultElement.innerText = number;
  });

  // - 버튼 클릭 이벤트
  document.getElementById('minusInput').addEventListener('click', () => {
    let number = parseInt(resultElement.innerText);
    number = number - 1;
     
    resultElement.innerText = number;
  });
});


// 만드는 방법 이미지 업로드
document.addEventListener('DOMContentLoaded', () => {
    // 이미지 클릭 시 파일 업로드 창 띄우기
    const recipeUpload = document.getElementById("recipeUpload");
    const recipeUploadInput = document.getElementById("recipeUploadInput");
    const preImage = document.getElementById("preImage");
    
    recipeUpload.addEventListener("click", function() {
        recipeUploadInput.click();
    });

    //파일 선택 시 이벤트 처리 미리보기
    recipeUploadInput.addEventListener("change", function(){
         // 선택된 파일 정보를 서버로 업로드하거나 필요한 작업 수행
        console.log("Selected file:", this.files[0].name);
        
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function() {
                //미리보기 이미지의 src 속성 설정
                preImage.src = reader.result;
                //미리보기 이미지 표시
                preImage.style.display = "block";
                // 파일 업로드 시 이미지를 대체하기 위해 업로드 이미지를 숨김
                recipeUpload.style.display = "none";
                
            });

            reader.readAsDataURL(file);
        } else {
            // 파일 선택을 취소하거나 파일이 선택되지 않았을 때, 미리보기 이미지를 숨김
            preImage.style.display = "none";
            // 미리보기 이미지의 클릭 동작을 기본 설정으로 되돌림
            preImage.style.cursor = "default";
            // 파일 업로드 시 이미지를 대체하기 위해 업로드 이미지를 다시 표시
            recipeUpload.style.display = "block";
        }
    });

});

// Tip추가
document.addEventListener('DOMContentLoaded',() => {
    const container = document.getElementById('TipContainer');
    const btnTip = document.getElementById('btnTip');

    btnTip.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.classList.add('d-flex');
        const newInput = createInput( 'TIP','팁을 입력하세요.');
        newRow.appendChild(newInput);

        // 이미지 업로드 영역 추가
        const imageUploadArea = createImageUploadArea();
        newRow.appendChild(imageUploadArea);

        // 삭제 버튼 추가
        const deleButton = document.createElement('img');
        deleButton.src = '/image/del.svg';
        deleButton.alt = '삭제';
        deleButton.style.cursor = 'pointer';
        deleButton.addEventListener('click', () => {
            container.removeChild(newRow);
        });
        
        
        // 삭제 버튼 추가
        newRow.appendChild(deleButton);

        container.appendChild(newRow);
    });

    function createInput(name, placeholder) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', name);
        input.setAttribute('placeholder', placeholder);
        input.classList.add('form-control');
        return input;
    }
    
    //이미지 업로드
    function createImageUploadArea() {
        const imageUploadArea = document.createElement('div');
        imageUploadArea.id = 'recipe-image-upload';

        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.id = 'recipeUploadInput';

        const plusIcon = document.createElement('img');
        plusIcon.id = 'recipeUpload';
        plusIcon.src = '/image/save.svg';
        plusIcon.alt = 'plus-icon';
        plusIcon.style.cursor = 'pointer';

        // 이미지 미리보기
        const imagePreview = document.createElement('img');
        imagePreview.id = 'preImage';
        imagePreview.src = '#';
        imagePreview.alt = 'Image Preview';
        imagePreview.style.display = 'none';

        imageUploadArea.appendChild(fileInput);
        imageUploadArea.appendChild(plusIcon);
        imageUploadArea.appendChild(imagePreview);

        return imageUploadArea;
    }
    
    
});

/* 핸드메이드 웹: 타이핑 효과 및 페이지 전환 스크립트
   1. 첫 클릭: 숨겨져 있던 본문(.context)이 스르륵 나타남
   2. 두 번째 클릭: 다음 페이지(href)로 이동
*/

let isContentVisible = false; // 본문이 보이는 상태인지 체크하는 변수

function handleTitleClick(event) {
    const linkElement = event.currentTarget;

    // 본문이 아직 안 보이는 상태일 때 (첫 번째 클릭)
    if (!isContentVisible) {
        // 1. 페이지 이동을 막습니다.
        event.preventDefault(); 
        
        // 2. 본문(.context) 요소를 찾아 'visible' 클래스를 추가합니다.
        const context = document.querySelector('.context');
        if (context) {
            context.classList.add('visible');
        }
        
        // 3. 이제 본문이 보인다고 상태를 업데이트합니다.
        isContentVisible = true;
        
        console.log("본문 등장!");
    } 
    // 본문이 이미 보이는 상태일 때 (두 번째 클릭)
    else {
        // 이때는 event.preventDefault()를 실행하지 않으므로, 
        // HTML <a> 태그에 적힌 링크로 자연스럽게 이동합니다.
        console.log("다음 페이지로 이동합니다.");
    }
}
document.getElementById('clip-button').onclick = function() {
    var button = this;
    button.classList.add('shake');
    setTimeout(function() {
        button.classList.remove('shake');
    }, 820); // 애니메이션 지속 시간과 동일하게 설정
};

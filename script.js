document.getElementById('clip-button').onclick = function() {
    var button = this;
    button.classList.add('shake');
    setTimeout(function() {
        button.classList.remove('shake');
    }, 820);
};


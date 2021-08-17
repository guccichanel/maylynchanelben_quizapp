//listen for DOM loaded
window.addEventListener('DOMContentLoaded', (event) => {
    alert('DOM Loaded');
    const startButton = document.getElementById('start-btn');
    startButton.addEventListener('click', function () {
        alert('Game is about to begin');
        fetch('http://localhost:8000/question', {
            method: 'GET'
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            const answer = answer;
        })
    });
});




//middleware
// app.listen(8080, function () {
//     console.log('app listening on port 8080');
// });
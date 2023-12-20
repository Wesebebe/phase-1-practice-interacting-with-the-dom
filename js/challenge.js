// grab elements from the DOM
const counter = document.getElementById('counter');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const likeBtn = document.getElementById('heart');
const likeList = document.querySelector('.likes');
const pauseBtn = document.getElementById('pause');
const form = document.getElementById("comment-form")
const input = document.getElementById("comment-input");
const commentsList = document.querySelector('.comments');

let count = 0;
let intervalId;
let isPaused = false;
const likes = {};
const comments = [];

// This function will update the counter
function counterUpdate() {
    counter.innerText = count;
}

// This function will increment the counter
function incrementCounter() {
    count++;
    counterUpdate();
}

// This function will decrement the counter
function decrementCounter() {
    count--;
    counterUpdate();
}

// pause function it also disables buttons
function pauseCounter() {
    isPaused = true;
    plusBtn.disabled = true;
    minusBtn.disabled = true;
    likeBtn.disabled = true;
    pauseBtn.innerText = 'Resume';
}

// resume function it also resumes counter and enable buttons
function resumeCounter() {
    isPaused = false;
    plusBtn.disabled = false;
    minusBtn.disabled = false;
    likeBtn.disabled = false;
    pauseBtn.innerText = 'Pause';
    startTimerOnPageLoad();
}

// Add event listeners for the plus and minus buttons
plusBtn.addEventListener('click', incrementCounter);
minusBtn.addEventListener('click', decrementCounter);

// this function will update the counter once the page loads
function startTimerOnPageLoad() {
   
    intervalId = setInterval(() => {
        if(!isPaused){
            count++;
            counterUpdate();
        }
    }, 1000);
}

window.onload = () => {
    startTimerOnPageLoad();
}

// functions to handle likes
function likeNumber() {
    if(!likes[count]) {
        likes[count] = 1;
    }else{
        likes[count]++;
    }
    displayLikes();
}

// function to display likes
function displayLikes() {
    likeList.innerHTML = '';
    let list = document.querySelector('ul')
    for(const number in likes) {
        if(likes.hasOwnProperty(number)) {
            const li = document.createElement('li');
            li.textContent = `${number}: ${likes[number]} Likes `
            likeList.appendChild(li)
        }
    }

}

// add comments
function addComments(e) {
    e.preventDefault();
    const comment = input.value;
    if(comment.trim() !== '') {
        comments.push(comment);
        displayComments();
        input.value = '';
    }
}

// display comments
function displayComments() {
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const li = document.createElement('li')
        li.textContent = comment;
        commentsList.appendChild(li);
    }) 
}

// add event listener to the like button
likeBtn.addEventListener('click', likeNumber);

// add event listener for pause/resume button
pauseBtn.addEventListener('click', () => {
    if(isPaused) {
        resumeCounter();
    }else {
        pauseCounter();
    }
})

// Add event listener for form submission
form.addEventListener('submit', addComments)
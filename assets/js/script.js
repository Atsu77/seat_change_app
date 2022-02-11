let timer;
let studentNumbersList = [];

const shuffle = () => {
  for (let i = 0; i < studentNumbersList.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [studentNumbersList[i], studentNumbersList[j]] = [
      studentNumbersList[j],
      studentNumbersList[i],
    ];
  }
  return studentNumbersList;
};

const showSeatBox = () => {
  let innerHTML = "";
  studentNumbersList.forEach(
    (i) => (innerHTML += `<div class="seat__item">${i}</div>`)
  );

  document.querySelector("#seat").innerHTML = innerHTML;
};

const soundPlay = () => {
  const audioElement = new Audio();
  audioElement.src = 'assets/audio/drum.mp3';
  audioElement.play();

  audioElement.addEventListener('ended', () => {
    clearInterval(timer);
  })
}

const setTargetStudents = (studentNumber) => {
  for(let i = 1; i <= studentNumber; i++) {
    studentNumbersList.push(i);
  }

  const absenteeNumbers = document.querySelector("#absence").value;
  const splitAbsenteeNumbers = absenteeNumbers.split(",").map((item) => parseInt(item) )
  console.log(splitAbsenteeNumbers);
  studentNumbersList = studentNumbersList.filter((student) => !splitAbsenteeNumbers.includes(student));
  console.log(studentNumbersList);
}

document.querySelector('#btn-start').addEventListener('click', () => {
  const studentNumber = document.querySelector("#studentNumber").value;
  setTargetStudents(studentNumber);

  document.querySelector('.c-overlay').classList.add('is-closed');
  timer = setInterval(() => {
    shuffle();
    showSeatBox();
  }, 50);

  soundPlay();
})




document.addEventListener('DOMContentLoaded', () => {
  
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.getElementById('laps');
    let timerInterval = null;
    let startTime = 0;
    let elapsedTime = 0;
    let isRunning = false;
    let lapCounter = 0;

   

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        
  
        startTime = Date.now() - elapsedTime;
        
   
        timerInterval = setInterval(updateDisplay, 10);
        
      
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    }

    function pauseTimer() {
        if (!isRunning) return;
        isRunning = false;
        clearInterval(timerInterval);


        elapsedTime = Date.now() - startTime;
        
    
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }

    function resetTimer() {
     
        clearInterval(timerInterval);
        isRunning = false;

        // Reset all state variables
        elapsedTime = 0;
        startTime = 0;
        lapCounter = 0;

        // Reset UI
        display.textContent = '00:00:00.000';
        lapsList.innerHTML = '';
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }

    function recordLap() {
        if (!isRunning) return;
        
        lapCounter++;
        const lapTime = display.textContent;
        
        const li = document.createElement('li');
        li.innerHTML = `<span>Lap ${lapCounter}</span><span>${lapTime}</span>`;
        lapsList.prepend(li); 
    }


    function updateDisplay() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        
        display.textContent = formatTime(elapsedTime);
    }

    function formatTime(timeInMilliseconds) {
        const totalSeconds = Math.floor(timeInMilliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10); 

               const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0');
        const paddedMilliseconds = String(milliseconds).padStart(2, '0');
        
        return `${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
    }

  
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLap);
});
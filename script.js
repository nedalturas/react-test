document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('myButton');
  let gameState = 'idle';
  let startTime;
  let timeoutId;

  button.addEventListener('click', handleClick);

  function handleClick() {
    switch (gameState) {
      case 'idle':
        startGame();
        break;
      case 'waiting':
        tooSoon();
        break;
      case 'ready':
        endGame();
        break;
      case 'ended':
        resetGame();
        break;
    }
  }

  function startGame() {
    gameState = 'waiting';
    button.textContent = 'Wait for green...';
    button.style.backgroundColor = 'red';

    const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
    timeoutId = setTimeout(() => {
      gameState = 'ready';
      button.style.backgroundColor = 'green';
      startTime = Date.now();
    }, randomDelay);
  }

  function tooSoon() {
    clearTimeout(timeoutId);
    gameState = 'ended';
    button.textContent = 'Too soon! Click to restart';
    button.style.backgroundColor = 'orange';
  }

  function endGame() {
    const endTime = Date.now();
    const reactionTime = endTime - startTime;
    gameState = 'ended';
    button.textContent = `Your reaction time: ${reactionTime}ms\nClick to restart`;
    button.style.backgroundColor = 'blue';
    button.style.color = 'white';

  }

  function resetGame() {
    gameState = 'idle';
    button.textContent = 'Click to start';
    button.style.backgroundColor = '';
  }

  // Initialize the button
  resetGame();
});

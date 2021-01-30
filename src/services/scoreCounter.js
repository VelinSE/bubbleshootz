const scoreCounter = () => {
  const scoreModal = document.querySelector('#score_modal');
  const scoreElement = document.querySelectorAll('#score_number');
  let scoreNumber = 0;

  const updateScore = (number) => {
    scoreNumber += number;

    scoreElement.forEach((se) => {
      const element = se;
      element.innerHTML = scoreNumber;
    });
  };

  const showModal = () => {
    scoreModal.classList.remove('hide');
  };

  const hideModal = () => {
    scoreModal.classList.add('hide');
  };

  return {
    updateScore,
    showModal,
    hideModal,
  };
};

export default scoreCounter;

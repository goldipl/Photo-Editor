const closeBtn = document.querySelector('.modal .modal__footer .modal__btn.close');
const micromodal = document.querySelector('.modal.micromodal-slide');

closeBtn.addEventListener('click', () => {
    micromodal.classList.add('hide');
});
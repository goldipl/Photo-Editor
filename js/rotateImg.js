const showImg = document.querySelector(".right_container .image_container img");
let count = 1;

export const rotateLeft = () => {
    let counter = count * 90;
    count++;
    showImg.style.transform = `rotate(-${counter}deg)`;
};

export const rotateRight = () => {
    let counter = count * 90;
    count++;
    showImg.style.transform = `rotate(${counter}deg)`;
};
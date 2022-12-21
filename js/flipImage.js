const showImg = document.querySelector(".right_container .image_container img");
const flipVerticalBtn = document.querySelector(".other_options_container .flip-vertical");
const flipHorizontalBtn = document.querySelector(".other_options_container .flip-horizontal");

export const flipVertical = () => {
    let vertCounter = 1;
    if (flipVerticalBtn.classList.contains("flippedX")) {
        showImg.style.transform = `scaleX(${vertCounter})`;
        flipVerticalBtn.classList.remove("flippedX");
    } else {
        showImg.style.transform = `scaleX(-${vertCounter})`;
        flipVerticalBtn.classList.add("flippedX");
    }
};

export const flipHorizontal = () => {
    let horizCounter = 1;
    if (flipHorizontalBtn.classList.contains("flippedY")) {
        showImg.style.transform = `scaleY(${horizCounter})`;
        flipHorizontalBtn.classList.remove("flippedY");
    } else {
        showImg.style.transform = `scaleY(-${horizCounter})`;
        flipHorizontalBtn.classList.add("flippedY");
    }
};
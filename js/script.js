import { flipHorizontal, flipVertical } from "./flipImage.js";
import { rotateLeft, rotateRight } from "./rotateImg.js";
import { saveBtn } from "./saveImg.js";
const fileUpload = document.getElementById("file-upload");
const addImgBtn = document.querySelector(".add-image-btn");
const filterBtns = document.querySelectorAll(".filters_container > button");
const filterRange = document.querySelector(".range_container input[type='range']");
const filterRangeValue = document.querySelector(".range_container .range-value");
const filterTitle = document.querySelector(".range_container .range_info .range-title");
const showImg = document.querySelector(".right_container .image_container img");
const rotateLeftBtn = document.querySelector(".other_options_container .rotate-left");
const rotateRightBtn = document.querySelector(".other_options_container .rotate-right");
const flipVerticalBtn = document.querySelector(".other_options_container .flip-vertical");
const flipHorizontalBtn = document.querySelector(".other_options_container .flip-horizontal");
const resetButton = document.querySelector(".left_buttons_container .reset-btn");
const saveButton = document.querySelector(".right_buttons_container .save-image-btn");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0, blur = 0, contrast = 100;

const useFilters = () => {
    showImg.style.filter =`brightness(${brightness}%) 
        saturate(${saturation}%) invert(${inversion}%) 
        grayscale(${grayscale}%) blur(${blur}px) contrast(${contrast}%)`;
}

addImgBtn.addEventListener("click", () => fileUpload.click());

const loadImg = () => {
    // get selected image
    let img = fileUpload.files[0];
    // return if image hasn't selected
    if(!img) return;
    showImg.src = URL.createObjectURL(img);
    showImg.classList.add("active");
}

fileUpload.addEventListener("change", loadImg);

filterBtns.forEach(button => {
    button.addEventListener("click", () => {
        filterBtns.forEach(btnActive => { 
            btnActive.classList.remove("active");
        });
        button.classList.add("active");
        filterTitle.innerText = button.innerText;

        if (button.className === "brightness active") {
            filterRange.max = "200";
            filterRange.value = brightness;
            filterRangeValue.innerText = `${brightness}%`;
        } else if (button.className === "saturation active") {
            filterRange.max = "200";
            filterRange.value = saturation;
            filterRangeValue.innerText = `${saturation}%`;
        } else if (button.className === "inversion active") {
            filterRange.max = "100";
            filterRange.value = inversion;
            filterRangeValue.innerText = `${inversion}%`;
        } else if (button.className === "grayscale active") {
            filterRange.max = "100";
            filterRange.value = grayscale;
            filterRangeValue.innerText = `${grayscale}%`;
        } else if (button.className === "blur active") {
            filterRange.max = "20";
            filterRange.value = blur;
            filterRangeValue.innerText = `${blur}px`;
        } else if (button.className === "contrast active") {
            filterRange.max = "200";
            filterRange.value = contrast;
            filterRangeValue.innerText = `${contrast}%`;
        }
    });
});

const updateRange = () => {
    filterRangeValue.innerText = `${filterRange.value}%`;
    const selectedFilter = document.querySelector(".filters_container .active");

    if (selectedFilter.className === "brightness active") {
        brightness = filterRange.value;
    } else if (selectedFilter.className === "saturation active") {
        saturation = filterRange.value;
    } else if (selectedFilter.className === "inversion active") {
        inversion = filterRange.value;
    } else if (selectedFilter.className === "grayscale active") {
        grayscale = filterRange.value;
    } else if (selectedFilter.className === "blur active") {
        blur = filterRange.value;
        filterRangeValue.innerText = `${filterRange.value}px`;
    } else if (selectedFilter.className === "contrast active") {
        contrast = filterRange.value;
    } 
    useFilters();
};

const resetBtn = () => {
    showImg.style = 0;
    filterRange.value = 100;
    filterRangeValue.innerText = `100%`;
}

saveButton.addEventListener("click", saveBtn)
resetButton.addEventListener("click", resetBtn)
filterRange.addEventListener("input", updateRange);

rotateLeftBtn.addEventListener("click", () => rotateLeft());
rotateRightBtn.addEventListener("click", () => rotateRight());

flipVerticalBtn.addEventListener("click", () => flipVertical());
flipHorizontalBtn.addEventListener("click", () => flipHorizontal());
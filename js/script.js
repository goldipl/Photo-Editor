const fileUpload = document.getElementById("file-upload");
const addImgBtn = document.querySelector(".add-image-btn");
const filterBtns = document.querySelectorAll(".filters_container > button");
const filterRange = document.querySelector(".range_container input[type='range']");
const filterRangeValue = document.querySelector(".range_container .range-value");
const filterTitle = document.querySelector(".range_container .range_info .range-title");
const showImg = document.querySelector(".right_container .image_container img");

addImgBtn.addEventListener("click", () => fileUpload.click());

const loadImg = () => {
    // get selected image
    let img = fileUpload.files[0];
    // return if image hasn't selected
    if(!img) return;
    showImg.src = URL.createObjectURL(img);
    showImg.classList.add("active");
}

filterBtns.forEach(button => {
    button.addEventListener("click", () => {
        filterBtns.forEach(btnActive => { 
            btnActive.classList.remove("active");
        });
        button.classList.add("active");
        filterTitle.innerText = button.innerText;
    });
});

fileUpload.addEventListener("change", loadImg);

const updateRange = () => {
    filterRangeValue.innerText = `${filterRange.value}%`
};

filterRange.addEventListener("input", updateRange);
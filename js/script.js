const fileUpload = document.getElementById("file-upload");
const addImgBtn = document.querySelector(".add-image-btn");
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

fileUpload.addEventListener("change", loadImg);
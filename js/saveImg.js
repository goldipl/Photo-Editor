const showImg = document.querySelector(".right_container .image_container img");

export const saveBtn = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = showImg.width;
    canvas.height = showImg.height;

    ctx.filter = showImg.style.filter;
    ctx.drawImage(showImg, 0, 0, canvas.width, canvas.height);
    
    const savedImage = document.createElement("a");
    savedImage.download = "edited_image.jpeg";
    savedImage.href = canvas.toDataURL();
    savedImage.click();
}
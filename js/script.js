// ---------- Element refs ----------
const fileUpload = document.getElementById("file-upload");
const addImgBtn = document.querySelector(".add-image-btn");
const filterBtns = document.querySelectorAll(".filters_container > button");
const filterRange = document.querySelector(".range_container input[type='range']");
const filterRangeValue = document.querySelector(".range_container .range-value");
const filterTitle = document.querySelector(".range_container .range_info .range-title");
const showImg = document.getElementById("show-img");
const emptyState = document.querySelector(".empty-state");

const rotateLeftBtn = document.querySelector(".other_options_container .rotate-left");
const rotateRightBtn = document.querySelector(".other_options_container .rotate-right");
const flipVerticalBtn = document.querySelector(".other_options_container .flip-vertical");
const flipHorizontalBtn = document.querySelector(".other_options_container .flip-horizontal");

const resetButtons = document.querySelectorAll(".reset-btn, #reset-btn-bottom");
const saveButtons = document.querySelectorAll(".save-image-btn, #save-btn-top");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0, blur = 0, contrast = 100;
let rotateCount = 0;
let flippedX = false, flippedY = false;

// ---------- Filters ----------
const useFilters = () => {
  showImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px) contrast(${contrast}%)`;
};

// ---------- Upload ----------
addImgBtn.addEventListener("click", () => fileUpload.click());

const loadImg = () => {
  const img = fileUpload.files[0];
  if (!img) return;
  showImg.src = URL.createObjectURL(img);
  showImg.classList.add("active");
  emptyState.style.display = "none";
};
fileUpload.addEventListener("change", loadImg);

// ---------- Filter selection ----------
filterBtns.forEach(button => {
  button.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const label = button.textContent.trim();
    filterTitle.innerText = label;

    if (button.classList.contains("brightness")) {
      filterRange.max = "200"; filterRange.value = brightness;
      filterRangeValue.innerText = `${brightness}%`;
    } else if (button.classList.contains("saturation")) {
      filterRange.max = "200"; filterRange.value = saturation;
      filterRangeValue.innerText = `${saturation}%`;
    } else if (button.classList.contains("inversion")) {
      filterRange.max = "100"; filterRange.value = inversion;
      filterRangeValue.innerText = `${inversion}%`;
    } else if (button.classList.contains("grayscale")) {
      filterRange.max = "100"; filterRange.value = grayscale;
      filterRangeValue.innerText = `${grayscale}%`;
    } else if (button.classList.contains("blur")) {
      filterRange.max = "20"; filterRange.value = blur;
      filterRangeValue.innerText = `${blur}px`;
    } else if (button.classList.contains("contrast")) {
      filterRange.max = "200"; filterRange.value = contrast;
      filterRangeValue.innerText = `${contrast}%`;
    }
  });
});

const updateRange = () => {
  const selectedFilter = document.querySelector(".filters_container .active");

  if (selectedFilter.classList.contains("brightness")) {
    brightness = filterRange.value;
    filterRangeValue.innerText = `${filterRange.value}%`;
  } else if (selectedFilter.classList.contains("saturation")) {
    saturation = filterRange.value;
    filterRangeValue.innerText = `${filterRange.value}%`;
  } else if (selectedFilter.classList.contains("inversion")) {
    inversion = filterRange.value;
    filterRangeValue.innerText = `${filterRange.value}%`;
  } else if (selectedFilter.classList.contains("grayscale")) {
    grayscale = filterRange.value;
    filterRangeValue.innerText = `${filterRange.value}%`;
  } else if (selectedFilter.classList.contains("blur")) {
    blur = filterRange.value;
    filterRangeValue.innerText = `${filterRange.value}px`;
  } else if (selectedFilter.classList.contains("contrast")) {
    contrast = filterRange.value;
    filterRangeValue.innerText = `${filterRange.value}%`;
  }
  useFilters();
};
filterRange.addEventListener("input", updateRange);

// ---------- Rotate ----------
const applyTransform = () => {
  const scaleX = flippedX ? -1 : 1;
  const scaleY = flippedY ? -1 : 1;
  showImg.style.transform = `rotate(${rotateCount * 90}deg) scale(${scaleX}, ${scaleY})`;
};

rotateLeftBtn.addEventListener("click", () => { rotateCount--; applyTransform(); });
rotateRightBtn.addEventListener("click", () => { rotateCount++; applyTransform(); });

// ---------- Flip ----------
flipHorizontalBtn.addEventListener("click", () => {
  flippedX = !flippedX;
  flipHorizontalBtn.classList.toggle("flipped", flippedX);
  applyTransform();
});
flipVerticalBtn.addEventListener("click", () => {
  flippedY = !flippedY;
  flipVerticalBtn.classList.toggle("flipped", flippedY);
  applyTransform();
});

// ---------- Reset ----------
resetButtons.forEach(btn => btn.addEventListener("click", () => {
  brightness = 100; saturation = 100; contrast = 100;
  inversion = 0; grayscale = 0; blur = 0;
  rotateCount = 0; flippedX = false; flippedY = false;

  showImg.style.filter = "";
  showImg.style.transform = "";
  flipHorizontalBtn.classList.remove("flipped");
  flipVerticalBtn.classList.remove("flipped");

  filterBtns.forEach(b => b.classList.remove("active"));
  document.querySelector(".filter-chip.brightness").classList.add("active");
  filterTitle.innerText = "Brightness";
  filterRange.max = "200";
  filterRange.value = 100;
  filterRangeValue.innerText = "100%";
}));

// ---------- Save ----------
const saveImage = () => {
  if (!showImg.classList.contains("active")) return;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = showImg.naturalWidth || showImg.width;
  canvas.height = showImg.naturalHeight || showImg.height;

  ctx.filter = showImg.style.filter;
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotateCount * 90 * Math.PI) / 180);
  ctx.scale(flippedX ? -1 : 1, flippedY ? -1 : 1);
  ctx.drawImage(showImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  ctx.restore();

  const savedImage = document.createElement("a");
  savedImage.download = "edited_image.jpeg";
  savedImage.href = canvas.toDataURL("image/jpeg", 0.95);
  savedImage.click();
};
saveButtons.forEach(btn => btn.addEventListener("click", saveImage));
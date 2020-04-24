setColor(e) {
  const colorPickerIcon = document.querySelector('.current_color-icon');
  const prevIcon = document.querySelector('.prev_color-icon');
  this.prevColor = this.currentColor;
  this.currentColor = e.target.value;
  setIconColor(colorPickerIcon, this.currentColor);
  setIconColor(prevIcon, this.prevColor);
  localStorage.setItem('currentColor', this.currentColor);
  localStorage.setItem('prevColor', this.prevColor);
}

setPrevColor() {
  if (!prevColor) {
    return;
  }
  currentColor = prevColor;
  prevColor = 'rgb(216, 216, 216)';
  prevColorLabel.classList.add('disabled');
  setIconColor(colorPickerIcon, currentColor);
  setIconColor(prevIcon, prevColor);
  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('prevColor', prevColor);
}
setColorToRed() {
  prevColor = currentColor;
  currentColor = red;
  prevColorLabel.classList.remove('disabled');
  setIconColor(colorPickerIcon, currentColor);
  setIconColor(prevIcon, prevColor);
  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('prevColor', prevColor);
}

setColorToBlue() {
  prevColor = currentColor;
  currentColor = blue;
  prevColorLabel.classList.remove('disabled');
  prevIcon.classList.add('disabled');
  setIconColor(colorPickerIcon, currentColor);
  setIconColor(prevIcon, prevColor);
  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('prevColor', prevColor);
}

setPrevColor() {
  if (!prevColor) {
    return;
  }
  currentColor = prevColor;
  prevColor = 'rgb(216, 216, 216)';
  prevColorLabel.classList.add('disabled');
  setIconColor(colorPickerIcon, currentColor);
  setIconColor(prevIcon, prevColor);
  localStorage.setItem('currentColor', currentColor);
  localStorage.setItem('prevColor', prevColor);
}


setPixelSize(e) {
  this.pixels = e.target.dataset.pixels;
  this.scale = 512 / this.pixels;
  localStorage.setItem('pixels', this.pixels);
}


// from contentloaded
uploadButton.addEventListener('click', getImage);
saveButton.addEventListener('click', () => {
  drawField.save();
  const imgData = drawField.getImageData(0, 0, 512, 512)
  console.log(imgData)
});
restoreButton.addEventListener('click', () => {
  drawField.restore();
})
grayscaleButton.addEventListener('click', grayscale)

setIconColor(prevColorLabel, app.prevColor);
setIconColor(colorPickerIcon, app.currentColor);
prevColorLabel.addEventListener('click', setPrevColor);
colorPicker.addEventListener('change', (e) => app.setColor(e));
redLabel.addEventListener('click', setColorToRed);
blueLabel.addEventListener('click', setColorToBlue);
pixelOptionsList.addEventListener('click', (e) => app.setPixelSize(e));

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);

canvas.removeEventListener('click', getPixelColor);
canvas.removeEventListener('click', clearCanvas);
canvas.removeEventListener('click', fillCanvas);
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);

canvas.removeEventListener('click', getPixelColor);
canvas.removeEventListener('mousedown', handleMouseDown);
canvas.removeEventListener('mousemove', handleMouseMove);
canvas.removeEventListener('mouseup', handleMouseUp);
canvas.addEventListener('click', fillCanvas);

canvas.removeEventListener('mousedown', handleMouseDown);
canvas.removeEventListener('mousemove', handleMouseMove);
canvas.removeEventListener('mouseup', handleMouseUp);
canvas.removeEventListener('click', clearCanvas);
canvas.removeEventListener('click', fillCanvas);
canvas.addEventListener('click', getPixelColor);

clearCanvas();



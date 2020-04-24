import App from './App';
import config from './config';
import { baseUrl, accessKey } from './unsplashApi';

import '../styles/main.scss';

const app = new App(config);
const toolsList = document.querySelector('.tools');
const colorOptions = document.querySelector('.color_palette');
const pixelOptionsList = document.querySelector('.canvas_sizes');
const imageOptions = document.querySelector('.images');
const canvas = document.querySelector('#canvas');
const drawField = canvas.getContext('2d');
let isDrawing = false;
const position = { x: 0, y: 0 };
const calcPos = (pos) => Math.floor(pos / app.scale) * app.scale;

function handleMouseDown(e) {
  position.x = e.pageX - this.offsetLeft;
  position.y = e.pageY - this.offsetTop;
  isDrawing = true;
  drawField.moveTo(position.x, position.y);
}

function handleMouseMove(e) {
  if (isDrawing) {
    position.x = e.pageX - this.offsetLeft;
    position.y = e.pageY - this.offsetTop;
    drawField.fillStyle = app.currentColor;
    drawField.fillRect(calcPos(position.x), calcPos(position.y), app.scale, app.scale);
  }
}

function handleMouseUp(e) {
  position.x = e.pageX - this.offsetLeft;
  position.y = e.pageY - this.offsetTop;
  drawField.fillStyle = app.currentColor;
  drawField.fillRect(calcPos(position.x), calcPos(position.y), app.scale, app.scale);
  drawField.save();
  isDrawing = false;
}

function fillCanvas() {
  drawField.fillStyle = app.currentColor;
  drawField.fillRect(0, 0, app.pixels * app.scale, app.pixels * app.scale);
}

function getPixelColor(e) {
  position.x = e.pageX - this.offsetLeft;
  position.y = e.pageY - this.offsetTop;
  const imgData = drawField.getImageData(position.x, position.y, 1, 1).data;
  const r = imgData[0];
  const g = imgData[1];
  const b = imgData[2];
  const rgb = `rgb(${r}, ${g}, ${b})`;
  app.setColorToPixel(rgb);
}

function clearCanvas() {
  drawField.fillStyle = '#fff';
  drawField.fillRect(0, 0, app.pixels * app.scale, app.pixels * app.scale);
}

async function getImage() {
  const url = `${baseUrl}/random?query=town,Minsk&client_id=${accessKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const img = new Image();
    img.onload = () => {
      drawField.drawImage(img, 0, 0, 512, 512);
    };
    img.src = data.urls.thumb;
    img.setAttribute('crossOrigin', '');
  } catch (err) {
    drawField.fillText(`Something went wrong ${err.message}`, 5, 50);
  }
}

function saveImage() {
  const imageToSave = canvas.toDataURL();
  localStorage.setItem('saved data', imageToSave);
}

function restoreImage() {
  const savedImage = localStorage.getItem('saved data');
  const img = new Image();
  img.onload = () => {
    drawField.drawImage(img, 0, 0, 512, 512);
  };
  img.src = savedImage;
  img.setAttribute('crossOrigin', '');
}

function grayscale() {
  const imageData = drawField.getImageData(0, 0, 512, 512);
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const grey = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = grey;
    data[i + 1] = grey;
    data[i + 2] = grey;
  }
  drawField.putImageData(imageData, 0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
  app.init();
  canvas.addEventListener('mousedown', () => {
    switch (app.selectedTool) {
      case 'pencil':
        canvas.removeEventListener('click', getPixelColor);
        canvas.removeEventListener('click', fillCanvas);
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        return;
      case 'fill':
        canvas.removeEventListener('click', getPixelColor);
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('click', fillCanvas);
        return;
      case 'color':
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('click', fillCanvas);
        canvas.addEventListener('click', getPixelColor);
        break;
      default: break;
    }
  });
  toolsList.addEventListener('click', (e) => {
    const { tool } = e.target.parentNode.dataset;
    app.setSelectedTool(tool);
  });
  colorOptions.addEventListener('click', (e) => {
    const selectedOption = e.target.parentNode.dataset.color;
    switch (selectedOption) {
      case 'color_input':
        app.handleColorInput();
        break;
      case 'prev':
        app.setColor(app.prevColor);
        break;
      case 'blue':
        app.setColor(app.blue);
        break;
      case 'red':
        app.setColor(app.red);
        break;
      default: break;
    }
  });
  pixelOptionsList.addEventListener('click', (e) => app.setPixelSize(e));
  imageOptions.addEventListener('click', (e) => {
    const selectedOption = e.target.dataset.image;
    switch (selectedOption) {
      case 'clear':
        clearCanvas();
        break;
      case 'upload':
        getImage();
        break;
      case 'save':
        saveImage();
        break;
      case 'restore':
        restoreImage();
        break;
      case 'grayscale':
        grayscale();
        break;
      default: break;
    }
  });
});

import setIconColor from './helpers';

const fieldSize = 512;

export default class App {
  constructor({
    selectedTool, initialColor, defaultColor, blueColor, redColor, pixels,
  }) {
    this.selectedTool = selectedTool;
    this.currentColor = initialColor;
    this.prevColor = defaultColor;
    this.blue = blueColor;
    this.red = redColor;
    this.pixels = pixels;
    this.scale = fieldSize / this.pixels;
    this.defaultColor = defaultColor;
  }

  setSelectedTool(tool) {
    const prevActiveTool = document.querySelector('.active');
    const currentActiveTool = document.querySelector(`.${tool}`);
    if (!tool) {
      return;
    }
    this.selectedTool = tool;
    prevActiveTool.classList.remove('active');
    currentActiveTool.classList.add('active');
    localStorage.setItem('selectedTool', this.selectedTool);
  }

  handleColorInput() {
    const colorPickerIcon = document.querySelector('.current_color-icon');
    const prevIcon = document.querySelector('.prev_color-icon');
    const colorInput = document.getElementById('color-input');
    this.prevColor = this.currentColor;
    colorInput.addEventListener('input', (e) => {
      setIconColor(prevIcon, this.prevColor);
      this.currentColor = e.target.value;
      setIconColor(colorPickerIcon, this.currentColor);
      localStorage.setItem('currentColor', this.currentColor);
    });
    localStorage.setItem('prevColor', this.prevColor);
  }

  setColor(color) {
    const incomingColor = color;
    const colorPickerIcon = document.querySelector('.current_color-icon');
    const prevIcon = document.querySelector('.prev_color-icon');
    this.prevColor = this.currentColor;
    this.currentColor = incomingColor;
    setIconColor(colorPickerIcon, this.currentColor);
    setIconColor(prevIcon, this.prevColor);
    localStorage.setItem('currentColor', this.currentColor);
    localStorage.setItem('prevColor', this.prevColor);
  }

  setColorToPixel(color) {
    const colorPickerIcon = document.querySelector('.current_color-icon');
    const prevIcon = document.querySelector('.prev_color-icon');
    this.prevColor = this.currentColor;
    this.currentColor = color;
    setIconColor(colorPickerIcon, this.currentColor);
    setIconColor(prevIcon, this.prevColor);
    localStorage.setItem('currentColor', this.currentColor);
    localStorage.setItem('prevColor', this.prevColor);
  }

  setPixelSize(e) {
    this.pixels = e.target.dataset.pixels;
    this.scale = 512 / this.pixels;
    localStorage.setItem('pixels', this.pixels);
  }

  init() {
    const tool = localStorage.getItem('selectedTool');
    const currColor = localStorage.getItem('currentColor');
    const currentColorIcon = document.querySelector('.current_color-icon');
    const prevColor = localStorage.getItem('prevColor');
    const prevColorIcon = document.querySelector('.prev_color-icon');
    const pixels = localStorage.getItem('pixels');

    if (tool) {
      this.setSelectedTool(tool);
    } else {
      localStorage.setItem('selectedTool', this.selectedTool);
    }

    if (currColor) {
      this.currentColor = currColor;
      setIconColor(currentColorIcon, this.currentColor);
    } else {
      localStorage.setItem('currentColor', this.currentColor);
      setIconColor(currentColorIcon, this.currentColor);
    }

    if (prevColor) {
      this.prevColor = prevColor;
      setIconColor(prevColorIcon, this.prevColor);
    } else {
      localStorage.setItem('prevColor', this.prevColor);
      setIconColor(prevColorIcon, this.prevColor);
    }

    if (pixels) {
      this.pixels = pixels;
      this.scale = 512 / this.pixels;
    } else {
      localStorage.setItem('pixels', this.pixels);
    }
  }
}

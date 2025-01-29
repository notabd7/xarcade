const sounds = {
    hover: new Audio("/sounds/hover.wav"),
    click: new Audio("/sounds/click.wav"),
    start: new Audio("/sounds/hover.wav"),
  }
  
  export const playSound = (soundName: keyof typeof sounds) => {
    sounds[soundName].currentTime = 0
    sounds[soundName].play().catch((error) => console.error("Error playing sound:", error))
  }
  
  
gsap.registerPlugin(ScrollTrigger);
  const canvas = document.getElementById('animation-canvas');
  const context = canvas.getContext('2d');
  const frameCount = 134;

  const currentFrame = index => {
    const frameNumber = String(index + 1).padStart(3, '0');
    return `assets/frames/ezgif-frame-${frameNumber}.jpg`;
  };

  canvas.width = 1280;
  canvas.height = 720;
  const images = [];
  const animationState = { frame: 0 };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  images[0].onload = render;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[animationState.frame], 0, 0);
  }

  gsap.to(animationState, {
    frame: frameCount - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: '.scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: '.canvas-sticky-wrapper',
    },
    onUpdate: render,
  });
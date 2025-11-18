document.addEventListener("DOMContentLoaded", () => {
  const gradientOverlay = document.getElementById('main-hero-gradient-overlay');
  const gradientOverlayBottom = document.getElementById('main-hero-gradient-overlay-bottom');
  if (!gradientOverlay || !gradientOverlayBottom) return;

  const gradientPath = 'img/brand/gradient.svg';
  
  // Create a temporary image to get its natural dimensions
  const tempImg = new Image();
  
  const populateGradients = () => {
    const imageWidth = tempImg.naturalWidth;
    
    // Get computed styles to access padding values
    const computedStyle = window.getComputedStyle(gradientOverlay);
    const paddingLeft = parseFloat(computedStyle.paddingLeft); // Gets padding-left in pixels
    const paddingRight = parseFloat(computedStyle.paddingRight); // Gets padding-right in pixels
    const paddingTop = parseFloat(computedStyle.paddingTop); // Gets padding-top in pixels
    const paddingBottom = parseFloat(computedStyle.paddingBottom); // Gets padding-bottom in pixels
    
    // Get the available width (container width minus horizontal padding)
    const containerWidth = gradientOverlay.offsetWidth - paddingLeft - paddingRight;
    const gap = 12; // 12px gap between images

    // Calculate how many full images can fit (accounting for gaps)
    // Formula: containerWidth = n * imageWidth + (n-1) * gap
    // Solving for n: n = (containerWidth + gap) / (imageWidth + gap)
    const numberOfImages = Math.floor((containerWidth + gap) / (imageWidth + gap));

    console.log("numberofImg: ", numberOfImages);
    
    // Clear any existing images
    gradientOverlay.innerHTML = '';
    gradientOverlayBottom.innerHTML = '';
    
    // Add the calculated number of images to both overlays
    for (let i = 0; i < numberOfImages; i++) {
      const img = document.createElement('img');
      img.src = gradientPath;
      img.alt = 'Gradient';
      gradientOverlay.appendChild(img);
      
      const imgBottom = document.createElement('img');
      imgBottom.src = gradientPath;
      imgBottom.alt = 'Gradient';
      gradientOverlayBottom.appendChild(imgBottom);
    }
  };
  
  tempImg.onload = populateGradients;
  
  tempImg.onerror = () => {
    console.error('Failed to load gradient image:', gradientPath);
  };
  
  tempImg.src = gradientPath;
  
  // Recalculate on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      populateGradients();
    }, 100);
  });
});


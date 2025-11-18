document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.querySelector('#projects-go-here');
  if (!projectsContainer) return;

  let autoScrollInterval = null;
  let isScrolling = true;
  const scrollSpeed = 1; // pixels per frame

  // Function to create a project card
  function createCard(project, template) {
    // Replace template placeholders with project data
    let cardHTML = template
      .replace(/\{\{title\}\}/g, project.title)
      .replace(/\{\{description\}\}/g, project.description)
      .replace(/\{\{link\}\}/g, project.link);
    
    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cardHTML;
    const card = tempDiv.firstElementChild;
    
    // Set the image src if provided
    const imageImg = card.querySelector('.project-card-img');
    if (project.image) {
      imageImg.src = project.image;
      imageImg.alt = project.title || 'Project image';
    } else {
      imageImg.style.display = 'none';
    }
    
    // Show/hide the "Learn more" link based on whether a link exists
    const linkElement = card.querySelector('.project-card-link');
    if (!project.link || project.link.trim() === '') {
      linkElement.remove();
    } else {
      linkElement.setAttribute('href', project.link);
    }
    
    return card;
  }

  // Function to start auto-scrolling
  function startAutoScroll() {
    if (autoScrollInterval) return;
    
    autoScrollInterval = setInterval(() => {
      if (isScrolling && projectsContainer) {
        projectsContainer.scrollLeft += scrollSpeed;
        
        // Seamless infinite loop: when we've scrolled past the first set of cards,
        // reset to the beginning (invisible since content is duplicated)
        const scrollWidth = projectsContainer.scrollWidth;
        const clientWidth = projectsContainer.clientWidth;
        const scrollLeft = projectsContainer.scrollLeft;
        
        // Reset when we've scrolled through the first set (half of total width)
        if (scrollLeft >= scrollWidth / 2) {
          projectsContainer.scrollLeft = scrollLeft - scrollWidth / 2;
        }
      }
    }, 16); // ~60fps
  }

  // Function to stop auto-scrolling
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  // Pause scrolling on hover
  projectsContainer.addEventListener('mouseenter', () => {
    isScrolling = false;
  });

  // Resume scrolling when mouse leaves
  projectsContainer.addEventListener('mouseleave', () => {
    isScrolling = true;
  });

  // Load project card component template
  Promise.all([
    fetch('components/project-card.html').then(r => r.text()),
    fetch('data/projects.json').then(r => r.json())
  ])
    .then(([template, projects]) => {
      projectsContainer.innerHTML = '';
      
      // Create cards
      const cards = [];
      projects.forEach(project => {
        const card = createCard(project, template);
        cards.push(card);
        projectsContainer.appendChild(card);
      });
      
      // Duplicate all cards for seamless infinite looping
      cards.forEach(card => {
        projectsContainer.appendChild(card.cloneNode(true));
      });
      
      // Start auto-scrolling after cards are loaded
      startAutoScroll();
    })
    .catch(error => {
      console.error('Error loading projects or component:', error);
      projectsContainer.innerHTML = '<div class="alert alert-warning">Failed to load projects.</div>';
    });
});


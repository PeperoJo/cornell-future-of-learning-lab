document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.querySelector('#research-projects');
  if (!projectsContainer) return;

  // Load research project component template
  Promise.all([
    fetch('components/research-project.html').then(r => r.text()),
    fetch('data/projects.json').then(r => r.json())
  ])
    .then(([template, projects]) => {
      projectsContainer.innerHTML = '';

      projects.forEach((project, index) => {
        // Create link HTML if link exists
        let linkHTML = '';
        if (project.link && project.link.trim() !== '') {
          linkHTML = `
            <a href="${project.link}" class="research-project-link">
              <span>Learn more</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15L15 5M15 5H5M15 5V15" stroke="#B21B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          `;
        }

        // Replace template placeholders with project data
        let projectHTML = template
          .replace(/\{\{title\}\}/g, project.title)
          .replace(/\{\{description\}\}/g, project.description)
          .replace(/\{\{image\}\}/g, project.image || 'img/calibration.jpg')
          .replace(/\{\{linkPlaceholder\}\}/g, linkHTML);

        // Create a temporary container to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = projectHTML;
        const projectSection = tempDiv.querySelector('.research-project-section');
        const divider = tempDiv.querySelector('.research-project-divider');

        projectsContainer.appendChild(projectSection);

        // Add divider after each project except the last
        if (index < projects.length - 1 && divider) {
          projectsContainer.appendChild(divider.cloneNode(true));
        }
      });
    })
    .catch(error => {
      console.error('Error loading research projects:', error);
      projectsContainer.innerHTML = '<div class="alert alert-warning">Failed to load research projects.</div>';
    });
});


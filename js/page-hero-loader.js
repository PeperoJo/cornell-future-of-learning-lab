document.addEventListener("DOMContentLoaded", () => {
  const pageHeroContainer = document.querySelector('[data-component="page-hero"]');
  if (!pageHeroContainer) return;

  // Get data attributes from the container
  const title = pageHeroContainer.getAttribute('data-title') || '';
  const description = pageHeroContainer.getAttribute('data-description') || '';
  const image = pageHeroContainer.getAttribute('data-image') || 'img/calibration.jpg';

  // Load page hero component template
  fetch('components/page-hero.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load page hero: ${response.statusText}`);
      }
      return response.text();
    })
    .then(template => {
      // Replace template placeholders with data
      let heroHTML = template
        .replace(/\{\{title\}\}/g, title)
        .replace(/\{\{description\}\}/g, description)
        .replace(/\{\{image\}\}/g, image);

      pageHeroContainer.innerHTML = heroHTML;
    })
    .catch(error => {
      console.error('Error loading page hero:', error);
      pageHeroContainer.innerHTML = '<div class="alert alert-warning">Failed to load page hero component.</div>';
    });
});


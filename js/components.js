document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  const navbarEl = document.querySelector('[data-component="navbar"]');
  if (navbarEl) {
    // Use relative path - works when served from a web server
    // Note: This won't work with file:// protocol - you need a local server
    fetch('components/navbar.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load navbar: ${response.statusText} (${response.status})`);
        }
        return response.text();
      })
      .then(html => {
        navbarEl.innerHTML = html;
        console.log('Navbar loaded successfully');
      })
      .catch(error => {
        console.error("Error loading navbar:", error);
        console.error("Make sure you're running a local server (e.g., 'python -m http.server' or 'npx serve')");
        // Fallback: show error message
        navbarEl.innerHTML = '<div class="alert alert-warning">Failed to load navbar component. Make sure you\'re running a local web server.</div>';
      });
  } else {
    console.warn('No element with data-component="navbar" found');
  }

  // Load footer
  const footerEl = document.querySelector('[data-component="footer"]');
  if (footerEl) {
    fetch('components/footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load footer: ${response.statusText} (${response.status})`);
        }
        return response.text();
      })
      .then(html => {
        footerEl.innerHTML = html;
        console.log('Footer loaded successfully');
      })
      .catch(error => {
        console.error("Error loading footer:", error);
        footerEl.innerHTML = '<div class="alert alert-warning">Failed to load footer component. Make sure you\'re running a local web server.</div>';
      });
  } else {
    console.warn('No element with data-component="footer" found');
  }
});


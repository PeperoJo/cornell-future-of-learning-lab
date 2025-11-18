document.addEventListener("DOMContentLoaded", () => {
  const membersContainer = document.querySelector('#members-container');
  if (!membersContainer) return;

  // Load member card component template
  Promise.all([
    fetch('components/member-card.html').then(r => r.text()),
    fetch('data/members.json').then(r => r.json())
  ])
    .then(([template, members]) => {
      membersContainer.innerHTML = '';

      members.forEach((member) => {
        // Create email icon if email exists
        let emailIcon = '';
        if (member.email && member.email.trim() !== '') {
          emailIcon = `
            <a href="mailto:${member.email}" class="member-icon" aria-label="Email ${member.name}">
              <i data-feather="mail"></i>
            </a>
          `;
        }

        // Create website icon if website exists
        let websiteIcon = '';
        if (member.website && member.website.trim() !== '') {
          websiteIcon = `
            <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="member-icon" aria-label="Visit ${member.name}'s website">
              <i data-feather="globe"></i>
            </a>
          `;
        }

        // Create LinkedIn icon if LinkedIn exists
        let linkedinIcon = '';
        if (member.linkedin && member.linkedin.trim() !== '') {
          linkedinIcon = `
            <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="member-icon" aria-label="Visit ${member.name}'s LinkedIn">
              <i data-feather="linkedin"></i>
            </a>
          `;
        }

        // Replace template placeholders with member data
        let cardHTML = template
          .replace(/\{\{name\}\}/g, member.name)
          .replace(/\{\{pronouns\}\}/g, member.pronouns || '')
          .replace(/\{\{title\}\}/g, member.title)
          .replace(/\{\{image\}\}/g, member.image || 'img/placeholder.jpg')
          .replace(/\{\{emailIcon\}\}/g, emailIcon)
          .replace(/\{\{websiteIcon\}\}/g, websiteIcon)
          .replace(/\{\{linkedinIcon\}\}/g, linkedinIcon);

        // Create a temporary container to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardHTML;
        const memberCard = tempDiv.firstElementChild;

        membersContainer.appendChild(memberCard);
      });

      // Replace Feather icons after all cards are added
      if (window.feather && typeof window.feather.replace === 'function') {
        window.feather.replace();
      }
    })
    .catch(error => {
      console.error('Error loading members:', error);
      membersContainer.innerHTML = '<div class="alert alert-warning">Failed to load members.</div>';
    });
});


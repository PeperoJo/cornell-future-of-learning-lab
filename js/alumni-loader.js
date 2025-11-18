document.addEventListener("DOMContentLoaded", () => {
  const alumniContainer = document.querySelector("#alumni-container");
  if (!alumniContainer) return;

  Promise.all([
    fetch("components/member-card.html").then((r) => r.text()),
    fetch("data/alumni.json").then((r) => r.json()),
  ])
    .then(([template, alumni]) => {
      alumniContainer.innerHTML = "";

      alumni.forEach((person) => {
        let emailIcon = "";
        if (person.email && person.email.trim() !== "") {
          emailIcon = `
            <a href="mailto:${person.email}" class="member-icon" aria-label="Email ${person.name}">
              <i data-feather="mail"></i>
            </a>
          `;
        }

        let websiteIcon = "";
        if (person.website && person.website.trim() !== "") {
          websiteIcon = `
            <a href="${person.website}" target="_blank" rel="noopener noreferrer" class="member-icon" aria-label="Visit ${person.name}'s website">
              <i data-feather="globe"></i>
            </a>
          `;
        }

        let linkedinIcon = "";
        if (person.linkedin && person.linkedin.trim() !== "") {
          linkedinIcon = `
            <a href="${person.linkedin}" target="_blank" rel="noopener noreferrer" class="member-icon" aria-label="Visit ${person.name}'s LinkedIn">
              <i data-feather="linkedin"></i>
            </a>
          `;
        }

        let cardHTML = template
          .replace(/{{name}}/g, person.name)
          .replace(/{{pronouns}}/g, person.pronouns || "")
          .replace(/{{title}}/g, person.title || "")
          .replace(/{{image}}/g, person.image || "")
          .replace(/{{emailIcon}}/g, emailIcon)
          .replace(/{{websiteIcon}}/g, websiteIcon)
          .replace(/{{linkedinIcon}}/g, linkedinIcon);

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cardHTML;
        const memberCard = tempDiv.firstElementChild;

        if (!person.image) {
          const imageEl = memberCard.querySelector(".member-card-image");
          if (imageEl) imageEl.remove();
        }

        if (!person.pronouns) {
          const pronounsEl = memberCard.querySelector(".member-pronouns");
          if (pronounsEl) pronounsEl.remove();
        }

        const iconsEl = memberCard.querySelector(".member-card-icons");
        if (iconsEl && iconsEl.children.length === 0) {
          iconsEl.remove();
        }

        alumniContainer.appendChild(memberCard);
      });

      if (window.feather && typeof window.feather.replace === "function") {
        window.feather.replace();
      }
    })
    .catch((error) => {
      console.error("Error loading alumni:", error);
      alumniContainer.innerHTML =
        '<div class="alert alert-warning">Failed to load alumni.</div>';
    });
});



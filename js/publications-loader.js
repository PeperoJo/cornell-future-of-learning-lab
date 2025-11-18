document.addEventListener("DOMContentLoaded", () => {
  const publicationsContainer = document.querySelector("#publications-list");
  if (!publicationsContainer) return;

  Promise.all([
    fetch("components/publication-card.html").then((r) => r.text()),
    fetch("data/publications.json").then((r) => r.json())
  ])
    .then(([template, publications]) => {
      publicationsContainer.innerHTML = "";

      const grouped = publications.reduce((acc, pub) => {
        acc[pub.year] = acc[pub.year] || [];
        acc[pub.year].push(pub);
        return acc;
      }, {});

      const years = Object.keys(grouped)
        .map(Number)
        .sort((a, b) => b - a);

      years.forEach((year) => {
        const section = document.createElement("section");
        section.classList.add("publication-year-section");

        const heading = document.createElement("h3");
        heading.classList.add("publication-year-heading");
        heading.textContent = year;
        heading.id = year;
        section.appendChild(heading);

        const row = document.createElement("div");
        row.classList.add("row", "gx-4", "gy-4");

        grouped[year].forEach((pub) => {
          let cardHTML = template
            .replace(/{{title}}/g, pub.title)
            .replace(/{{authors}}/g, pub.authors || "")
            .replace(/{{details}}/g, pub.details || "")
            .replace(/{{link}}/g, pub.link || "");

          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = cardHTML;
          const card = tempDiv.firstElementChild;

          const linkEl = card.querySelector(".publication-link");
          if (linkEl && (!pub.link || pub.link.trim() === "")) {
            linkEl.remove();
          }

          row.appendChild(card);
        });

        section.appendChild(row);
        publicationsContainer.appendChild(section);
      });
    })
    .catch((error) => {
      console.error("Error loading publications:", error);
      publicationsContainer.innerHTML = '<div class="alert alert-warning">Failed to load publications.</div>';
    });
});

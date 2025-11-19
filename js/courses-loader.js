document.addEventListener("DOMContentLoaded", () => {
  const coursesContainer = document.querySelector("#courses-list");
  if (!coursesContainer) return;

  Promise.all([
    fetch("components/course.html").then((r) => r.text()),
    fetch("data/courses.json").then((r) => r.json())
  ])
    .then(([template, courses]) => {
      coursesContainer.innerHTML = "";

      courses.forEach((course) => {
        const tagChips = (course.tags || [])
          .map((tag) => `<span class="course-tag">${tag}</span>`)
          .join("");

        const linksHTML = (course.links || [])
          .map((linkItem) => 
            `<a href="${linkItem.link}" class="course-link" target="_blank" rel="noopener noreferrer">
              <span>${linkItem.label}</span>
              <span class="material-symbols-outlined">arrow_outward</span>
            </a>`
          )
          .join("");

        let cardHTML = template
          .replace(/{{code}}/g, course.code || "")
          .replace(/{{title}}/g, course.title || "")
          .replace(/{{professor}}/g, course.professor || "")
          .replace(/{{description}}/g, course.description || "")
          .replace(/{{tagPlaceholder}}/g, tagChips)
          .replace(/{{linkPlaceholder}}/g, linksHTML)
          .replace(/{{image}}/g, course.image || "");

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cardHTML;
        
        // Append all children (course-section and divider)
        while (tempDiv.firstChild) {
          const child = tempDiv.firstChild;
          if (child.nodeType === Node.ELEMENT_NODE) {
            const tagsEl = child.querySelector(".course-tags");
            if (tagsEl && !tagChips) {
              tagsEl.remove();
            }

            const linkContainer = child.querySelector(".course-link-container");
            if (linkContainer && !linksHTML) {
              linkContainer.remove();
            }
          }
          coursesContainer.appendChild(child);
        }
      });
    })
    .catch((error) => {
      console.error("Error loading courses:", error);
      coursesContainer.innerHTML = '<div class="alert alert-warning">Failed to load courses.</div>';
    });
});

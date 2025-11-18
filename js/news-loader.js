document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.querySelector('#news-items');
  if (!newsContainer) return;

  Promise.all([
    fetch('components/news-item.html').then(r => r.text()),
    fetch('data/news.json').then(r => r.json())
  ])
    .then(([template, newsItems]) => {
      // Sort by date (newest first) and get top 3
      const sortedNews = newsItems
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      newsContainer.innerHTML = '';

      sortedNews.forEach((item, index) => {
        // Format date
        const dateObj = new Date(item.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });

        // Replace template placeholders
        let itemHTML = template
          .replace(/\{\{date\}\}/g, formattedDate)
          .replace(/\{\{description\}\}/g, item.description);

        // Create a temporary container to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = itemHTML;
        const newsItem = tempDiv.querySelector('.news-item');
        const newsDivider = tempDiv.querySelector('.news-item-divider');

        // Handle links in description
        const textElement = newsItem.querySelector('.news-item-text');
        if (item.link && item.linkText) {
          // Replace link text with actual link
          const textContent = textElement.textContent;
          const linkIndex = textContent.indexOf(item.linkText);
          
          if (linkIndex !== -1) {
            const beforeLink = textContent.substring(0, linkIndex);
            const afterLink = textContent.substring(linkIndex + item.linkText.length);
            textElement.innerHTML = `${beforeLink}<a href="${item.link}" class="news-item-link">${item.linkText}</a>${afterLink}`;
          } else {
            // If link text not found, keep original text
            textElement.textContent = textContent;
          }
        }

        newsContainer.appendChild(newsItem);
        
        // Add divider after each item except the last
        if (index < sortedNews.length - 1 && newsDivider) {
          newsContainer.appendChild(newsDivider.cloneNode(true));
        }
      });

      // Add subscribe link
      const subscribeDiv = document.createElement('p');
      subscribeDiv.className = 'news-subscribe';
      subscribeDiv.innerHTML = '<a href="https://substack.com/home" class="news-subscribe-link">Subscribe</a> to our newsletter and stay in the loop with our lab!';
      newsContainer.appendChild(subscribeDiv);
    })
    .catch(error => {
      console.error('Error loading news:', error);
      newsContainer.innerHTML = '<div class="alert alert-warning">Failed to load news items.</div>';
    });
});


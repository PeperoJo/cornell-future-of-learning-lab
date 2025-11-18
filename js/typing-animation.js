document.addEventListener("DOMContentLoaded", () => {
  const typingWordElement = document.getElementById('typing-word');
  if (!typingWordElement) return;

  // Load words from JSON
  fetch('data/typing-words.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load typing words: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const words = data.words;
      if (!words || words.length === 0) {
        console.error('No words found in typing-words.json');
        return;
      }

      let currentWordIndex = 0;
      let isDeleting = false;
      let currentText = '';
      const typingSpeed = 100; // milliseconds per character
      const deletingSpeed = 50; // milliseconds per character
      const pauseTime = 2000; // pause after completing a word

      function typeWord() {
        const currentWord = words[currentWordIndex];
        
        if (isDeleting) {
          // Delete characters
          currentText = currentWord.substring(0, currentText.length - 1);
          typingWordElement.textContent = currentText;
          
          if (currentText === '') {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            setTimeout(typeWord, 500); // Pause before typing next word
            return;
          }
          
          setTimeout(typeWord, deletingSpeed);
        } else {
          // Type characters
          currentText = currentWord.substring(0, currentText.length + 1);
          typingWordElement.textContent = currentText;
          
          if (currentText === currentWord) {
            // Word is complete, wait then start deleting
            isDeleting = true;
            setTimeout(typeWord, pauseTime);
            return;
          }
          
          setTimeout(typeWord, typingSpeed);
        }
      }

      // Start the animation
      typeWord();
    })
    .catch(error => {
      console.error('Error loading typing words:', error);
      // Fallback to default word
      typingWordElement.textContent = 'study';
    });
});


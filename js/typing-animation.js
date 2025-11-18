document.addEventListener("DOMContentLoaded", () => {
  const typingWordElement = document.getElementById('typing-word');
  if (!typingWordElement) return;

  const words = ['study', 'research', 'explore', 'design', 'examine'];
  let currentWordIndex = 0;
  let isDeleting = false;
  let currentText = '';
  let typingSpeed = 100; // milliseconds per character
  let deletingSpeed = 50; // milliseconds per character
  let pauseTime = 2000; // pause after completing a word

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
});


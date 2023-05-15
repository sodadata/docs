// This assumes that you're using Rouge; if not, update the selector

(function() {
  document.addEventListener('DOMContentLoaded', function() {
        
    const codeBlocks = document.querySelectorAll('.code-header + .highlighter-rouge');
    const copyCodeButtons = document.querySelectorAll('.copy-code-button');

    copyCodeButtons.forEach((copyCodeButton, index) => {
      const code = codeBlocks[index].innerText;

      copyCodeButton.addEventListener('click', () => {
        // Copy the code to the user's clipboard
        window.navigator.clipboard.writeText(code);

        // Update the button text visually
        const { innerHTML: originalSVG } = copyCodeButton;
        copyCodeButton.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"></polyline></svg>';

        // (Optional) Toggle a class for styling the button
        copyCodeButton.classList.add('copied');

        // After 2 seconds, reset the button to its initial UI
        setTimeout(() => {
          copyCodeButton.innerHTML = originalSVG;
          copyCodeButton.classList.remove('copied');
        }, 2000);
      });
    });
  })
})();

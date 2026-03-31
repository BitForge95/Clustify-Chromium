const browser = typeof chrome !== "undefined" ? chrome : undefined;

// Elements
const apiKeyInput = document.getElementById('apiKey');
const saveBtn = document.getElementById('saveBtn');
const statusText = document.getElementById('status');

// Load the saved API key when the options page is opened
document.addEventListener('DOMContentLoaded', () => {
  browser.storage.local.get(['groqApiKey'], (result) => {
    if (result.groqApiKey) {
      apiKeyInput.value = result.groqApiKey;
    }
  });
});

// Save the API key when the button is clicked
saveBtn.addEventListener('click', () => {
  const apiKey = apiKeyInput.value.trim();
  
  browser.storage.local.set({ groqApiKey: apiKey }, () => {
    // Show a success message
    statusText.textContent = '✅ Settings saved successfully!';
    statusText.style.color = '#34a853';
    
    // Clear the message after 3 seconds
    setTimeout(() => {
      statusText.textContent = '';
    }, 3000);
  });
});
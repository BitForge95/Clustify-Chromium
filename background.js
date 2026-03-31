const _browser = typeof globalThis.browser !== "undefined" ? globalThis.browser : chrome;

const CLIENT_ID = "494456271943-4hhnth42rf95i6ooatvfuao3tq89m1fl.apps.googleusercontent.com";
// SECURITY FIX: Downgraded to least privilege scope
const SCOPES = "https://www.googleapis.com/auth/gmail.modify";
const REDIRECT_URI = _browser.identity.getRedirectURL();

// Helper to generate a random string for CSRF protection
function generateRandomString() {
  const array = new Uint32Array(4);
  crypto.getRandomValues(array);
  return Array.from(array, dec => dec.toString(16).padStart(8, "0")).join("");
}

async function getAuthToken() {
  return new Promise((resolve, reject) => {
    // SECURITY FIX: Generate and include a state parameter
    const stateString = generateRandomString();
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&state=${stateString}`;
    
    _browser.identity.launchWebAuthFlow(
      { interactive: true, url: authUrl },
      async (redirectUrl) => {
        if (_browser.runtime.lastError || !redirectUrl) {
          reject(_browser.runtime.lastError || "No redirect URL");
          return;
        }
        
        const fragment = redirectUrl.split("#")[1];
        if (!fragment) {
          reject("No fragment found in redirect URL");
          return;
        }
        
        const params = new URLSearchParams(fragment);
        const accessToken = params.get("access_token");
        const returnedState = params.get("state");
        const expiresIn = params.get("expires_in");
        
        // SECURITY FIX: Verify the state to prevent CSRF
        if (returnedState !== stateString) {
          reject("State mismatch. Potential CSRF attack.");
          return;
        }
        
        if (accessToken) {
          try {
            // SECURITY FIX: Use session storage so token isn't written to disk
            await _browser.storage.session.set({ 
              authToken: accessToken,
              tokenExpiry: Date.now() + (parseInt(expiresIn) * 1000)
            });
            resolve(accessToken);
          } catch (storageError) {
            reject(storageError);
          }
        } else {
          reject("No access token found in redirect URL");
        }
      }
    );
  });
}

_browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getToken") {
    getAuthToken()
      .then(token => sendResponse({ success: true, token: token }))
      .catch(error => sendResponse({ success: false, error: error.message || error }));
    return true;
  }
  
  if (message.action === "checkToken") {
    // Updated to check session storage instead of local
    _browser.storage.session.get(['authToken', 'tokenExpiry'])
      .then(stored => {
        const hasValidToken = stored.authToken && stored.tokenExpiry && Date.now() < stored.tokenExpiry;
        sendResponse({ 
          success: true, 
          hasValidToken: hasValidToken,
          token: hasValidToken ? stored.authToken : null
        });
      })
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
  
  if (message.action === "clearToken") {
    // Updated to clear session storage
    _browser.storage.session.remove(['authToken', 'tokenExpiry'])
      .then(() => sendResponse({ success: true }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});
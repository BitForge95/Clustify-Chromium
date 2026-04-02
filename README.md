# Clustify

Clustify is a lightweight, high-performance Chrome Extension built with Manifest V3 that streamlines Gmail management. Whether dealing with high volumes of newsletters, cluttered promotional tabs, or general inbox organization, Clustify provides the tools to sort, label, and clean an inbox efficiently. 

Powered by the official Gmail API and Groq AI, it operates securely without relying on unauthorized external remote code.

## Key Features

* **Smart Auto-Labeling (AI-Powered):** Enter a desired label (e.g., "Travel Receipts"), and Clustify will use AI to suggest optimal keyword filters and automatically label matching emails.
* **One-Click Cleanup:** Instantly bulk-delete large volumes of emails based on specific keywords. 
* **Targeted Search:** Filter by keyword anywhere in the email or restrict the search exclusively to the subject line.
* **Preview Before Deleting:** Review the subject lines of the emails slated for deletion or labeling to ensure critical messages are retained.
* **Privacy First:** Clustify runs locally. It communicates directly with the Google API and Groq API. The extension does not run external remote code, store emails on third-party servers, or sell user data.

## Prerequisites

To use the AI Auto-Labeling feature, a free API key from Groq is required:

1. Navigate to the [Groq Cloud Console](https://console.groq.com/keys).
2. Create an account and generate an API key.
3. Save this key for the setup process.

## Installation (Developer Mode)

For local execution or source code contribution, install Clustify directly into Chrome using Developer Mode:

1. Clone this repository or download the .zip file and extract it.
2. Open Google Chrome and navigate to chrome://extensions/.
3. Enable Developer mode in the top right corner.
4. Click the Load unpacked button in the top left.
5. Select the Clustify folder containing the manifest.json file.
6. The Clustify icon will now appear in the browser toolbar.

## Configuration and Usage

1. **Connect to Gmail:** Click the Clustify extension icon in the toolbar and select "Connect Gmail". Complete the Google OAuth process to grant the extension access to manage the inbox.
2. **Add API Key:** Right-click the Clustify extension icon and select "Options" (or click "API Key Settings" in the popup). Paste the Groq API key and click "Save Settings".
3. **Clean Up:** Use the Custom Keyword Search to count or delete emails by specific phrases, or utilize the AI Auto-Label section to generate keywords and group similar emails automatically.

## Built With

* JavaScript (ES6+)
* Chrome Extension API (Manifest V3)
* Gmail REST API
* Groq API (Llama 3.1)
* HTML5 and CSS3

## Privacy Policy

User privacy is a primary focus. Clustify requires permissions to read and modify the Gmail inbox solely to execute user-triggered commands. Authentication is handled securely via Google OAuth2. 

For full details, please review the [Privacy Policy](https://bitforge95.github.io/Clustify-Chromium/privacy.html).

## License

This project is open-source and available under the [MIT License](LICENSE).

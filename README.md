
# Youtube views and title fetcher.

## About
Just a simple script to automatically insert youtube videos' view counts and titles into a Google Sheets instance. Works regardless of whether you're the video creator or not. Assumes the video urls are in column 1. Inserts titles into column 2 and views into column 3.

## Setup
1. Get a Google API key. Enable the YouTube Data API v3 for it.
2. Create a Google Sheets document. Paste the video urls in the first column.
3. Go to Extensions -> Apps Script.
4. Paste the code into the code editor.
5. Make sure to substitute the YOUR_API_KEY_HERE placeholder with your API.
6. Save the code, close and reopen the Sheet.
7. After you reopen it, there should be a 'Custom' menu option in your top bar. (If it doesn't appear, wait a few seconds)
8. Every time you click Custom -> Refresh Views, the view count should update.

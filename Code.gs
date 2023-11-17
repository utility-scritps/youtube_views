  function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Custom')
      .addItem('Refresh Views', 'main')
      .addToUi();
  }


function main() {
  Logger.log('Hello World');
  getYoutubeViews();



  function getYoutubeViews() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();

    for (var i = 1; i < rows.length; i++) {
      var videoUrl = rows[i][0]; // Assuming the YouTube video URLs are in the first column (column A).
      var videoId = getVideoId(videoUrl);
      Logger.log('Video URL: ' + videoUrl);
      var videoData = fetchYoutubeVideoData(videoId);


      // Check if video data was successfully fetched.
      if (videoData) {
        Logger.log('Views: ' + videoData.views);
        var title = videoData.title;
        var views = videoData.views;
        sheet.getRange(i + 1, 2).setValue(title); // Set the title in the second column (column B).
        sheet.getRange(i + 1, 3).setValue(views); // Set the views count in the third column (column C).
      } else{
        sheet.getRange(i + 1, 2).setValue('Something went wrong - Video not found or API key is incorrect'); // Set the title in the second column (column B).

      }
    }
  }

  function getVideoId(url) {
    var regex = /[?&]v=([^&#]+)/;
    var match = regex.exec(url);
    return match && match[1];
  }

  function fetchYoutubeVideoData(videoId) {
    var apiKey = 'YOUR_API_KEY_HERE';
    var apiUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=' + videoId + '&key=' + apiKey;

    var response = UrlFetchApp.fetch(apiUrl);
    var data = JSON.parse(response.getContentText());

    if (data.items && data.items.length > 0) {
      var snippet = data.items[0].snippet;
      var statistics = data.items[0].statistics;

      Logger.log('Snippet: ' + snippet);
      Logger.log('statistics: ' + statistics.viewCount);

      return {
        title: snippet.title,
        views: statistics.viewCount
      };
    } else {
      return null; // Video not found or API key is incorrect.
    }
  }

}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery == 'google') {
      var url = 'https://www.google.com/search?q=' + request.keyword;
      url = url.split(' ').join('+')
      fetch(url)
        .then(response => response.text())
        .then(text => sendResponse(text))
        .catch(error => console.log(error))
      return true;
    }
    if (request.contentScriptQuery == 'glassdoor') {
      var url = 'https://www.glassdoor.com/' +
        request.link;
      fetch(url)
        .then(response => response.text())
        .then(text => sendResponse(text))
        .catch(error => console.log(error))
      return true;
    }
    if (request.contentScriptQuery == 'general') {
      fetch(request.link)
        .then(response => response.text())
        .then(text => sendResponse(text))
        .catch(error => console.log(error))
      return true;
    }
    if (request.contentScriptQuery == 'relaunch') {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ "search": { "text": request.name } }),
      };
      fetch(request.link, options)
        .then(response => response.json())
        .then(text => sendResponse(text))
        .catch(error => console.log(error))
      return true;
    }
  });

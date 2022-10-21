window.onscroll = function() {
  var d = document.documentElement;
  var offset = d.scrollTop + window.innerHeight;
  var height = d.offsetHeight;
  // console.log(height, offset);
  if (offset >= height) {
    console.log("end");

    chrome.runtime.sendMessage({ bottom: true })
  }
};
chrome
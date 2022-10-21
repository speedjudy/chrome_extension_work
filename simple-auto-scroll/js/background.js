function slowLabel(tab) {
  chrome.browserAction.setBadgeBackgroundColor({color: [0,180,255,255]});
  doScroll(tab, (localStorage["slow"] || "100"), 'slow');
};

function mediumLabel(tab) {
  chrome.browserAction.setBadgeBackgroundColor({color: [0,125,255,255]});
  doScroll(tab, (localStorage["medium"] || "40"), 'medium');
};

function fastLabel(tab) {
  chrome.browserAction.setBadgeBackgroundColor({color: [0, 55, 255, 255]});
  doScroll(tab, (localStorage["fast"] || "1"), 'fast');
};

chrome.extension.getVersion = function() {
  if (!chrome.extension.version_) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.extension.getURL('manifest.json'), true);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        var manifest = JSON.parse(this.responseText);
        chrome.extension.version_ = manifest.version;
      }
    };
    xhr.send();
  }
  return chrome.extension.version_;
};

document.addEventListener('DOMContentLoaded',  function(e) {
  window.onscroll = function() {
  var d = document.documentElement;
  var offset = d.scrollTop + window.innerHeight;
  var height = d.offsetHeight;
  if (offset >= height) {
    console.log('At the bottom');
  }
};
  var old_ver = (localStorage["version"] || "" ).split(".");
  var new_ver = (chrome.extension.getVersion() + "").split(".");

  if(old_ver[0]+'.'+old_ver[1]+'.'+old_ver[2] != new_ver[0]+'.'+new_ver[1]+'.'+new_ver[2]){
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0, tab; tab = tabs[i]; i++) {
	var str = tab.url;
	if (str.match('http://github.com/jpablobr/simple-auto-scroll')) {
	  chrome.tabs.update(tab.id, {selected: true});
	  return;
	}
      }
      chrome.tabs.create({url:'http://github.com/jpablobr/simple-auto-scroll'});
    });
    localStorage["version"] = chrome.extension.getVersion();
  }
}, false);

var scrollbar = 0;
var wN2scRl;

function resetScroll(tab) {
  chrome.browserAction.setBadgeText({text:""});
  var upUrl = "javascript:var wN2scRl;Sa5gNA9k=new Function('clearTimeout(wN2scRl)');document.onkeydown=Sa5gNA9k;Sa5gNA9k();void(wN2scRl=setInterval('if(pageYOffset<document.height-innerHeight){window.scrollBy(0,0)}else{Sa5gNA9k()}',0))";
  if(upUrl != tab.url) {
    chrome.tabs.executeScript({
      code: upUrl
    });
  }
}

function doScroll(tab, speed, badge) {
  chrome.browserAction.setBadgeText({text:badge});
  wN2scRl = setInterval(function(){
    upurl(tab.id);
  }, speed);
}

function upurl(id){
  chrome.tabs.executeScript({
    code: `
    if (localStorage.getItem("bottom")==0) {
      document.documentElement.scrollTop+=1;
    }
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;
    var until = height/2;
    if (offset >= height) {
      console.log(offset, height);
      localStorage.setItem("bottom", 1);
    } 
    if (localStorage.getItem("bottom")==1){
      document.documentElement.scrollTop-=1;
      if (offset <= until) {
        localStorage.setItem("bottom", 2);
      }
    }
    if (localStorage.getItem("bottom")==2) {
      chrome.storage.sync.get(['ele_class'], function(result) {
        chrome.storage.sync.get(['delay_time'], function(delayResult) {
          setTimeout(function(){
            var exist = document.getElementsByClassName(result.ele_class);
            if (exist.length>0) {
              var lastBtn = exist[exist.length-1];
              // $(lastBtn).click();
              $(lastBtn).attr("target", "_self")
              $(lastBtn)[0].click();
              localStorage.setItem("bottom", 0);
            } else {
              console.log("close tab");
              chrome.tabs.getCurrent(function(tab) {
                chrome.tabs.remove(tab.id, function() { });
              });
              localStorage.setItem("bottom", 0);
            }
          }, delayResult.delay_time*1000);
        });
      });
    }
    `
  });
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if(scrollbar != 0){
    chrome.tabs.getSelected(null, function(tab){
      clearInterval(wN2scRl);
      resetScroll(tab);
    });
    scrollbar = 0;
  }
  sendResponse();
});

chrome.browserAction.onClicked.addListener(function(tab) {
  clearInterval(wN2scRl);
  if(scrollbar == 0) {
    scrollbar +=1;
    slowLabel(tab);
  } else if(scrollbar == 1) {
    scrollbar +=1;
    mediumLabel(tab);
  } else if(scrollbar == 2) {
    scrollbar +=1;
    fastLabel(tab);
  } else if(scrollbar == 3) {
    scrollbar = 0;
    resetScroll(tab);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabid, selectinfo) {
  clearInterval(wN2scRl);
  chrome.browserAction.setBadgeText({text:""});
  scrollbar=0;
});

chrome.runtime.onMessage.addListener(function (response) {
  console.log(response, 'res');

});
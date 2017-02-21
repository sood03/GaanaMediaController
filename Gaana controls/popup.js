// console.log = function() {}
function sleepFor(sleepDuration ){
    var now = new Date().getTime();
    // while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

document.addEventListener('DOMContentLoaded', function() {
var gaanaTab;
  chrome.tabs.getAllInWindow(null, function (tabs){
    for(var i=0;i<tabs.length;i++){
      if(tabs[i].url.indexOf(window.GAANA_WEBSITE) > -1){
        gaanaTab = tabs[i];
        console.log("got the tab: " + gaanaTab.url + " in content.js");
      }
    }
    if(gaanaTab == null){
      document.getElementById(window.PLAYER_TRACK_DIV_ID).innerText = window.NO_GAANA_TAB_FOUND_MESSAGE;
    }
    console.log("sending message to content.js for DOMinfo")
    chrome.tabs.sendMessage(gaanaTab.id,{message : window.GET_DOM_INFO_METHOD, from : window.POPUP}, setDOMInfo);
  });

  var play = document.getElementById(window.PLAY.toLowerCase());
  play.addEventListener('click', function() {
    console.log("play clicked and sending message to background.");

    if (play.src.match(window.PLAY_IMG)) {
      play.src = window.DEFAULT_PAUSE_IMG_PATH;
      console.log("sending message with window variable");
      chrome.tabs.sendMessage(gaanaTab.id,{message: window.PAUSE.toLowerCase(), from: window.POPUP});
    } else {
      play.src = window.DEFAULT_PLAY_IMG_PATH;
      console.log("sending message with window variable");
      chrome.tabs.sendMessage(gaanaTab.id,{message: window.PLAY.toLowerCase(), from: window.POPUP});
    }
    
  });

  var previous = document.getElementById(window.PREVIOUS.toLowerCase());
  previous.addEventListener('click', function() {
    console.log("previous clicked and sending message to background.");
    chrome.tabs.sendMessage(gaanaTab.id,{message: window.PREVIOUS.toLowerCase(), from: window.POPUP});
    sleepFor(1500);
    chrome.tabs.sendMessage(gaanaTab.id,{message: window.GET_TRACK_DETAILS_METHOD, from: window.POPUP}, setTrackDetails);
    play.src = window.DEFAULT_PAUSE_IMG_PATH;
  });

  var next = document.getElementById(window.NEXT.toLowerCase());
  next.addEventListener('click', function() {
    console.log("next clicked and sending message to background.");
    chrome.tabs.sendMessage(gaanaTab.id,{message: "next", from: window.POPUP});
    sleepFor(1500);
    chrome.tabs.sendMessage(gaanaTab.id,{message: window.GET_TRACK_DETAILS_METHOD, from: window.POPUP}, setTrackDetails);
    play.src = window.DEFAULT_PAUSE_IMG_PATH;
  });

  var shuffle = document.getElementById(window.SHUFFLE);
  shuffle.addEventListener('click', function() {
    console.log("shuffle clicked and sending message to background.");
    if (shuffle.src.match(window.SHUFFLE_ON_IMG)) {
      shuffle.src = window.DEFAULT_SHUFFLE_IMG_PATH;
    }
    else{
      shuffle.src = window.DEFAULT_SHUFFLE_ON_IMG_PATH;
    }
    console.log("sending message with window variable");
    chrome.tabs.sendMessage(gaanaTab.id,{message: window.SHUFFLE, from: window.POPUP});
  });

  var repeat = document.getElementById(window.REPEAT);
  repeat.addEventListener('click', function() {
    console.log("repeat clicked and sending message to background.");
    console.log(repeat.src);
    if (repeat.src.match(window.REPEAT_IMG)) {  
      repeat.src = window.DEFAULT_REPEAT_ONE_IMG_PATH;
    }
    else if( repeat.src.match(window.REPEAT_ONE_IMG)){
      repeat.src = window.DEFAULT_REPEAT_ALL_IMG_PATH;
    }
    else if( repeat.src.match(window.REPEAT_ALL_IMG)){
      repeat.src = window.DEFAULT_REPEAT_IMG_PATH;
    }
    chrome.tabs.sendMessage(gaanaTab.id,{message: window.REPEAT, from: window.POPUP});
  });

});

function setTrackDetails(details){
  console.log("setting track details");
  document.getElementById(window.PLAYER_TRACK_DIV_ID).innerText = details.mtrackName;
  document.getElementById(window.ALBUM_TRACK_DIV_ID).innerText = details.malbumName;
}

function setDOMInfo(info){
  console.log("in setDOMInfo");
  if(info.hasOwnProperty(window.NO_AUDIO_MESSAGE)){
    console.log(info.message);
    document.getElementById(window.PLAYER_TRACK_DIV_ID).innerText = window.PLAY_SONG_MESSAGE
    return;
  }
  var playButton = document.getElementById(window.PLAY.toLowerCase());
  var shuffleButton = document.getElementById(window.SHUFFLE);
  var repeatButton = document.getElementById(window.REPEAT);

  //set track name
  document.getElementById(window.PLAYER_TRACK_DIV_ID).innerText = info.mtrackName;
  document.getElementById(window.ALBUM_TRACK_DIV_ID).innerText = info.malbumName;

  //for play button
  console.log("before play check: "+window.TRUE_STATE);
  if(info.mplayActive == window.TRUE_STATE){
    playButton.src = window.DEFAULT_PLAY_IMG_PATH;
    console.log("changed source to " + playButton.src);
  }
  console.log(window.FALSE_STATE);
  if(info.mplayActive == window.FALSE_STATE){
    playButton.src = window.DEFAULT_PAUSE_IMG_PATH;
    console.log("changed source to " + playButton.src);
  }

  //for shuffle button
  if(info.mshuffleActive == window.FALSE_STATE){
    shuffleButton.src = window.DEFAULT_SHUFFLE_IMG_PATH;
    console.log("changed source to shuffle");
  }
  if(info.mshuffleActive == window.TRUE_STATE){
    shuffleButton.src = window.DEFAULT_SHUFFLE_ON_IMG_PATH;
    console.log("changed source to shuffle-on");
  }

  //for repeat button
  if(info.mrepeatActive == window.OFF_STATE){
    repeatButton.src = window.DEFAULT_REPEAT_IMG_PATH;
    console.log("changed source to repeat");
  }
  if(info.mrepeatActive == window.ALL_STATE){
    repeatButton.src = window.DEFAULT_REPEAT_ALL_IMG_PATH;
    console.log("changed source to repeat-on");
  }
  if(info.mrepeatActive == window.ONE_STATE){
    repeatButton.src = window.DEFAULT_REPEAT_ONE_IMG_PATH;
    console.log("changed source to repeat-on");
  }
}
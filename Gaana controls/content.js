// console.log = function() {}
console.log("in content.js with change");
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var trackDetails;
		if(( request.message == window.PAUSE.toLowerCase()) && (request.from == window.POPUP)) {
			var pauseButton = document.querySelectorAll('['+window.TITLE_TAG + '=' + window.PLAY + ']');
			if(~(pauseButton[0].className.indexOf(window.PLAY.toLowerCase()))){
				console.log("Clicking play to start the song");
				pauseButton[0].click();
			}
		}

		else if((request.message == window.PLAY.toLowerCase()) && (request.from == window.POPUP)){
			var playButton = document.querySelectorAll('['+window.TITLE_TAG + '=' + window.PAUSE + ']');
			console.log(playButton);
			if(~(playButton[0].className.indexOf(window.PAUSE.toLowerCase()))){
				console.log("Clicking pause to pause the song");
				playButton[0].click();
			}
		}

		else if((request.message == window.PREVIOUS.toLowerCase()) && (request.from == window.POPUP)){
			var previousButton = document.getElementsByClassName(window.PREV_SONG);
			console.log("Clicking previous to play the previous song");
			previousButton[0].click();
		}

		else if((request.message == window.NEXT.toLowerCase()) && (request.from == window.POPUP)){
			var nextButton = document.getElementsByClassName(window.NEXT_SONG);
			console.log("Clicking next to play the next song from: " + nextButton[0]);
			nextButton[0].click();
		}

		else if((request.message == window.SHUFFLE) && (request.from == window.POPUP)){
			document.getElementsByClassName(window.SHUFFLE)[0].click();
		}

		else if((request.message == window.REPEAT) && (request.from == window.POPUP)){
			document.getElementsByClassName(window.REPEAT)[0].click();
		}

		else if((request.message == window.GET_DOM_INFO_METHOD) && (request.from == window.POPUP)){
			console.log("asking for DOMinfo from popup");
			var DOMinfo, playActive, shuffleActive, repeatActive, mainPlayer;
			var mainId = document.getElementById(window.MAIN_PLAYER_ID);
			console.log("mainId: "+mainId);
			if(!(mainId.getAttribute(window.STYLE_ATTRIBUTE))){
				console.log("mainId not found.");
				mainPlayer = window.NO_AUDIO_SELECTED_MESSAGE;
				DOMinfo = {NoAudioMessage : mainPlayer};
				console.log('sending message back as ' + DOMinfo.message);
				sendResponse(DOMinfo);
			}
			else{
				var checkPlayActive = document.querySelectorAll('['+window.TITLE_TAG + '=' + window.PLAY + ']');
				console.log("checkPlayActive length: "+checkPlayActive.length);
				if(checkPlayActive.length != 0){
					var i = 0;
					for(i; i < checkPlayActive.length; i++){
						console.log("checkPlayActive[i] className: " + checkPlayActive[i].className);
						if((checkPlayActive[i].className.indexOf("play")) > -1){
							console.log("Checking state of playPause button. Setting play as " + window.TRUE_STATE);
							console.log("got in for : " + checkPlayActive[i]);
							playActive = window.TRUE_STATE;
						}
					}
				}

				var checkPauseActive = document.querySelectorAll('['+window.TITLE_TAG + '=' + window.PAUSE + ']');
				console.log("checkPauseActive length: "+checkPauseActive.length);
				if(checkPauseActive.length != 0){
					var j = 0;
					for(j; j < checkPauseActive.length; j++){
						console.log("checkPauseActive[j] className: " + checkPauseActive[j].className);
						if((checkPauseActive[j].className.indexOf("pause")) > -1){
							console.log("Checking state of playPause button. Setting pause as " + window.FALSE_STATE);
							console.log("got in for : " + checkPauseActive[j]);
							playActive = window.FALSE_STATE;
						}
					}
				}

				var shuffle = document.getElementsByClassName(window.SHUFFLE);
				console.log("shuffle title is: " + shuffle[0].className);
				if((shuffle[0].className.indexOf(window.ON_STATE) > -1)){
					console.log("shuffle is on");
					shuffleActive = window.TRUE_STATE;
				}
				else{
					shuffleActive = window.FALSE_STATE;	
					console.log("shuffle is off");
				}
				var repeat = document.getElementsByClassName(window.REPEAT);
				console.log("repeat title is: " + repeat[0].className);
				if((repeat[0].className.indexOf(window.ONE_STATE) > -1)){
					repeatActive = window.ONE_STATE;
				}
				else if(repeat[0].className.indexOf(window.ALL_STATE) > -1){
					repeatActive = window.ALL_STATE;	
				}
				else{
					repeatActive = window.OFF_STATE;
				}
				var trackName = document.getElementById(window.TRACKNAME_S_ID);
				var albumName = document.getElementById(window.TRACKNAME_A_ID);

				console.log("sending these info back as DOMinfo");
				console.log("playActive = " + playActive);
				console.log("shuffleActive = " + shuffleActive);
				console.log("repeatActive = " + repeatActive);
				console.log("trackName.innerText = " + trackName.innerText);
				console.log("albumName.innerText = " + albumName.innerText);
				DOMinfo = {
					mplayActive : playActive,
					mshuffleActive : shuffleActive,
					mrepeatActive : repeatActive,
					mtrackName : trackName.innerText,
					malbumName: albumName.innerText
				};
				sendResponse(DOMinfo);
			}
		}
		else if((request.message == window.GET_TRACK_DETAILS_METHOD) && (request.from == window.POPUP)){
			var trackName = document.getElementById(window.TRACKNAME_S_ID);
			var albumName = document.getElementById(window.TRACKNAME_A_ID);
			console.log("track name: " + trackName.textContent);
			console.log("track name: " + albumName.textContent);
			trackDetails = {
				mtrackName : trackName.innerText,
				malbumName : albumName.innerText
			};
			sendResponse(trackDetails);
		}
	});
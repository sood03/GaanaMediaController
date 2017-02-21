// console.log = function() {}
function hover(ele) {
	var element = document.getElementById(ele.toLowerCase());
	console.log("image path: " + window.HOVER_IMG_PATH + window.PATH_SEPARATOR + ele+ window.PNG_EXTENSION);
	element.setAttribute(window.SOURCE_ATTRIBUTE, window.HOVER_IMG_PATH + window.PATH_SEPARATOR + ele+ window.PNG_EXTENSION);
}

function unhover(ele) {
	var element = document.getElementById(ele.toLowerCase());
	console.log("image path: " + window.DEFAULT_IMG_PATH + window.PATH_SEPARATOR + ele+ window.PNG_EXTENSION);
	element.setAttribute(window.SOURCE_ATTRIBUTE, window.DEFAULT_IMG_PATH + window.PATH_SEPARATOR + ele+ window.PNG_EXTENSION);

}

function hoverPlay(ele) {
	var element = document.getElementById(ele.toLowerCase());
	if(element.src.match(window.PLAY_IMG))
		ele = window.PLAY_IMG;
	else
		ele = window.PAUSE_IMG;
	console.log("image path: " + window.HOVER_IMG_PATH + window.PATH_SEPARATOR + ele);
	element.setAttribute(window.SOURCE_ATTRIBUTE, window.HOVER_IMG_PATH + window.PATH_SEPARATOR + ele);
}

function unhoverPlay(ele) {
	var element = document.getElementById(ele.toLowerCase());
	console.log("hover:"+element.src);
	if(element.src.match(window.PLAY_IMG))
		ele = window.PLAY_IMG;
	else
		ele = window.PAUSE_IMG;
	console.log("image path: " + window.DEFAULT_IMG_PATH + window.PATH_SEPARATOR + ele);
	element.setAttribute(window.SOURCE_ATTRIBUTE, window.DEFAULT_IMG_PATH + window.PATH_SEPARATOR + ele);
}

function hoverShuffle(ele) {
	var element = document.getElementById(ele.toLowerCase());
	console.log("hover:"+element.src);
	if(element.src.match(window.SHUFFLE_ON_IMG))
		ele = window.SHUFFLE_ON_IMG;
	else
		ele = window.SHUFFLE_IMG;
	console.log("image path: " + window.HOVER_IMG_PATH + window.PATH_SEPARATOR + ele);
	element.setAttribute(window.SOURCE_ATTRIBUTE, window.HOVER_IMG_PATH + window.PATH_SEPARATOR + ele);
}

function unhoverShuffle(ele) {
	var element = document.getElementById(ele.toLowerCase());
	console.log("hover:"+element.src);
	if(element.src.match(window.SHUFFLE_ON_IMG))
		ele = window.SHUFFLE_ON_IMG;
	else
		ele = window.SHUFFLE_IMG;
	console.log("image path changing to: " + window.DEFAULT_IMG_PATH + window.PATH_SEPARATOR + ele);
	element.setAttribute(window.SOURCE_ATTRIBUTE, window.DEFAULT_IMG_PATH + window.PATH_SEPARATOR + ele);
}

function hoverRepeat(ele) {
	var element = document.getElementById(ele.toLowerCase());
	console.log("hover:"+element.src);
	if (repeat.src.match(window.REPEAT_IMG)) {  
      ele = window.REPEAT_IMG;
    }
    else if( repeat.src.match(window.REPEAT_ONE_IMG)){
      ele = window.REPEAT_ONE_IMG;
    }
    else if( repeat.src.match(window.REPEAT_ALL_IMG)){
      ele = window.REPEAT_ALL_IMG;
    }
	console.log("image path: " + window.HOVER_IMG_PATH + window.PATH_SEPARATOR + ele);
	element.setAttribute(window.SOURCE_ATTRIBUTE, window.HOVER_IMG_PATH + window.PATH_SEPARATOR + ele);
}

function unhoverRepeat(ele) {
	var element = document.getElementById(ele.toLowerCase());
	console.log("unhover:"+element.src);
	if (repeat.src.match(window.REPEAT_IMG)) {  
      ele = window.REPEAT_IMG;
    }
    else if( repeat.src.match(window.REPEAT_ONE_IMG)){
      ele = window.REPEAT_ONE_IMG;
    }
    else if( repeat.src.match(window.REPEAT_ALL_IMG)){
      ele = window.REPEAT_ALL_IMG;
    }
    console.log("image path: " + window.DEFAULT_IMG_PATH + window.PATH_SEPARATOR + ele);
	element.setAttribute(window.SOURCE_ATTRIBUTE, window.DEFAULT_IMG_PATH + window.PATH_SEPARATOR + ele);
}


document.addEventListener('DOMContentLoaded', function () {
	
	var elementPrev = document.getElementById(window.PREVIOUS.toLowerCase());
	elementPrev.addEventListener(window.HOVER_ACTION, function(){
		hover(window.PREVIOUS);
	});
	elementPrev.addEventListener(window.UNHOVER_ACTION, function(){
		unhover(window.PREVIOUS);
	});

	var elementNext = document.getElementById(window.NEXT.toLowerCase());
	elementNext.addEventListener(window.HOVER_ACTION, function(){
		hover(window.NEXT);
	});
	elementNext.addEventListener(window.UNHOVER_ACTION, function(){
		unhover(window.NEXT);
	});

	var elementPlay = document.getElementById(window.PLAY.toLowerCase());
	elementPlay.addEventListener(window.HOVER_ACTION, function(){
		hoverPlay(window.PLAY);
	});
	elementPlay.addEventListener(window.UNHOVER_ACTION, function(){
		unhoverPlay(window.PLAY);
	});

	var elementShuffle = document.getElementById(window.SHUFFLE);
	elementShuffle.addEventListener(window.HOVER_ACTION, function(){
		hoverShuffle(window.SHUFFLE);
	});
	elementShuffle.addEventListener(window.UNHOVER_ACTION, function(){
		unhoverShuffle(window.SHUFFLE);
	});

	var elementShuuffle = document.getElementById(window.REPEAT);
	elementShuuffle.addEventListener(window.HOVER_ACTION, function(){
		hoverRepeat(window.REPEAT);
	});
	elementShuuffle.addEventListener(window.UNHOVER_ACTION, function(){
		unhoverRepeat(window.REPEAT);
	});

});

$(document).ready(function(){
    
    var context;
    var oscillator;
    
    //Dica de: http://www.html5rocks.com/en/tutorials/getusermedia/intro/
	function init(input) {
	  try {
	    window.AudioContext = window.AudioContext||window.webkitAudioContext;
	    context = new AudioContext();
	  }
	  catch(e) {
	    alert('Web Audio API is not supported in this browser');
	  }
	}
	
	function hasGetUserMedia() {
	  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
	            navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}
	
	if (hasGetUserMedia()) {
		navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
		navigator.getUserMedia({ audio: true }, init, function (err) {
			alert(":~(");
	        console.error(err)
	    })
	} else {
	  alert('getUserMedia() is not supported in your browser');
	}
	
	$(".play").on("click",function(){
		oscillator = context.createOscillator();
		oscillator.connect(context.destination);
		oscillator.type = 0; //sine wave
		oscillator.frequency.value = 440; //hertz
		oscillator.start(0);
	})
    
	$(".stop").on("click",function(){
		oscillator.stop(0);
	})
});

$(document).ready(function(){
    
    var context;
    var oscillator;
    var server = io.connect();
    
    function playSound(data) {
    	oscillator = context.createOscillator();
		oscillator.connect(context.destination);
		oscillator.type = oscillator.SINE;
		oscillator.frequency.value = data; //hertz
		oscillator.detune.value = Math.pow(2, 1/12) * 10; 
		oscillator.start(0);
    }
    
    function stopSound() {
    	oscillator.stop(0);
    }
    
    //Dica de: http://www.html5rocks.com/en/tutorials/getusermedia/intro/
	function init(input) {
	  try {
	    window.AudioContext = window.AudioContext||window.webkitAudioContext;
	    context = new AudioContext();
	 
	    $(".togglePlay").on("mouseover",function(){
	    	server.emit("play", $(this).data("freq"));
	    	playSound($(this).data("freq"));
		})
		$(".togglePlay").on("mouseout",function(){
			server.emit("stop",$(this).data("freq"));
			stopSound();
		})
	  }
	  catch(e) {
	    alert('Web Audio API is not supported in this browser or error: '+e);
	  }
	}
	
	/*function hasGetUserMedia() {
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
	}*/
    
	server.on("play", function(data) {
		playSound(data);
		$("li[data-freq='"+data+"']").find("a").removeClass("stoped");
		$("li[data-freq='"+data+"']").find("a").addClass("played");
		
	});
	
	server.on("stop", function(data) {
		stopSound();
		$("li[data-freq='"+data+"']").find("a").removeClass("played");
		$("li[data-freq='"+data+"']").find("a").addClass("stoped");
	});
	
	init();
});

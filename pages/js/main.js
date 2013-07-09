$(document).ready(function(){
    
    var context;
    var oscillator;
    
    //Dica de: http://www.html5rocks.com/en/tutorials/getusermedia/intro/
	function init(input) {
	  try {
	    window.AudioContext = window.AudioContext||window.webkitAudioContext;
	    context = new AudioContext();
	 
	    $(".togglePlay").on("mouseover",function(){
			oscillator = context.createOscillator();
			oscillator.connect(context.destination);
			oscillator.type = oscillator.SINE;
			oscillator.frequency.value = $(this).data("freq"); //hertz
			oscillator.detune.value = Math.pow(2, 1/12) * 10; 
			oscillator.start(0);
		})
		$(".togglePlay").on("mouseout",function(){
			oscillator.stop(0);
		})
	  }
	  catch(e) {
	    alert('Web Audio API is not supported in this browser or error: '+e);
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
    
});

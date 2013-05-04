//billemeyer.k@gmail.com


$(document).ready(function() {
                  
  //PREVENT DRAGGING
  document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
                  
                  
	// Get Canvas & Context
	var canvas = document.getElementById('clockCanvas');
	window.ctx = canvas.getContext('2d');
	window.audioBeep = document.getElementById('alarmBeep');
	// Initialize Settings
	var x = 20,
		y = 20,
		size = 15,
		pointSize = 4,
		setting = "hours",
		i = 0;
	window.alarmClock = new alarm(x, y, size, pointSize, "rgb(10, 10, 10)", "rgb(200, 200, 200)", ctx);
	window.timeSet = alarmClock.alarmHour + alarmClock.alarmMin;
	//window.rightNow = new Date().getTime() / 1000;
	// alert(timeSet);
	// Pick up keypresses
/* $(document).keydown(function(e) {
                                      if (alarmClock.status === "set"){
                                      switch(e.which){
                                      case 38:
                                      if (setting === "hours"){
                                      alarmClock.alarmHour = alarmClock.alarmHour === 24 ? 0 : alarmClock.alarmHour + 1;
                                      }else{
                                      alarmClock.alarmMin = alarmClock.alarmMin === 59 ? 0 : alarmClock.alarmMin + 1;
                                      }
                                      break;
                                      case 40:
                                      if (setting == "hours"){
                                      alarmClock.alarmHour = alarmClock.alarmHour === 0 ? 24 : alarmClock.alarmHour - 1;
                                      }else{
                                      alarmClock.alarmMin = alarmClock.alarmMin === 0 ? 59 : alarmClock.alarmMin - 1;
                                      }
                                      break;
                                      case 37:
                                      case 39:
                                      setting = setting === "mins" ? "hours" : "mins";
                                      break;
                                      }
                                      }
                                      
                                      });
                  */
	// Click
	$("#up").click(function() {
		if (alarmClock.status === "set") {
			alarmClock.alarmHour = alarmClock.alarmHour === 24 ? 0 : alarmClock.alarmHour + 1;
			setting = setting === "mins" ? "hours" : "mins";
		}
	});
	$("#upminute").click(function() {
		if (alarmClock.status === "set") {
			alarmClock.alarmMin = alarmClock.alarmMin === 59 ? 0 : alarmClock.alarmMin + 1;
			setting = setting === "mins";
		}
	});
	$("#downhour").click(function() {
		if (alarmClock.status === "set") {
			alarmClock.alarmHour = alarmClock.alarmHour === 0 ? 24 : alarmClock.alarmHour - 1;
			setting = setting === "mins" ? "hours" : "mins";
		}
	});
	$("#downminute").click(function() {
		if (alarmClock.status === "set") {
			alarmClock.alarmMin = alarmClock.alarmMin === 0 ? 59 : alarmClock.alarmMin - 1;
			setting = setting === "mins";
		}
	});
	// Draw Alarm
	setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		alarmClock.draw();
		if (alarmClock.status == "alarm" && i == 0) {
			// Play Beep
			audioBeep.play();
			$('#done').css('display', 'block');
			//alert('Red Alert');
		}
		i = i > 8 ? 0 : i + 1;
	}, 100);
	//Kill Alarm
	$('#done').click(function() {
		// window.location.reload(true);
		audioBeep.pause();
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		//alarmClock.draw();
		window.alarmClock = new alarm(x, y, size, pointSize, "rgb(10, 10, 10)", "rgb(200, 200, 200)", ctx);
	});
	//alert(alarmHour.toString());
	//alert(rightNow);
	// Set Alarm
	$('#setAlarm').click(function() {
		alarmClock.status = alarmClock.status == "set" ? "clock" : "set";
		alarmClock.alarmStatus = "on";
		$(this).toggleClass("activated");
		$('.buttons').animate({opacity:'1'}, 1000);
		
		});
		return false;
	});
	$('#cancel').click(function() {
		alarmClock.alarmStatus = "off";
		
		if (alarmClock.status == "set") {
			$('#setAlarm').toggleClass("activated");
			$('#timer').pietimer({
			color: '#234',
			fill: false,
			showPercentage: true,
			timerSeconds: 5,
			callback: function() {
				alert("Time's up!");
				$('#timer').pietimer('reset');
			}
			});
		}
		return false;
	});
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


$(document).ready(function() {
                  
                  // Get Canvas & Context
                  var canvas = document.getElementById('clockCanvas');
                  var ctx = canvas.getContext('2d');
                  var audioBeep = document.getElementById('alarmBeep');
                  
                  // Initialize Settings
                  var x = 20,
                  y = 20,
                  size = 100,
                  pointSize = 10,
                  setting = "hours",
                  i = 0;
                  
                  var alarmClock = new alarm(x, y, size, pointSize, "rgb(255, 0, 0)", "rgb(10, 10, 10)",  ctx);
                  
                  
                  // Pick up keypresses
                  $(document).keydown(function(e) {
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
                  
                  // Draw Alarm
                  setInterval(function(){
                              ctx.clearRect(0, 0, canvas.width, canvas.height);
                              alarmClock.draw();          
                              if (alarmClock.status == "alarm" && i == 0){
                              // Play Beep
                              audioBeep.play();   
                              }  
                              i = i > 8 ? 0 : i +1;        
                              }, 100); 
                  
                  
                  // Set Alarm
                  $('#setAlarm').click(function(){
                                       alarmClock.status = alarmClock.status == "set" ? "clock" : "set";
                                       alarmClock.alarmStatus = "on";
                                       $(this).toggleClass("activated");       
                                       return false;
                                       });    
                  
                  $('#cancel').click(function(){
                                     alarmClock.alarmStatus = "off";
                                     if (alarmClock.status == "set"){
                                     $('#setAlarm').toggleClass("activated");
                                     }
                                     return false;
                                     });   
                  
                  
                  
                  
                  });


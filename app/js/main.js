'use strict';

/**
 * [DEMO] by @dlsym
 */


var D = function(canvas) {
  this.canvas = canvas;
  this.ctx    = canvas.getContext('2d');
  this.cx = 80;
  this.cy = 100;
  this.incX = 4;
  this.incY = -4;
};

D.prototype.resize = function() {
  var self = this;

  var width = window.innerWidth - 20;
  var height = window.innerHeight - 20;
  self.ctx.canvas.width  = width
  self.ctx.canvas.height = height

};

D.prototype.drawCircleAt = function(x,y,r) {
  var self = this;
  self.ctx.beginPath();
  self.ctx.fillStyle = "#ffffff";
  self.ctx.arc(x, y, r, 0, 2*Math.PI);
  self.ctx.fill();
};

D.prototype.animateCircle = function() {
  var self = this;
  // bounce
  if( self.cx > self.canvas.width - 50 ) {
    self.incX = -10;  
  }
  if( self.cy > self.canvas.height - 50 ) {
    self.incY = -10;  
  }
  if(self.cx <= 40){
    self.incX = 10;
  }
  if(self.cy <= 40) {
    self.incY = 10;
  }

  self.cx += self.incX; self.cy += self.incY;

  // pulse
  var r = 40 + Mth.pulse( 40, (self.t*0.0003) % 0.6 )*40;
  self.drawCircleAt(self.cx, self.cy, r);
};

D.prototype.render = function() {
  var self = this;

  self.ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // motionblur
  self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);

  self.animateCircle();
};

D.prototype.animate = function(t) {
  var self = this;
  window.requestAnimationFrame(function(t) {
    self.t = t;
    self.animate()
  });
  self.render();
};

D.prototype.run = function() {
  var self = this;
  self.t = 0;
  self.resize();
  self.animate(0);
};


// Run it.
var canvas = document.getElementById('cnv');
var demo   = new D(canvas);
demo.run();

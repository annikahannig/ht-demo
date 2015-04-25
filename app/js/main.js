'use strict';

/**
 * [DEMO] by @dlsym
 */


var D = function(canvas) {
  this.canvas = canvas;
  this.ctx    = canvas.getContext('2d');

};

D.prototype.resize = function() {
  var self = this;

  width = window.innerWidth
  height = window.innerHeight - 100

  self.ctx.canvas.width  = width
  self.ctx.canvas.height = height
};

D.prototype.drawCircleAt = function(x,y,r) {
  var self = this;
  self.ctx.beginPath();
  self.ctx.fillStyle = "#ffffff";
  self.ctx.arc(x, y, r, 0, 2*Math.PI);
};

D.prototype.render = function() {
  var self = this;

  self.ctx.fillStyle = "rgba(0, 0, 0, 0.75)"; // motionblur
  self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
};

D.prototype.animate = function() {
  var self = this;
  window.requestAnimationFrame(self.animate);
  self.render();
};

D.prototype.run = function() {
  var self = this;
  self.t = 0;
  self.resize();
  self.render();
};


// Run it.
var canvas = document.getElementById('cnv');
var demo   = new D(canvas);
demo.run();

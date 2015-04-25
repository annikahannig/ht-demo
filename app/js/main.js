'use strict';

/**
 * [DEMO] by @dlsym
 */


var Star = function(ctx) { 
  this.ctx = ctx;
  this.canvas = ctx.canvas;
  this.reset();
};

Star.prototype.reset = function() {
  var self = this;

  self.x = 2*(Math.random()*self.canvas.width)  - self.canvas.width;
  self.y = 2*(Math.random()*self.canvas.height) - self.canvas.height;
  self.z = 0.5*(self.canvas.width+self.canvas.height);
};

Star.prototype.draw = function() {
  var self = this;
};

var Starfield = function(ctx, starcount) {
  this.ctx = ctx;
  this.canvas = ctx.canvas;

  this.starcount = starcount;

  this.stars = [];
  for(var i = 0; i < starcount; i++){
    this.stars.push(new Star(ctx));
  }
};


var Starfield.prototype.draw = function() {
  var self = this; 
  for(var i = 0; i < self.starcount; i++) {
    self.stars[i].draw();
  }
}

// .::..::.

var D = function(canvas) {
  this.canvas = canvas;
  this.ctx    = canvas.getContext('2d');
};

D.prototype.resize = function() {
  var self = this;

  var width = window.innerWidth - 20;
  var height = window.innerHeight - 20;
  self.ctx.canvas.width  = width
  self.ctx.canvas.height = height

  self.sf = new Starfield(this.ctx, 500);
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

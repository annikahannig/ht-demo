'use strict';

/**
 * [DEMO] by @dlsym
 */



/*

var Star = function(ctx) { 
  this.ctx = ctx;
  this.canvas = ctx.canvas;
  this.reset();

  this.dZ = 0.1;
};

Star.prototype.reset = function() {
  var self = this;

  self.x = -0.5*(Math.random()*self.canvas.width*2)  + self.canvas.width;
  self.y = -0.5*(Math.random()*self.canvas.height*2) + self.canvas.height;
  self.z = 1;// Math.random()*4;// 0.5*(self.canvas.width+self.canvas.height);
};

Star.prototype.draw = function() {
  var self = this;
  var c = self.ctx;

};

var Starfield = function(ctx, starcount) {
  this.ctx = ctx;
  this.canvas = ctx.canvas;

  this.starcount = starcount;

  this.stars = new Array(starcount);
  for(var i = 0; i < starcount; i++){
    this.stars[i] = new Star(ctx);
  }
};

Starfield.prototype.animate = function() {
  var self = this; 
  for(var i = 0; i < self.starcount; i++) {
    self.stars[i].z -= 0.01;
  }
};

Starfield.prototype.draw = function() {
  var self = this; 
  for(var i = 0; i < self.starcount; i++) {
    var st = self.stars[i];
    // project
    var px = st.x / st.z;
    var py = st.y / st.z;
    
    self.ctx.fillStyle = '#ffffff';
    self.ctx.rect(px, py, 1,1);
    self.ctx.fill()
  }
};

*/

// .::..::.

var D = function(canvas) {
  var self = this;
  this.canvas = canvas;
  this.ctx    = canvas.getContext('2d');

  // Initialize starfield
  this.starcount = 500;
  this.starfield = new Array(this.starcount);

  console.log("[Starfield] Init.");
  for(var i = 0; i<self.starcount; i++) {
    // [x,y,z]
    self.starfield[i] = [
      1 - 2*Math.random(),
      1 - 2*Math.random(),
      Math.random()*0.02
    ];
  }
};

D.prototype.resize = function() {
  var self = this;

  var width = window.innerWidth - 20;
  var height = window.innerHeight - 20;
  self.ctx.canvas.width  = width
  self.ctx.canvas.height = height

};


D.prototype.render = function() {
  var self = this;

  self.ctx.fillStyle = "rgba(0, 0, 0, 0.275)"; // motionblur
  self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);

  var w = self.ctx.canvas.width;
  var h = self.ctx.canvas.height;

  // Render starfield
  for(var i = 0; i<self.starcount; i++) {
    var s = self.starfield[i];
    var px = 0.5*w + (s[0] / s[2]);
    var py = 0.5*h + (s[1] / s[2]);
    var alpha = (1/s[2])/333;
    
    if( px > w || px <= 0 || py > h || py <= 0 ) {
      s[2] = Math.random()*0.02;
    }

    self.ctx.fillStyle = 'rgba(255, 255, 255, '+alpha+')'; // motionblur
    self.ctx.fillRect( px, py, 2, 2 );

    s[2] -= 0.0001;
    
  }
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

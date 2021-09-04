/*
 * runstant
 */

phina.globalize();

var SCX = 1000;
var SCY = 1000;
var g = 0.98;
var holesize = 25;
var ballsize = 10;

phina.define('planet', {
  superClass: 'CircleShape',

  init: function(option) {
    this.superInit(option);
    
    this.radius = ballsize;
    this.fill = 'blue';
    this.stroke = 0;

},

  update:function(){

  }
});

phina.define('MainScene', {
  superClass: 'DisplayScene',
  width: SCX,
  height: SCY,
  
  init: function(option) {
    this.superInit(option);
    
        
    var hole = CircleShape({
      fill: 'black',
      radius: holesize,
      stroke: 0,
    }).setPosition(SCX/2,SCY/2).addChildTo(this);
    
    (10).times(function(i){
    var hs = CircleShape({
      fill: 'black',
      radius: holesize+i*50,
      stroke: 0,
    }).addChildTo(hole);
    hs.alpha = 0.3/i;

    })
    
    var p = planet().setPosition(Math.randint(0,SCX),Math.randint(0,SCY)).addChildTo(this);
    p.physical.friction = 0.99;

    
    
        
    var label = Label({
      align: 'right',
      fill: 'white',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }).addChildTo(this).setPosition(SCX-10,SCY-20);
    
    var counter = 0;
    
    var px = hole.x;
    var py = hole.y;

    var ps = planet().setPosition(p.x,p.y).addChildTo(this);
    ps.alpha = 0.5;
    
    this.update = function(){

      if(p.top < 0){
        p.top = 0;
        p.physical.velocity.y *= -1;
      }
      if(p.right > SCX){
        p.right = SCX;
        p.physical.velocity.x *= -1;
      }
      if(p.bottom > SCY){
        p.bottom = SCY;
        p.physical.velocity.y *= -1;
      }
      if(p.left < 0){
        p.left = 0;
        p.physical.velocity.x *= -1;
      }
      
      counter += 1;
      
      label.text = counter;

      ps.x = p.x;
      ps.y = p.y;

      D = Math.atan2(py-p.y,px-p.x) * 180 / Math.PI;
      r = Math.pow((py-p.y)/100,2) + Math.pow((px-p.x)/100,2);

      
    p.physical.gravity = Vector2().fromDegree(D,g/r);

      this.onpointstay = function(e) {
      px = e.pointer.x;
      py = e.pointer.y;
      hole.x = px;
       hole.y = py;
    }
    
    if(hole.left < p.left && hole.right > p.right　&& hole.top < p.top && hole.bottom > p.bottom){
      ps.x = p.x;
      ps.y = p.y;
      p.remove();
      this.setInteractive(false);
      if(ps.radius === ballsize){
      console.log('in');
      }
      ps.alpha =1;
      ps.radius -= 1;
      if(ps.radius <= 0){
        this.exit({
          score: counter,
        });
      }
    }
    }
      
      
    }
  },
);

phina.main(function() {
  var app = GameApp({
    width: SCX,
    height : SCY,
    startLabel: 'main',
  });
  
  app.run();
});

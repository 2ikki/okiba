/*
 * runstant
 */

phina.globalize();

var SCX = 640;
var SCY = 960;
var R = 20;
var HP = 100;
var M1size = 10;
var speed = 10;

phina.define('M1', {
  superClass: 'CircleShape',

  init: function(option) {
    this.superInit(option);
    
    this.radius = M1size;
    this.fill = 'blue';
    
    var degree = Math.randint(0,360);
    this.physical.velocity.x = Math.cos(degree*(Math.PI/180)) * speed;
    this.physical.velocity.y = Math.sin(degree*(Math.PI/180)) * speed;
    
    console.log(degree+90);

},

  update:function(){
    
    
    if(this.top < 0){
      this.top = 0;
      this.physical.velocity.y *= -1;
    }
    if(this.right > SCX){
      this.right = SCX;
      this.physical.velocity.x *= -1;
    }
    if(this.bottom > SCY){
      this.bottom = SCY;
      this.physical.velocity.y *= -1;
    }
    if(this.left < 0){
      this.left = 0;
      this.physical.velocity.x *= -1;
    }
  }
});

phina.define('MainScene', {
  superClass: 'DisplayScene',
  width: SCX,
  height: SCY,
  
  init: function() {
    this.superInit();

    var M1group = DisplayElement().addChildTo(this);
    this.M1group = M1group;
    
    this.onpointstart = function(p){
      M1().setPosition(p.pointer.x,p.pointer.y).addChildTo(M1group);
    };
        
    var label = Label({
      align: 'right',
      fill: 'white',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }).addChildTo(this).setPosition(SCX-10,SCY-20);
    
    var counter = 0;
    
    this.update = function(){
      
      counter += 1;
      
      label.text = counter;
      
      M1group.children.each(function(i){
        M1group.children.each(function(j){
          
          if(i !== j && i.hitTestElement(j) && i.run !== true){
            var micro = M1().setPosition((i.x + j.x)/2,(i.y + j.y)/2).addChildTo(M1group);
            micro.physical.velocity.x = (i.physical.velocity.x + j.physical.velocity.x)/2;
            micro.physical.velocity.y = (i.physical.velocity.y + j.physical.velocity.y)/2;
            micro.radius =Math.hypot(i.radius,j.radius);
            i.run = true;
            i.remove();
            j.remove();
          }
          
        })
      })
      
      
    }
  },
});

phina.main(function() {
  var app = GameApp({
    width: SCX,
    height : SCY,
    startLabel: 'main',
  });
  
  app.run();
});

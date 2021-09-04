/*
 * runstant
 */

phina.globalize();

var SCX = 640;
var SCY = 960;
var R = 20;
var HP = 100;
var M1size = 30;
var speed = 20;

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
          
          if(i !== j && i.hitTestElement(j)){
            var dif = Vector2(i.x - j.x, i.y - j.y);
            dif.normalize();
            var vdif = Vector2(i.physical.velocity.x + j.physical.velocity.x,i.physical.velocity.y + j.physical.velocity.y)
            i.physical.velocity.x = dif.x * speed;
            i.physical.velocity.y = dif.y * speed;
            
            
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

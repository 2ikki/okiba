/*
 * runstant
 */

phina.globalize();

var SCX = 500;
var SCY = 500;
var R = 20;
var HP = 100;
phina.define('MainScene', {
  superClass: 'CanvasScene',
  width: SCX,
  height: SCY,
  
  init: function() {
    this.superInit();
    
    var shape = StarShape().addChildTo(this);
    shape.setPosition(SCX/2, SCY/2);
    shape.fill ='green'
    
    var circle = CircleShape().addChildTo(this);
    circle.radius =R;
    circle.setPosition(Math.randint(0,SCX),Math.randint(0,SCY));
    circle.vx = Math.randint(-5,5);
    circle.vy = Math.randint(-5,5);
    
    var circle2 = CircleShape().addChildTo(this);
    circle2.radius =R;
    circle2.setPosition(Math.randint(0,SCX),Math.randint(0,SCY));
    circle2.vx = Math.randint(-5,5);
    circle2.vy = Math.randint(-5,5);
    
    var label = Label().addChildTo(this).setPosition(SCX-50,SCY-50);
    
    var col = 0;
    this.update = function(){
      
      circle.x += circle.vx;
      circle.y += circle.vy;
      circle2.x += circle2.vx;
      circle2.y += circle2.vy;
      if(circle.top < 0){
        circle.top = 0;
        circle.vy *= -1;
      }
      if(circle.left < 0){
        circle.left = 0;
        circle.vx *= -1;
      }
      if(circle.bottom > SCY){
        circle.bottom = SCY;
        circle.vy *= -1;
      }
      if(circle.right > SCX){
        circle.right = SCX;
        circle.vx *= -1;
      }
      if(circle2.top < 0){
        circle2.top = 0;
        circle2.vy *= -1;
      }
      if(circle2.left < 0){
        circle2.left = 0;
        circle2.vx *= -1;
      }
      if(circle2.bottom > SCY){
        circle2.bottom = SCY;
        circle2.vy *= -1;
      }
      if(circle2.right > SCX){
        circle2.right = SCX;
        circle2.vx *= -1;
      }
      
      HP -= 0.1;
      
      if(HP < 0){
        circle.hide();
        circle2.hide();
        label.text = (0.00).ceil(2);
      label.fill = 'red';
      }else{
      label.text= HP.ceil(2);
      circle.radius = R * HP / 100;
      circle2.radius = R * HP / 100;
      }
      
      if(circle.hitTestElement(shape)){
        HP += 0.5;
        circle.fill = 'yellow'
      }else{
        circle.fill = 'red'
      }
      if(circle2.hitTestElement(shape)){
        HP += 0.5;
        circle2.fill = 'yellow'
      }else{
        circle2.fill = 'red'
      }
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

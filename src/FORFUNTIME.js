tabris.ui.set("toolbarVisible", false);
tabris.ui.set("displayMode", "fullscreen");
tabris.ui.set("")
var page = new tabris.Page({
topLevel: true
}).open();

//---------------------------------------------------------------------------------------------------------------------------
window.setInterval(timer, 0)
window.setInterval(timer, 0)
window.setInterval(timer, 0)
var count = 0;
var set = 0;
var pull_push = 0;
var second = 0;
var minute = 0;

var composite = new tabris.Composite({
   layoutData: {left: 2, top: 2, right: 2, bottom: 2},
  background: "rgba(120,120,120,0.1)",
  cornerRadius: 5,
  elevation: 15,
  transform: {translationY: screen.height/1.08}
}).appendTo(page);

var pullpush = new tabris.TextView({
  layoutData: {left: 2, right: 2, top: -2},
  text: "PULL UP TO SHOW THE MINUTES",
  font: "bold 16px",
  textColor: "rgba(0,0,0,0.1)",
  alignment: "center",
  opacity: 1,
  markupEnabled: true,
  transform: {scaleY: 0.75, scaleX: 1.25}
}).appendTo(composite);

var records = new tabris.TextView({
  layoutData: {centerX: 0, top: 100},
  font: "bold 50px",
  text: minute +"<br\> minutes gone",
  textColor: "rgba(0,0,0,0.3)",
  alignment: "center",
  opacity: 0,
  markupEnabled: true
}).appendTo(composite);

var label = new tabris.TextView({
  layoutData: {centerX: 0, centerY: 0},
  font: "bold 20px",
  textColor: "rgba(0,0,0,0.1)",
  alignment: "center"
}).on("animationend", function(){
  if (set < 14){
  (++set);
  }
  if (count >= 60){
  this.animate({opacity: 0.25, transform: {scaleX: set, scaleY: set, rotation: 10*set*Math.PI}}, {duration: 1000, repeat: 1, reverse: true, easing: "ease-in-out"})
  this.set({textColor: "rgba(0,0,0,0.75)"})
  } else {
  this.animate({transform: {scaleX: set, scaleY: set, rotation: 10*set*Math.PI}}, {duration: 1000, repeat: 1, reverse: true, easing: "ease-in-out"})
  }
}).appendTo(page);

var label2 = new tabris.TextView({
  layoutData: {centerX: 0, centerY: 0},
  font: "bold 50px",
  text: "Tap the screen to start",
  textColor: "rgba(0,0,0,0.1)",
  alignment: "center"
}).on("animationend", function(){
  (++second)
  this.set("text", (++count))
  label.set("text", count)
      if (second == 60){
      records.set("text", (++minute)+"<br\> minutes gone");
      second = 0
    } else if (second == 30){
      records.set("text", (minute)+".5"+"<br\> minutes gone");
    }
  if (count >= 60){
  this.animate({opacity: 0.25, transform: {scaleX: set, scaleY: set}}, {duration: 500, repeat: 1, reverse: true, easing: "ease-in-out"})
  this.set({textColor: "rgba(0,0,0,0.75)"})
  } else {
  this.animate({transform: {scaleX: set, scaleY: set}}, {duration: 500, repeat: 1, reverse: true, easing: "ease-in-out"})
  }
}).appendTo(page);
      
page.on("swipe:up", function(widget){
  tabris.ui.set("displayMode", "fullscreen");
  if (pull_push == 0){
    pullpush.set({text: "PULL DOWN TO HIDE THE MINUTES"})
  pullpush.animate({transform: {translationY: 15, scaleX: 1.25, scaleY: 0.75}},{duration: 500})
  composite.animate({transform: {translationY: -screen.height/70}})
  records.animate({opacity: 1}, {delay: 500, duration: 400})
  pull_push = 1
  }
}).on("swipe:down", function(widget){
  tabris.ui.set("displayMode", "fullscreen");
  if (pull_push == 1){
    pullpush.set({text: "PULL UP TO SHOW THE MINUTES"})
    pullpush.animate({transform: {translationY: 0, scaleX: 1.25, scaleY: 0.75}},{duration: 500})
    composite.animate({transform: {translationY: screen.height/1.08}})
    records.animate({opacity: 0})
    pull_push = 0
  }
}).once("tap",function(widget){
  label2.set({text: count, font: "bold 10px"});
  label.set("text", count);
  if (set == 0){
    (++set);
  label.animate()
  label2.animate()
  }
});

function timer(widget){
  tabris.ui.set("displayMode", "fullscreen");
};

var $startDrag=function(e,t){var n={left:0,top:0,currentX:0,currentY:0,flag:!1};e.addEvent("mousedown",function(e){n.flag=!0,n.left=t.getPosition().x,n.top=t.getPosition().y,n.currentX=e.page.x,n.currentY=e.page.y}),e.onselectstart=function(){return!1},document.addEvents({mouseup:function(){n.flag=!1},mousemove:function(e){if(n.flag){var r=e.page.x,i=e.page.y,s=r-n.currentX,o=i-n.currentY;t.css({left:n.left+s,top:n.top+o})}}})}
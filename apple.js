// up down left right
var Bordary = [10,490,10,490];
var walls =	[
	  [[50,480],[510,510]]
	  //[[10,400],[470,450]],
	  //[[50,320],[510,370]],
	  //[[10,240],[470,290]],
	  //[[50,160],[510,210]],
	  //[[10,80],[470,130]],
	  //[[50,10],[510,50]]
	];
/*var walls ==	[
	  [[10,10],[510,41]],
	  [[10,10],[41,510]],
	  [[10,479],[510,510]],
	  [[479,10],[510,510]],
	  [[77,70],[510,98]],
	  [[77,70],[306,154]],
	  [[10,180],[344,233]],
	  [[339,129],[400,281]],
	  [[78,271],[148,430]],
	  [[139,312],[436,377]],
	  [[434,95],[510,510]],
	  [[263,408],[368,510]],
	]*/
var Apple = [[0,0],[0,0]];
var allowmove = 0;
var gameend=1;
var toggleend=0;
var togglesave = 0;
var seconds = 600;
var countsecond;
var apikey;
function Initiate() {
	console.log(apikey);
	gameend=0;
	onesecond() ;
	document.getElementById("Startbtn").disabled = true;
	returnspawn() ;
	i=0;
	while (i < walls.length) {
  		addwall(i);
  		i++;
	}
	addgoal(455,45);
}
function notallowmove(){allowmove = 0;}
function allowmoveq(){if(gameend==0&&document.getElementById("W"+(walls.length-1).toString()).complete){allowmove = 1;}}
//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    //pos3 = e.clientX;
    //pos4 = e.clientY;
    // set the element's new position:
if(Math.abs(pos1)<20&&Math.abs(pos2)<20){

    pos3 = e.clientX;
    pos4 = e.clientY;
    if(allowmove == 1){
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        if(elmnt.offsetTop<Bordary[0]){elmnt.style.top = Bordary[0] + "px";}
        if(elmnt.offsetTop>Bordary[1]){elmnt.style.top = Bordary[1] + "px";}
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        if(elmnt.offsetLeft<Bordary[2]){elmnt.style.left = Bordary[2] + "px";}
        if(elmnt.offsetLeft>Bordary[3]){elmnt.style.left = Bordary[3] + "px";}
        //if(Math.abs(pos1)>10||Math.abs(pos2)>10){document.getElementById("Result").innerHTML = "Catched you. Jumper!";notallowmove();gameend=1;}
        i=0;
        while (i < walls.length) {
            checkhit(elmnt.offsetLeft,elmnt.offsetTop,i)
            i++
        }
        checkgoal(elmnt.offsetLeft,elmnt.offsetTop)
    }
    if(e.clientY<Bordary[0]||e.clientY>Bordary[1]+21||e.clientX<Bordary[2]||e.clientX>Bordary[3]+21){allowmove = 0;}
}
  }
  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function checkhit(L,T,num){
    if(L>(walls[num][0][0]-21)&&L<walls[num][1][0]&&T>(walls[num][0][1]-21)&&T<walls[num][1][1]){document.getElementById("Result").innerHTML = "OOPS!"; setTimeout(function(){document.getElementById("Result").innerHTML = ""}, 2000);returnspawn() ;notallowmove();}
}
function checkgoal(L,T){
    if(L>(Apple[0][0]-21)&&L<Apple[1][0]&&T>(Apple[0][1]-21)&&T<Apple[1][1]&&gameend==0){gameend=1;document.getElementById("Result").innerHTML = "Yummy!";notallowmove();endgame();hitsave();}
}
function addwall(num2) {
  var x = document.createElement("IMG");
  //x.setAttribute("src", "https://sites.google.com/site/kivkeaw00/keb-rup/Wall.png?attredirects=0");
  x.setAttribute("src", "https://i.imgur.com/pMUBW7l.png");
  //x.setAttribute("src", "Wall.png");
  x.setAttribute("id", "W"+num2.toString());
  x.setAttribute("class", "wallz");
  x.setAttribute("width", walls[num2][1][0]-walls[num2][0][0]);
  x.setAttribute("height", walls[num2][1][1]-walls[num2][0][1]);
  x.style.top = walls[num2][0][1] + "px"
  x.style.left = walls[num2][0][0] + "px"
  x.setAttribute("alt", "walll");
  document.body.appendChild(x);
}
function addgoal(px,py) {
Apple[0][0]=px;
Apple[1][0]=px+20;
Apple[0][1]=py;
Apple[1][1]=py+20;
  var x = document.createElement("IMG");
  //x.setAttribute("src", "https://sites.google.com/site/kivkeaw00/keb-rup/Apple.png?attredirects=0");
  x.setAttribute("src", "https://i.imgur.com/3OYociQ.png");
  //x.setAttribute("src", "Apple.png");
  x.setAttribute("class", "goal");
  x.setAttribute("width", "21");
  x.setAttribute("height", "21");
  x.style.left = px + "px"
  x.style.top = py + "px"
  x.setAttribute("alt", "Goall");
  document.body.appendChild(x);
}
function onesecond() {
    countsecond = setInterval(function(){ if(gameend == 0&&document.getElementById("W"+(walls.length-1).toString()).complete ){ seconds -= 1;if(seconds>=0){document.getElementById("Timer").innerHTML = seconds}};if(seconds==0){notallowmove();gameend=1;endgame();}}, 1000);
}
function returnspawn() { 
	document.getElementById("mydiv").style.left = 390 + "px";
	document.getElementById("mydiv").style.top = 440 + "px";
}
function togglesave() {
  var x = document.getElementById("save99");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function endgame() {
	clearInterval(countsecond);
	hitsave();
	//togglesave();
}
function hitsave() { 
	document.getElementById("PlayerName").disabled = true;
	//document.getElementById("Savebtn").disabled = true;
	if(togglesave == 0){loadDoc();} 	
}
var doublezero = 0
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(parseInt(this.responseText));
      if(parseInt(this.responseText)>0){
      	console.log("Yeah!");
	document.getElementById("saveresult").innerHTML = "Saved. [Name : " + document.getElementById("PlayerName").value + " ; Time left : " + seconds + "]";
	togglesave = 1;
       }else if(parseInt(this.responseText)==0){
	document.getElementById("saveresult").innerHTML = "Waiting... [Do not close this window while saving your score]. "
	doublezero=doublezero+1;
	if(doublezero>=2){setTimeout(function(){ loadDoc(); }, 5000);}
      	console.log("please try again")
       }
    }
  };
  xhttp.open("GET", "https://api.thingspeak.com/update?api_key=" + apikey + "&field1=" + document.getElementById("PlayerName").value + "&field2=" + seconds, true);
  xhttp.send();
}
function WhichButton(event){if(event.button==2){alert("You pressed button: " + event.button)}}
function isKeyPressed(event){console.log(event.ctrlKey);window.close();}

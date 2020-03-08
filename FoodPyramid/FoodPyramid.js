function add(name){
	//Increments the button number if the plus is pressed
	var num = Number(document.getElementById(name).innerHTML);
	num++;
	document.getElementById(name).innerHTML = String(num);
	//Changes coulour of the button if you are above or below the recomended amount
	var rec = 0;
	var layer = name.charAt(3);
	switch(layer){
		case '1' : rec = 1; break;
		case '2' : rec = 1; break;
		case '3' : rec = 2; break;
		case '4' : rec = 3; break;
		case '5' : rec = 5; break;
		case '6' : rec = 6; break;
	}
	if(num < rec){
		document.getElementById(name).style.color = "black";
	}

	if(num == rec){
		document.getElementById(name).style.color = "grey";
	}

	if(num > rec){
		document.getElementById(name).style.color = "white";
	}
}
function minus(name){
	var num = Number(document.getElementById(name).innerHTML);
	num--;
	if(num < 0){
		num = 0;
	}
	document.getElementById(name).innerHTML = String(num);
	var rec;
	var layer = name.charAt(3);
	switch(layer){
		case '1' : rec = 1; break;
		case '2' : rec = 1; break;
		case '3' : rec = 2; break;
		case '4' : rec = 3; break;
		case '5' : rec = 5; break;
		case '6' : rec = 6; break;
	}
	if(num < rec){
		document.getElementById(name).style.color = "black";
	}

	if(num == rec){
		document.getElementById(name).style.color = "grey";
	}

	if(num > rec){
		document.getElementById(name).style.color = "white";
	}
}

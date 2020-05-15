let model;
let strokePath = null;

let x,y;

let pen = "down";
let sel;

function setup()
{
	var canvas = createCanvas(720,400);
  canvas.parent('sketch-holder');
	x = width/2;
	y = height/2;
	// console.log('Hey')
	let items  =  [
  'alarm_clock',
  'ambulance',
  'angel',
  'ant',
  'antyoga',
  'backpack',
  'barn',
  'basket',
  'bear',
  'bee',
  'beeflower',
  'bicycle',
  'bird',
  'book',
  'brain',
  'bridge',
  'bulldozer',
  'bus',
  'butterfly',
  'cactus',
  'calendar',
  'castle',
  'cat',
  'catbus',
  'catpig',
  'chair',
  'couch',
  'crab',
  'crabchair',
  'crabrabbitfacepig',
  'cruise_ship',
  'diving_board',
  'dog',
  'dogbunny',
  'dolphin',
  'duck',
  'elephant',
  'elephantpig',
  'eye',
  'face',
  'fan',
  'fire_hydrant',
  'firetruck',
  'flamingo',
  'flower',
  'floweryoga',
  'frog',
  'frogsofa',
  'garden',
  'hand',
  'hedgeberry',
  'hedgehog',
  'helicopter',
  'kangaroo',
  'key',
  'lantern',
  'lighthouse',
  'lion',
  'lionsheep',
  'lobster',
  'map',
  'mermaid',
  'monapassport',
  'monkey',
  'mosquito',
  'octopus',
  'owl',
  'paintbrush',
  'palm_tree',
  'parrot',
  'passport',
  'peas',
  'penguin',
  'pig',
  'pigsheep',
  'pineapple',
  'pool',
  'postcard',
  'power_outlet',
  'rabbit',
  'rabbitturtle',
  'radio',
  'radioface',
  'rain',
  'rhinoceros',
  'rifle',
  'roller_coaster',
  'sandwich',
  'scorpion',
  'sea_turtle',
  'sheep',
  'skull',
  'snail',
  'snowflake',
  'speedboat',
  'spider',
  'squirrel',
  'steak',
  'stove',
  'strawberry',
  'swan',
  'swing_set',
  'the_mona_lisa',
  'tiger',
  'toothbrush',
  'toothpaste',
  'tractor',
  'trombone',
  'truck',
  'whale',
  'windmill',
  'yoga',
  'yogabicycle',
  'everything',
];
	sel = createSelect();
	for(let i= 0 ; i< items.length ;i ++){
		sel.option(items[i])

	}
  sel.parent('modelSelect');

	// let button = createButton('Draw Again');
 //  button.mousePressed(runAgain);

	model = ml5.sketchRNN('cat',modelReady);

	sel.changed(modelChange);
	background(0);
}

// this is for changing the model from the values
function modelChange(){
  document.getElementById("newModel").innerHTML = "Loading new Model Please Wait......";
	let value = sel.value();
	console.log(value)
	model = ml5.sketchRNN(value,modelReady);
	background(0);
	return model;
}

// run the model again
function runAgain(){
	model.reset();
	model.generate(gotSketch);
	background(0);
}

// check for if the model ready
function modelReady(){
  // select(#modelStatus).html("Model Loaded");
  document.getElementById("modelStatus").innerHTML = "Model Loaded......";
  model.reset();
	model.generate(gotSketch);
	console.log('Model has been loaded..');
  document.getElementById("newModel").innerHTML = "New Model Loaded... ";
	// createP('Model has been loaded....')
}


// this is where the magic happens
function draw(){
	// model = model;
	
	if(strokePath != null){
		let newX = x + strokePath.dx;
		let newY = y + strokePath.dy;
		
		if(pen == "down"){
			stroke(255);
			strokeWeight(4);
			
			line(x, y,newX ,newY);
			let c = color(255,0,0);
			fill(c);
		}
		pen = strokePath.pen;
		strokePath = null;
		x = newX;
		y = newY;
		if(pen != 'end')
		{
			model.generate(gotSketch);
       document.getElementById("modelStatus").innerHTML = "Making your Deep Drawing Please Wait...";
			// createP(model)

		}else
		{
			console.log("Drawing Complete")
      document.getElementById("modelStatus").innerHTML = "Drawing Complete";
			x = width/2;
			y = height/2;
		}
		
	}

}

// check for the sketch
function gotSketch(error, s)
{
	if(error){
		console.log(error)
	}else{
		strokePath = s ;

		// console.log(strokePath)
	}
	
}

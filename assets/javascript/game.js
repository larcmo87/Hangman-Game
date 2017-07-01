
window.onload = function () {

  var bands;
  var chosenBand;         // Selected band
  var word ;              // Selected word
  var guess ;             // Geuss
  var guesses = [ ];      // Stored guesses
  var turns ;             // turns
  var counter ;           // Count correct guesses
  var space;              // Number of spaces in word ' '
  var contiueGame;        // Boolean to contiue game
  var keyStrokeValue = [ ]; //Stored key stroke values
  var alreadyChosen = [ ];  //random band already chosen
  var bandImage;
  

  // Get elements
  var showTurns = document.getElementById("myTurns");
  var guessedLetter = document.getElementById("lettersGuessed");
  
 
  // Create guesses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === " ") {
        guess.innerHTML = " ";
        space ++;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

// Show turns
   turnsLeft = function () {
    showTurns.innerHTML = "You have " + turns + " turns remaining";
    if (turns < 1) {
        showTurns.innerHTML = "";
        youLose = document.createElement('div');
        youLose.setAttribute('id', 'loseRetro');
        youLose.innerHTML = "You Lose!";     //write 'You Lose!' to the DOM
        showTurns.appendChild(youLose);

        //display the new game button
        var newGameBtn = document.querySelector(".newGameButton");
        newGameBtn.style.display = 'block';
        contiueGame = false;
       
    }
    //game won. Used to determine if the band name is to
    //be displayed on the html page
    var winGame = false;  

    //check if the counter is equal to the correct guesses array
    for (var i = 0; i < guesses.length; i++) {
      console.log("gueses " + guesses.length);
      if (counter + space === guesses.length) {
        winGame = true;      //game was won set to true
        showTurns.innerHTML = "";
        youWin = document.createElement('div');
        youWin.setAttribute('id', 'winRetro');
        youWin.innerHTML = "You Win!";     //write 'You Win!' to the DOM
        showTurns.appendChild(youWin);
       
        bandJPG = document.getElementById("bandImage")
        bandJPG.src = "assets/images/" + bandImage;
         document.querySelector("#bandImage").style.display = 'block';

        //display the new game button
        var newGameBtn = document.querySelector(".newGameButton");
        newGameBtn.style.display = 'block';
      
        contiueGame = false;
        break;  //break from for loop
      }
    }

    //if the game was won then write out the name of the band 
    if(winGame){        
            //display the name of the band in <div> element
            displayBandName = document.getElementById('bandNameTextStyle');
            displayBandName.innerHTML = word;
            
        }
  }


// OnClick Function
  check = function(){
   document.onkeyup = function (event) {
    var eventKeyCode = event.keyCode;
    var keyValue = event.key;

    if(contiueGame){
      //Only allow alpha characters to be chosen
      if(eventKeyCode >= 65 && eventKeyCode <= 90){
        var doCompare = true;
        console.log("keyStrokeValue.length " + keyStrokeValue.length);
        //check to see if key stroke has been added to array keyStrokeValue
        if(keyStrokeValue.length > 0){
            for(var j = 0; j < keyStrokeValue.length; j++){
                console.log(keyStrokeValue[j])
                //if key stroke is in array keyStrokeValue then don't 
                //continue with compare
                if(keyStrokeValue[j] === keyValue){
                  doCompare = false;
                  break;
                }
                         
              }
              //if doCompare === true then add key stroke value to 
              // array keyStrokeValue
              if(doCompare){
                  keyStrokeValue.push(keyValue); 
                 displayGuessedLetters();             
              }
         
        }else{
          //this is ran only on the first key stroke
          keyStrokeValue.push(keyValue);
          doCompare = true;
          displayGuessedLetters();
        }
        //if the key pressed is a letter in the band name then add
        //the letter to the correct letter innerHTML tag and increment
        //counter by 1
        if(doCompare){
          for (var i = 0; i < word.length; i++) {
            if (word[i] === keyValue) {
              guesses[i].innerHTML = "<u>" + keyValue.toUpperCase()  + "</u>";
              
              counter ++;             
            } 

          }
    
          var j = (word.indexOf(keyValue));
          if (j === -1) {
            turns -= 1;
            turnsLeft();
           
          } else {
            turnsLeft();
          }
        }
      }
    }
  }
}

  displayGuessedLetters = function(){
    var letterGuess;
      for(var i = 0; i < keyStrokeValue.length; i++){
                console.log("keyStrokeValue[i] " + keyStrokeValue[i]);
            if(i === 0) { 

                letterGuess = keyStrokeValue[i];
            }else{
                letterGuess += " " + keyStrokeValue[i];
            }             
      }

        guessedLetter.innerHTML = "<u>Letter's already guessed</u>" + '<br>' + letterGuess.toUpperCase();
  }

  //Start New Game
  $(".newGameButton").on("click", function() {
        if(chosenBand.length === bands.length){
          chosenBand = [ ];  //clear and reset the chosenBand array
        }

        //remove the new game button
        $(".newGameButton").css("display", "none");
        $("#winRetro").css("display","none");
        $("#bandImage").css("display","none");

        wordHolder = document.getElementById('hold');
        resetChildNodes(wordHolder); //funtion to remove child nodes
        
        displayBandName = document.getElementById('bandNameTextStyle');
        displayBandName.innerHTML = "";
        
        guessedLetter.innerHTML = "<u>Letter's already guessed</u>" 

        play();

  });

  //function to remove child nodes
  resetChildNodes = function(parentNode){
      if(parentNode.hasChildNodes()){
          while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
          }          
        }
  }

   // Play
  play = function () {
     bands = ["motley crue", "dokken", "iron maiden","bon jovi","def leppard","scorpions","skid row","van halen","guns n roses","cinderella","damn yankees", "judas priest","winger","poision","queensryche"];
    
    chosenBand = bands[Math.floor(Math.random() * bands.length)];
    
    for(var i = 0; i < alreadyChosen.length; i++){
      if(chosenBand === alreadyChosen[i]){
        chosenBand = bands[Math.floor(Math.random() * bands.length)];
      }
    }
    console.log(chosenBand);
    var indexCount = bands.indexOf(chosenBand);
    console.log("incdex count = " + indexCount);

    bandImage = String(indexCount) + ".jpg";

    word = chosenBand;//[Math.floor(Math.random() * chosenBand.length)];
    // word = word;//.replace(/\s/g, " ");chosenBand
    alreadyChosen.push(chosenBand);
    console.log(word);
    console.log(alreadyChosen);
    check();

    guesses = [ ];
    keyStrokeValue = [ ];
    turns = 10;
    counter = 0;
    space = 0;
    contiueGame = true;
    result();
    turnsLeft();
    
  }
  play();
}




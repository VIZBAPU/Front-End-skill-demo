"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-05

      Project to create a Concentration game with flipping tiles
      Author: 
      Date: 

      Filename: project05-05.js
*/

// Reference to the game board
let board = document.getElementById("board");

// Reference to the tiles within the game board
let allTiles = document.getElementsByClassName("tile");

// Objects that will reference the first and second tile clicked by the player
let firstFlipped;
let secondFlipped;

// Variable containing the id of a timed command
let timeID;

// Counter of the number of tiles currently flipped
let tilesFlipped = 0;

// Track number of tries
let tries = 0;
// Track number of correct matches
let correctMatches = 0;
// Store start time for timer
let startTime = null;
// To hold the timer interval
let timerInterval;
// To track if the game is over
let isGameOver = false;


// Functions to run when the page is loaded
window.addEventListener("load", scrambleTiles);
window.addEventListener("load", playConcentration)


// Function that scrambles the order of the tiles within the board
function scrambleTiles() {
   for (let i = 0; i < allTiles.length; i++) {
      
      // Random index integer from 0 to the number of tiles minus 1
      let randomIndex = Math.floor(allTiles.length*Math.random());
      
      // Randomly insert a tile before the current tile in the loop
      board.insertBefore(board.children[i], board.children[randomIndex]);      
   }
}


// Function that sets up the game play
function playConcentration() {
   // Create event handlers for all tiles in the game board
   for (let i = 0; i < allTiles.length; i++) {
      
      // Run when a tile is clicked
      allTiles[i].onclick = function() {
         // Test to see if the back of the tile is displayed
         if (this.lastElementChild.className === "back" && !isGameOver) {

            tries++; // Increase the number of tries
            document.getElementById("tries").textContent = `Tries: ${tries}`; // Update the tries display

            tilesFlipped++;  // increase the flip count by 1
            
            if (tilesFlipped === 1) {
               // if this is the first tile clicked then flip it
               firstFlipped = this;
               firstFlipped.appendChild(firstFlipped.firstElementChild);

               // If this is the first tile clicked, start the timer
               if(!startTime){
                  startTime = new Date();
                  timerInterval = setInterval(updateTimer, 1000);
               }
            } else if (tilesFlipped === 2) {
               // if this is the second tile clicked then flip it
               // and then flip both tiles back after 1 second
               secondFlipped = this;
               secondFlipped.appendChild(secondFlipped.firstElementChild);
               timeID = window.setTimeout(flipBack, 1000);
            }
         }
      }
   }  
   
   // Update the timer display
   function updateTimer(){
      const elapsedTime = new Date() - startTime;
      const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
      const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

      document.getElementById("timer").textContent = `Time: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
   }

   function pad(num) {
      return num < 10 ? '0' + num : num;
   }

   /* Function to flip the two tiles if they don't match */
   function flipBack() {
      // test to determine whether the tile images don't match
      if (firstFlipped.lastElementChild.src !== secondFlipped.lastElementChild.src) {
   
         
         // if they don't match, then flip each one
         firstFlipped.appendChild(firstFlipped.firstElementChild);
         secondFlipped.appendChild(secondFlipped.firstElementChild);
      } else{
         correctMatches++;
         document.getElementById("correctMatches").textContent = `Correct Matches: ${correctMatches}`;
      }
      
      // Reset the tiles flipped counter to zero
      tilesFlipped = 0;

      // Check if all matches are found and end the game
      if (correctMatches === allTiles.length / 2) {
         clearInterval(timerInterval); // Stop the timer
         isGameOver = true; // Game over

         // Create and display the "Game Over" message
         let gameOverMessage = document.createElement('div');
         gameOverMessage.id = 'gameOverMessage';
         gameOverMessage.innerHTML = '<h2>Game Over!</h2>';
         
         // Insert it after the game-info div
         document.getElementById('board').parentNode.insertBefore(gameOverMessage, document.getElementById('game-info'));

      }
   }   
}

function restartGame() {
   console.log("Restarting game..."); // Debugging statement
   window.location.reload(); // Reload the page to restart the game
}
// Extending the Array prototype to add the 'equals' method,
// via stackoverflow http://bit.ly/2CZZgCF
Array.prototype.equals = function(array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};

// console.log("game1jscript.js linked");
const img1 = "https://i.imgur.com/gMcoN9U.jpg";
const img2 = "https://i.imgur.com/B6hstja.jpg";
const img3 = "https://i.imgur.com/bvma8eQ.jpg";
const img4 = "https://i.imgur.com/oGJmkhg.jpg";
const img5 = "https://i.imgur.com/yjuPx4x.jpg";
const img6 = "https://i.imgur.com/aZD7gW4.jpg";
const img7 = "https://i.imgur.com/sY3y5Eg.jpg";
const img8 = "https://i.imgur.com/FJpGXNC.jpg";
const img9 = "https://i.imgur.com/gNoPVF9.jpg";

// Fragmented images URL object with the correct divId order

const originalImageOrder = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9
];
const images = {
  f1: img1,
  f2: img2,
  f3: img3,
  f4: img4,
  f5: img5,
  f6: img6,
  f7: img7,
  f8: img8,
  f9: img9
};

// Object to compare with correct order above for the checkWin function at the end.
$(".photoContainer").css(
  "background-image",
  "url(https://i.imgur.com/mx4fmMk.jpg)"
);
// Create an imageUrls array with the keys from the "images" object
let imageUrls = Object.values(images);
// Randomize the imageUrls array of keysys in the images object. Used shuffle code from stackoverflow - http://bit.ly/2GTPZOA
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
shuffleArray(imageUrls);

// Loop through the fragmented divs in the .html
$(".frag").each(function(i) {
  let url = imageUrls[i];
  let divId = $(this).attr("id");
  // Set the temporary background for the fragmented divs
  $(this).css("background-image", `url(${url})`); // jQuery .css doc

  // imagesPlaced[url] = divId;
});
// console.log(images);
// console.log(imagesPlaced);
// var imageToBeMoved;
// var originalPhoto;
var $firstImage = null;
var $secondImage = null;

// Loop through each div in Fragmented Container, and add the click event listener,
//
for (let i = 1; i < 10; i++) {
  $(`#f${i}`).click(function() {
    console.log("you clicked this function");
    if (!$firstImage) {
      $firstImage = $(this);
      $firstImage.css("opacity", "0.3");
      $firstImageUrl = $firstImage.css("background-image");
    } else {
      $secondImage = $(this);
      $secondImageUrl = $secondImage.css("background-image");
      $firstImage.css("opacity", "1");

      // Swap the div ids in the objects
      // imagesPlaced[$firstImageUrl] = $secondImageDivId;
      // imagesPlaced[$secondImageUrl] = $firstImageDivId;

      // Swap the images on the 2nd click
      $firstImage.css("background-image", $secondImageUrl);
      $secondImage.css("background-image", $firstImageUrl);

      $firstImage = null;
      $secondImage = null;
      setTimeout(function() {
        checkWin(); // check for win
      }, 10);
    }
  });
}
// The function that checks for win after each image pairs are switched.

// Fill imagesPlaced object with new keys/values of fragmented photos
// Compare imagesPlaced object with images object

function checkWin() {
  let newImageOrder = [];
  $(".frag").each(function(i) {
    let imagehtml = $(this).css("background-image"); // jQuery .css doc
    let imageUrl = imagehtml.substring(5, imagehtml.length - 2);
    // newImageOrder[`f${i + 1}`] = imageUrl;
    newImageOrder.push(imageUrl);
  });
  if (newImageOrder.equals(originalImageOrder)) {
    alert("YAY! You solved the puzzle!");
  }
}

// Check the items in the array to see if they match the win position
// [ {1}, {2}, {3}, {4} ]

// BONUS (didn't get to)
// Initial alert mentions the instructions of the game and asks for the
// players name plus a start button. Store the name to congratulate the
// players if they finish the game.

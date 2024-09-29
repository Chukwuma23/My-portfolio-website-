 // typing text animation script
  /*var typed = new 
  Typed(document.querySelector(".typing"), {
       strings: ["<b>welcome to my ShowRoom.</b><br>Here you are going to<br> explore most of my projects<br> both old and new projects.<br>my projects here are to showcase,<br> and highlight projects i have been working on.<br> keep in mind that all projects here<br> are owned by me <br>and it was built from scratch.","I will be updating<br> them as i progress.", "keep exploring! ☺️","Click on the <b>images to view projects.👇🏽"],
      
    typeSpeed: 0,
    backSpeed: 0.5,
    loop: false, 
    onComplete: function(){
        document.querySelector('.todo ').style.display = 'block';
        document.querySelector('.blog ').style.display = 'block';
    }
  });*/
  
  
  
  
  
  

var typed = new Typed(document.querySelector(".typing"), {
  strings: [
    "<b>welcome to my ShowRoom.</b><br>Here you are going to<br> explore most of my projects<br> both old and new projects.<br>my projects here are to showcase,<br> and highlight projects i have been working on.<br> keep in mind that all projects here<br> are owned by me <br>and it was built from scratch.",
    "I will be updating<br> them as i progress.",
    "keep exploring! ☺️",
    "Click on the <b>images to view projects.👇🏽"
  ],
  typeSpeed: 80,
  backSpeed: 0.5,
  loop: false,
  onComplete: function() {
    document.querySelector('.todo ').style.display = 'block';
    document.querySelector('.blog ').style.display = 'block';
    document.querySelector('.skip-btn ').style.display = 'none';//remove skip btn
    document.querySelectorAll('a')[0].style.display ='block';
    document.querySelector('.Unit-coverter').style.display ='block';
  }
});

// Add event listener to skip button
document.querySelector('.skip-btn').addEventListener('click', function() {
  typed.stop(); // stop the animation
  typed.cursor.remove(); // remove cursor
  document.querySelector('.typing').innerHTML = typed.strings[typed.strings.length - 1]; // show last string
  document.querySelector('.todo ').style.display = 'block'; // show todo element
 document.querySelector('.blog ').style.display = 'block';// show blog element
  document.querySelector('.skip-btn ').style.display = 'none';//remove skip btn
  document.querySelector('.Unit-coverter').style.display ='block';
});




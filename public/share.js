// Selecting the html class and
// convert it to an object

const sharebtn =
	document.querySelector('.sharebtn')

// Creating a bool variable for changing
// the image of share button
let bool = 0

// Adding an event listener
sharebtn.addEventListener('click', () => {

	// As we clicked the mouse over
	// the share button the bool value.
	// get flipped and then working of
	// if-else loop get starts
	bool = !bool
	
	if (bool == 0) {
		sharebtn.innerHTML =
			'<i class="far fa-share-square"></i>'
	} else {
		sharebtn.innerHTML =
			'<i class="fas fa-times"></i>'
	}
})


// another Set
$(document).ready(function() {
    var open = false;
    $('.circle-bg').on('click', function() {
      if(open === false)
        {
         $(this).animate({
            height: '+=10px',
            width: '+=10px'
         }, 300);
          
       $('.outer-icons').animate({
           opacity: 1
          }, 1000);
          
       $('.icon').fadeOut();
       $(this).html("<i class = 'icon fa fa-times' style='display: none'> </i>");
       $('.icon').fadeIn();
          
          open = true;
        }
      
      else {
        $(this).animate({
          height: '-=10px',
          width: '-=10px'
        }, 200);
      
      $('.outer-icons').animate({
          opacity: 0
        }, 300);
        
      $('.icon').fadeOut();
       $(this).html("<i class = 'icon fa fa-bars' style='display: none'> </i>");
       $('.icon').fadeIn();
        
        open = false;
    } 
      
   });
    
  });
  
  
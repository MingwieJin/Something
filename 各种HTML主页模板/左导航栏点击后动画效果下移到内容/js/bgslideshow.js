var aImages = new Array();
	var aURL = new Array();
	var aArtists = new Array();
	var iPrev = -1;
	var iRnd = -1;
	
	aImages[0] = "images/lighthouses1.jpg";
	aImages[1] = "images/lighthouses2.jpg";
	aImages[2] = "images/lighthouses3.jpg";
	aImages[3] = "images/lighthouses4.jpg";
	aImages[4] = "images/lighthouses5.jpg";


	aURL[0] = "#";
	aURL[1] = "#";
	aURL[2] = "#";
	aURL[3] = "#";
	aURL[4] = "#";

	
	aArtists[0] = "Heading Goes Here";
	aArtists[1] = "Heading Goes Here";
	aArtists[2] = "Heading Goes Here";
	aArtists[3] = "Heading Goes Here";	
	aArtists[4] = "Heading Goes Here";

	
	$(document).ready(function() {
	
		/* Define the function that triggers to fade in the background as soon as the image has loaded */
		$("img#bg").load(function()
			{
				/* Fade in during 3 seconds */
				$("img#bg").fadeTo(3000,1);
				
				/* Animate the picture description during 1 second */
				setTimeout(function() { $("#image_description").animate({right: '+=150'}, 1000) }, 1000);
			
				/* Set the timeout to fade out the image and the description after 10 seconds*/
		    	setTimeout(function() 
			    	{
			    		$("#image_description").animate({right: '-=150'}, 1000);
			    		$("img#bg").fadeOut(3000);
			    		
			    		/* Load the next image after 4 seconds */
			    		setTimeout(LoadImages,4000);
			    	}
			    	,10000);
			}			
		)
	
		/* Start the slideshow one second after the page is ready */ 
		setTimeout(LoadImages,1000);
		
    });

    function LoadImage(iNr)
	{
	
		/* Assign the new image to the background */
		$("img#bg").attr("src", aImages[iNr]);
 		
 		/* Assign the artist name to the description */
 		$("#image_artist").html(aArtists[iNr]);
 		
 		/* Assign the image url to the description */
        $("a#image_url").attr("href", aURL[iNr]);
        $("a#image_url").html("This is the demo link.");
                        	
    };
    
    function LoadImages()
    {
    	
    	/* Select a random image number and make sure this is not equal to the previous image */
    	while(iPrev == iRnd)
    	{
    		iRnd = Math.floor(Math.random()*aImages.length);
    	}
    	
    	/* Show the selected image */
    	LoadImage(iRnd);
    	
    	iPrev = iRnd;
    	
    };
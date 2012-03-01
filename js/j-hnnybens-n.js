function j_nnybens_n() {

	this.debug = true; // DEV

	// dom ready
	this.ready = function()
	{
	  j_b.setHash();
		j_b.setKeyListeners();
		j_b.setExternalLinks();
		j_b.setPrevButton();
		j_b.setNextButton();
		$(window).aspect();
	};
	
	// We always want a #hash
	this.setHash = function()
	{
	  if (window.location.hash == '') {
	    window.location.hash = 'home';	    
	  }
	};
	
	// listen for Escape key to close sections
	this.setKeyListeners = function()
	{
		j_b.log('escapeKeyListener');
		$(document).unbind('keyup.esc').bind('keyup.esc', function(event){
		  // Pressed: esc
			if (event.keyCode === 27) {
				window.location.hash = 'home';
      }
      // Pressed: j
			if (event.keyCode === 74) {
        j_b.showPreviousSection();
      }
      // Pressed: k
			if (event.keyCode === 75) {
        j_b.showNextSection();
      }
		});
	};

	// Setup clicking the PREV Button
	this.setPrevButton = function()
	{
	  var prevButton = $('a[href="#prev"]');
	  prevButton.unbind('click.prev').bind('click.prev', function(){
      j_b.showPreviousSection();
	    return false;
	  });
	};

	// Setup clicking the NEXT Button
	this.setNextButton = function()
	{
	  var nextButton = $('a[href="#next"]');
	  nextButton.unbind('click.next').bind('click.next', function(){
      j_b.showNextSection();
	    return false;
	  });

	};

  // Determine and Show the Next Section
	this.showNextSection = function()
	{
		var sections = $('section'),
				$currentSection = $(window.location.hash),
        sectionIndex = sections.index($currentSection),
				nextSection;

		if (!sectionIndex)
		{
		  // At #home
		  nextSection = $(sections[1]);
		}
		else
		{
		  // In the mix
      nextSection = (sectionIndex && sectionIndex < sections.length - 1) ? $(sections[sectionIndex+1]) : $(sections[0]);
		}

    j_b.loadSectionImages(nextSection)
    window.location.hash = nextSection.attr('id');
	};

  // Show the Previous Section
	this.showPreviousSection = function()
	{
	  window.history.back();
	};
	
	this.loadSectionImages = function($currentSection)
	{
	  var images = $currentSection.find('img.lazy');
	  images.each(function(){
	    var image = $(this);
	    image.attr('src', image.data('original'));
	  });
	};

	// Set Debugging
	this.setDebug = function(flag)
	{
		this.debug = flag;
	};

	// Get Debugging
	this.getDebug = function()
	{
		return this.debug;
	};

	// External Links Helper for Page Validation
	this.setExternalLinks = function()
	{
		$('a[rel="external"]').attr('target','_blank');
	};

	// Console Logging Utility
	this.log = function(output)
	{
		if (window.console && console.log && this.debug === true) {
			console.log(output);
		}
	};

}

window.j_b = new j_nnybens_n;

$(function(){
	window.j_b.ready();
});
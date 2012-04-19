var j_nnybens_n = (function() {

    "use strict";

    var debug = (document.body.className.indexOf('dev') !== -1);

    // We always want a #hash
    function setHash() {
        if (window.location.hash === '') {
            window.location.hash = 'home';
        }
    }

    // listen for Escape key to close sections
    function setKeyListeners() {
        $(document).unbind('keyup.esc').bind('keyup.esc', function(event) {
            // Pressed: esc
            if (event.keyCode === 27) {
                window.location.hash = 'home';
            }
            // Pressed: j
            if (event.keyCode === 74) {
                showPreviousSection();
            }
            // Pressed: k
            if (event.keyCode === 75) {
                showNextSection();
            }
        });
    }

    function setHomeButton() {
        setTimeout(function(){
            if (window.location.hash === '#home' || window.location.hash === '') {
                $('.navigation .home').addClass('at-home');
            } else {
                $('.navigation .home').removeClass('at-home');
            }
        }, 0);
    }

    // Setup clicking the PREV Button
    function setPrevButton() {
        var prevButton = $('a[href="#prev"]');
        prevButton.unbind('click.prev').bind('click.prev', function() {
            showPreviousSection();
            return false;
        });
    }

    // Setup clicking the NEXT Button
    function setNextButton()
    {
        var nextButton = $('a[href="#next"]');
        nextButton.unbind('click.next').bind('click.next', function() {
            showNextSection();
            return false;
        });
    }

    // Determine and Show the Next Section
    function showNextSection() {
        var sections = $('section'),
        $currentSection = $(window.location.hash),
        sectionIndex = sections.index($currentSection),
        nextSection;

        if (!sectionIndex) {
            // At #home
            nextSection = $(sections[1]);
        } else {
            // In the mix
            nextSection = (sectionIndex && sectionIndex < sections.length - 1) ? $(sections[sectionIndex+1]) : $(sections[0]);
        }

        loadSectionImages(nextSection);
        window.location.hash = nextSection.attr('id');
    }

    // Show the Previous Section
    function showPreviousSection() {
        window.history.back();
    }

    function loadSectionImages($currentSection) {
        var images = $currentSection.find('img.lazy');
        images.each(function(){
            var image = $(this);
            image.attr('src', image.data('original'));
        });
    }

    // Set Debugging
    function setDebug(flag) {
        debug = flag;
    }

    // Get Debugging
    function getDebug() {
        return debug;
    }

    // External Links Helper for Page Validation
    function setExternalLinks() {
        $('a[rel="external"]').attr('target','_blank');
    }

    // Console Logging Utility
    function log(output) {
        if (window.console && window.console.log && debug === true) {
            window.console.log(output);
        }
    }

    return {

        initialize : function() {
            setHash();
            setKeyListeners();
            setExternalLinks();
            setHomeButton();
            setPrevButton();
            setNextButton();
            $(window).unbind('hashchange.j_b').bind('hashchange.j_b', function(){
                setHomeButton();
            });
        }
    };

})();

$(function(){
    "use strict";
    j_nnybens_n.initialize();
});
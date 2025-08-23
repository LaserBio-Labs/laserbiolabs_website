//function ready(fn) {
//  if (document.readyState != 'loading'){
//    fn();
//  } else {
//    document.addEventListener('DOMContentLoaded', fn);
//  }
//}



//ready(function(){
//    var navlink_ref = document.querySelector(".nav-links");
//
//// http://jsfiddle.net/Matt_Coughlin/5RNhL/3/
//// https://stackoverflow.com/questions/16325679/activate-css3-animation-when-the-content-scrolls-into-view
//
//    function isElementInViewport(elem) {
//        //console.log('elem_selector', elem_selector)
//        //var elem = document.querySelector(elem_selector);
//    
//        // Get the scroll position of the page.
//        // var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
//        var scrollElem = 'html';
//
//        var viewportTop = scrollElem.scrollTop:w
//        var viewportBottom = viewportTop + window.innerHeight;
//    
//        // Get the position of the element on the page.
//        // var elemTop = Math.round( elem.offset().top );
//        var elemTop = Math.round( elem.getBoundingClientRect().top)
//        var elemBottom = elemTop + elem.offsetHeight;
//    
//        return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
//    }
//    
//    // Check if it's time to start the animation.
//    function checkAnimation() {
//        var elem1 = document.querySelector('.world-map-img2');
//        var elem2 = document.querySelector('.anim-anchor');
//    
//        // If the animation has already been started
//        if (elem1.classList.contains('start')) return;
//    
//        if (isElementInViewport(elem2)) {
//            // Start the animation
//            elem1.classList.add('start');
//        }
//    }
//    
//    // Capture scroll events
//    document.body.addEventListener('scroll', checkAnimation());
//});

$(function () {
    var pages = $('.page');
    pages.hide();

    $(window).on('hashchange', function(){

        console.log("test2");
        // On every hash change the render function is called with the new hash.
        // This is how the navigation of our app happens.
        render(decodeURI(window.location.hash));
    }).trigger('hashchange');

    function render(url) {
        console.log("test3");
        // This function decides what type of page to show
        // depending on the current url hash value.
        // Get the keyword from the url.
        var temp = url.split('/')[0];

        // Hide whatever page is currently shown.
        $('.page').hide();

        var map = {

            // The Homepage.
            '': function() {

                renderPage('home');
            },

            // Single Products page.
            '#api': function() {

                // Get the index of which product we want to show and call the appropriate function.
                renderPage('api');
            },
            // Single Products page.
            '#home': function() {

                // Get the index of which product we want to show and call the appropriate function.
                renderPage('home');
            }

        };

        // Execute the needed function depending on the url keyword (stored in temp).
        if(map[temp]){
            map[temp]();
        }
        // If the keyword isn't listed in the above - render the error page.
        else {
            renderErrorPage();
        }

    }

    function renderPage(pageClass){
        var page = $('.' + pageClass + ".page");
        var pages = $('.page');

        var navitem = $('.nav-item' + '.' + pageClass);
        var navitems = $('.nav-item');
        navitems.removeClass('active');
        navitem.addClass('active');
        pages.hide();
        page.show();
    }
    function renderErrorPage(){
        var page = $('.error');
        page.show();
    }

});

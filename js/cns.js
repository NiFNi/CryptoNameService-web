$(function () {
    let pages = $('.page');
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
        let temp = url.split('/')[0];

        // Hide whatever page is currently shown.
        $('.page').hide();

        let map = {

            // The Homepage.
            '': function () {

                renderPage('home');
            },

            // Single Products page.
            '#api': function () {

                // Get the index of which product we want to show and call the appropriate function.
                renderPage('api');
            },
            // Single Products page.
            '#home': function () {

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
        let page = $('.' + pageClass + ".page");
        let pages = $('.page');

        let navitem = $('.nav-item' + '.' + pageClass);
        let navitems = $('.nav-item');
        navitems.removeClass('active');
        navitem.addClass('active');
        pages.hide();
        page.show();
    }
    function renderErrorPage(){
        let page = $('.error');
        page.show();
    }

});

function createRequest() {
    console.log("wooooo");
    let name = document.getElementById("name").value;
    console.log(name);
    let address = document.getElementById("address").value;
    console.log(address);
    let e = document.getElementById("coin");
    let coin = e.options[e.selectedIndex].value;
    console.log(name + address + coin);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://cns.li:8009/api/create/" + coin, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let result = xhr.send(JSON.stringify({
        address: address,
        name: name
    }));
    console.log(result);
}
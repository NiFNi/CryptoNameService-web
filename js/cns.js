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
    let xhr = createCORSRequest("POST", "http://cns.li/api/create/" + coin);

    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;

        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            console.log(data)

            // we get the returned data
        }

        // end of state change: it can be after some time (async)
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        let text = xhr.responseText;
        alert('Response from CORS request to ' + ': ' + text);
    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };
    xhr.onloadend = function () {
        alert("loadend")
    };

    xhr.send(JSON.stringify({
        address: address,
        name: name
    }));
}


// Create the XHR object.
function createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}
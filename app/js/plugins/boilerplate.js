mapboxgl.accessToken = 'pk.eyJ1IjoidG1hY2hhZG9udSIsImEiOiJjanVjdDFudDMwMDR4NGRtdGJ4NndiaW9pIn0.JS0ffUQym0L07752GAwMFg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-71.129700, 42.363347],
    zoom: 13,
    bearing: 0,
    pitch: 0
});

var chapters = {
    'start': {
        center: [-71.129700, 42.363347],
        zoom: 13,
        bearing: 0,
        pitch: 0
    },
    'river': {
        center: [-71.117061, 42.361054],
        zoom: 18,
        bearing: 0,
        pitch: 90,
        speed: 0.5
    },
    'weeks': {
        center: [-71.117651, 42.368204],
        zoom: 16,
        bearing: -60,
        pitch: 60,
        speed: 0.5
    },
    'eliot': {
        center: [-71.133133, 42.372397],
        zoom: 17,
        bearing: 180,
        pitch: 80,
        speed: 0.5
    },
    'finish': {
        center: [-71.135933, 42.367181],
        zoom: 16,
        bearing: 0,
        pitch: 0,
        speed: 0.5
    }
};

// On every scroll event, check which element is on screen
window.onscroll = function() {
    var chapterNames = Object.keys(chapters);
    for (var i = 0; i < chapterNames.length; i++) {
        var chapterName = chapterNames[i];
        if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName);
            break;
        }
    }
};

var activeChapterName = 'baker';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName]);

    document.getElementById(chapterName).setAttribute('class', 'active');
    document.getElementById(activeChapterName).setAttribute('class', '');

    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    var element = document.getElementById(id);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

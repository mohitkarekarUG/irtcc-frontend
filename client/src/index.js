import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));



(function(d, script) {
    script = d.createElement("script");
    script.type = "text/javascript";
    // script.async = true;
    script.onload = function() {
        // remote script has loaded
    };
    script.src =
        "https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib/vendor/react.min.js";
    d.getElementsByTagName("head")[0].appendChild(script);
})(document);
(function(d, script) {
    script = d.createElement("script");
    script.type = "text/javascript";
    // script.async = true;
    script.onload = function() {
        // remote script has loaded
    };
    script.src =
        "https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib/vendor/react-dom.min.js";
    d.getElementsByTagName("head")[0].appendChild(script);
})(document);
(function(d, script) {
    script = d.createElement("script");
    script.type = "text/javascript";
    // script.async = true;
    script.onload = function() {
        // remote script has loaded
    };
    script.src =
        "https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib/vendor/redux.min.js";
    d.getElementsByTagName("head")[0].appendChild(script);
})(document);
(function(d, script) {
    script = d.createElement("script");
    script.type = "text/javascript";
    // script.async = true;
    script.onload = function() {
        // remote script has loaded
    };
    script.src =
        "https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib/vendor/redux-thunk.min.js";
    d.getElementsByTagName("head")[0].appendChild(script);
})(document);
(function(d, script) {
    script = d.createElement("script");
    script.type = "text/javascript";
    // script.async = true;
    script.onload = function() {
        // remote script has loaded
    };
    script.src =
        "https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib/vendor/jquery.min.js";
    d.getElementsByTagName("head")[0].appendChild(script);
})(document);
(function(d, script) {
    script = d.createElement("script");
    script.type = "text/javascript";
    // script.async = true;
    script.onload = function() {
        // remote script has loaded
    };
    script.src =
        "https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib/vendor/lodash.min.js";
    d.getElementsByTagName("head")[0].appendChild(script);
})(document);

(function(d, script) {
    script = d.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.onload = function() {
        // remote script has loaded
    };
    script.src = "https://source.zoom.us/zoom-meeting-1.4.2.min.js";
    d.getElementsByTagName("head")[0].appendChild(script);
})(document);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

(function(){"use strict";var e=this;"undefined"==typeof e.GOVUK&&(e.GOVUK={}),GOVUK.cookie=function(e,t,i){return void 0!==t?!1===t||null===t?GOVUK.setCookie(e,"",{days:-1}):GOVUK.setCookie(e,t,i):GOVUK.getCookie(e)},GOVUK.setCookie=function(e,t,i){void 0===i&&(i={});var s=e+"="+t+"; path=/";if(i.days){var n=new Date;n.setTime(n.getTime()+24*i.days*60*60*1e3),s=s+"; expires="+n.toGMTString()}"https:"==document.location.protocol&&(s+="; Secure"),document.cookie=s},GOVUK.getCookie=function(e){for(var t=e+"=",i=document.cookie.split(";"),s=0,n=i.length;s<n;s++){for(var o=i[s];" "==o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(t))return decodeURIComponent(o.substring(t.length))}return null}}).call(this),function(){"use strict";var e=this;"undefined"==typeof e.GOVUK&&(e.GOVUK={}),GOVUK.addCookieMessage=function(){var e=document.getElementById("global-cookie-message");e&&null===GOVUK.cookie("seen_cookie_message")&&(e.style.display="block",GOVUK.cookie("seen_cookie_message","yes",{days:28}),document.addEventListener("DOMContentLoaded",function(){GOVUK.analytics&&"function"==typeof GOVUK.analytics.trackEvent&&GOVUK.analytics.trackEvent("cookieBanner","Cookie banner shown",{value:1,nonInteraction:!0})}))}}.call(this),function(){"use strict";if(window.GOVUK&&GOVUK.addCookieMessage&&GOVUK.addCookieMessage(),document.querySelectorAll&&document.addEventListener){var e,t,i=document.querySelectorAll(".js-header-toggle");for(e=0,t=i.length;e<t;e++)i[e].addEventListener("click",function(e){e.preventDefault();var t=document.getElementById(this.getAttribute("href").substr(1)),i=t.getAttribute("class")||"",s=this.getAttribute("class")||"";-1!==i.indexOf("js-visible")?t.setAttribute("class",i.replace(/(^|\s)js-visible(\s|$)/,"")):t.setAttribute("class",i+" js-visible"),-1!==s.indexOf("js-visible")?this.setAttribute("class",s.replace(/(^|\s)js-visible(\s|$)/,"")):this.setAttribute("class",s+" js-visible"),this.setAttribute("aria-expanded","true"!==this.getAttribute("aria-expanded")),t.setAttribute("aria-hidden","false"===t.getAttribute("aria-hidden"))})}}.call(this);
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e){e.exports={a:35}},23:function(e,t,n){e.exports=n(50)},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(8),o=n.n(i),c=n(5);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var u,s=n(9),l=n(7);!function(e){e.BEGIN_VISUALIZATION_TRANSITION="BEGIN_VISUALIZATION_TRANSITION",e.END_VISUALIZATION_TRANSITION="END_VISUALIZATION_TRANSITION",e.GO_TO_PREV_VISUALIZATION="GO_TO_PREV_VISUALIZATION",e.GO_TO_NEXT_VISUALIZATION="GO_TO_NEXT_VISUALIZATION"}(u||(u={}));var d={currentVisualizationIndex:0,prevVisualizationIndex:0,isTransitioning:!1};var f=Object(s.b)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d;switch((arguments.length>1?arguments[1]:void 0).type){case u.GO_TO_NEXT_VISUALIZATION:return e.isTransitioning?e:Object(l.a)({},e,{currentVisualizationIndex:e.currentVisualizationIndex+1,prevVisualizationIndex:e.currentVisualizationIndex});case u.GO_TO_PREV_VISUALIZATION:return e.isTransitioning?e:Object(l.a)({},e,{currentVisualizationIndex:e.currentVisualizationIndex-1,prevVisualizationIndex:e.currentVisualizationIndex});case u.BEGIN_VISUALIZATION_TRANSITION:return Object(l.a)({},e,{isTransitioning:!0});case u.END_VISUALIZATION_TRANSITION:return Object(l.a)({},e,{isTransitioning:!1});default:return e}},window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),m=n(2),v=n(13);n(39);var w={data:new Uint8Array,timeout:U,isTransitioning:!1,options:{}};function h(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,n=t.data,i=t.timeout,o=t.isTransitioning,c=t.options,u=Object(a.useState)(!1),s=Object(m.a)(u,2),l=s[0],d=s[1];if(Object(a.useEffect)(function(){window.setTimeout(function(){return d(!0)},0)},[l]),!l)return null;var f={transition:"transform ".concat(i,"ms linear")},v=c&&c.smoothing?function(e,t){return e.map(function(n,a){for(var r=[],i=a-t;i<a+t;){var o=e[i]||128;r.push(o),i+=1}return function(e){for(var t=0,n=0;n<e.length;n++)t+=e[n];return t/e.length}(r)})}(n,c.smoothing):n;return r.a.createElement(e,{data:v,style:f,isTransitioning:o})}}var p=n(22),E=[["#0E9AA7","#F6CD61","#FE8A71"],["#EE4540","#801336","#2D142C"],["#8FB9A8","#FDFBD4","#FCD0BA"],["#AC6D83","#685D79","#465C7A"],["#F36E38","#EF4648","#582841"],["#F1F1F1","#9BD7D1","#305D7A"],["#DEA5B6","#F3CD8C","#F2E9C2"],["#E27B47","#EFCA58","#46B29E"],["#2E7345","#2E9975","#2DB3B3"],["#52A3CC","#7EA1E5","#AAAAF2"],["#CC5285","#CC5285","#F2BCAA"],["#D8E0BB","#B6CEC7","#86A3C3"]];E.map(function(e,t){return{id:t,colorTriple:e}});function g(){return E[Math.floor(Math.random()*E.length)]}function b(){return function(e,t){for(var n=[];n.length<e;){var a=g(),r=a[Math.floor(Math.random()*a.length)];if(t&&n.includes(r))break;n.push(r)}return n}(1)[0]}n(40);var O=h(function(e){var t=e.data,n=e.style,i=Object(a.useRef)(null);return Object(a.useLayoutEffect)(function(){var e=i.current,t=function(){var t=window,n=t.innerWidth,a=t.innerHeight;e.width=n,e.height=a};return t(),window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}},[]),Object(a.useLayoutEffect)(function(){var e=i.current,t=e.getContext("2d");t.fillStyle="#101010",t.fillRect(0,0,e.width,e.height)},[]),Object(a.useLayoutEffect)(function(){var e=i.current,t=e.getContext("2d"),n=window.setInterval(function(){t.fillStyle="rgba(0, 0, 0, 0.05)",t.fillRect(0,0,e.width,e.height)},7);return function(){return window.clearInterval(n)}},[]),Object(a.useLayoutEffect)(function(){var e=i.current,n=e.getContext("2d"),a=function(){var e=Object(p.a)(g());return Math.random()<=.5?e.reverse():e}();n.lineWidth=10,n.lineCap="round";var r=e.width/t.length;a.forEach(function(i,o){n.strokeStyle=i,n.beginPath();var c=0*o;n.moveTo(c,e.height/2),t.forEach(function(t){var i=t/255*e.height-5*a.length/2;n.lineTo(c,i+o*(5*a.length/2)),c+=r}),n.lineTo(c,e.height/2),n.stroke()})},[t]),r.a.createElement("div",{className:"visualization waveform",style:n},r.a.createElement("div",{className:"backdrop"}),r.a.createElement("canvas",{ref:i}),";")}),T=n(4),A=n.n(T),I=(n(41),h(function(e){var t=e.data,n=e.isTransitioning,i=e.style,o=Object(a.useState)(0),c=Object(m.a)(o,2),u=c[0],s=c[1],l=Object(a.useRef)({value:b(),lastChangedTimestamp:Date.now()});Object(a.useLayoutEffect)(function(){var e=function(){var e=window,t=e.innerWidth,n=e.innerHeight,a=Math.max(t,n);s(2*a)};return e(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}},[]);for(var d=l.current,f={},v=0;v<13;)f[v]=0,v+=1;t.forEach(function(e){for(var t=0;t<13;){var n=256/13*(t+1);if(Math.abs(e-128)>10&&e<=n){f[t]+=1;break}t+=1}});var w=Object.values(f).reduce(function(e,t){return t>.04?e+1:e},0),h=Date.now();if(!n&&w/13>70/256&&h-d.lastChangedTimestamp>200){var p;do{p=b()}while(d.value===p);d.value=p,d.lastChangedTimestamp=h}var E=Object.entries(f).map(function(e,t){var n=Object(m.a)(e,2),a=n[0],i=n[1],o=(+a+1)*u/13;return r.a.createElement("div",{key:a,className:"drummer-container",style:{width:"".concat(o,"px"),height:"".concat(o,"px"),opacity:(13-t)/13*.5*.25}},r.a.createElement("div",{className:A()("beat",{hit:i>10.24})}))});return r.a.createElement("div",{className:"visualization drummer",style:i},E,r.a.createElement("div",{className:"overlay",style:{backgroundColor:d.value}}))})),y=n(1);var j=new y.c("#666");var N=1500,S=200,_=.05;function x(e){var t,n=Date.now(),a=0,r=function(){var e=new y.k(48,96,96),t=new y.e({wireframe:!0});return new y.d(e,t)}(),i=function(e){var t=e.geometry,n=new y.k(t.parameters.radius,t.parameters.widthSegments,t.parameters.heightSegments).vertices,a=new Float32Array(3*n.length);n.forEach(function(e,t){e.toArray(a,3*t)});var r=new y.b;r.addAttribute("position",new y.a(a,3)),r.attributes.position.dynamic=!0;var i=new y.h({size:.25,map:(new y.l).load("assets/images/point.png"),alphaTest:.5,color:j,transparent:!0});return new y.g(r,i)}(r),o=function(e){var t=new y.f(75,window.innerWidth/window.innerHeight,.1,1e3);return t.position.set(0,e,0),t.lookAt(new y.m(0,0,0)),t}(S),c=function(){var e=window,t=e.innerWidth,n=e.innerHeight,a=new y.n({alpha:!0});return a.setPixelRatio(window.devicePixelRatio),a.setSize(t,n),a.setClearColor(0,0),a}();e.appendChild(c.domElement);var u=new y.i;function s(){o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),c.setSize(window.innerWidth,window.innerHeight),c.render(u,o)}return u.add(i),window.addEventListener("resize",s,!1),{sphere:r,halpern:i,animate:function e(){i.rotateY(-.002),Date.now()-n>N&&i.rotateX(.002),(a+=.005)>=2*Math.PI&&(a=0),o.translateY(Math.cos(a)*_),o.translateX(Math.cos(a)*_),o.translateZ(Math.cos(a)*_*5),c.render(u,o),t=window.requestAnimationFrame(e)},cleanup:function(){window.cancelAnimationFrame(t),window.removeEventListener("resize",s),e.removeChild(c.domElement),u.remove(i),i.geometry.dispose(),i.material.dispose(),r.geometry.dispose(),r.material.dispose()}}}n(42);var C=h(function(e){var t=e.data,n=e.style,i=Object(a.useRef)(null),o=Object(a.useRef)(),c=Object(a.useRef)(),u=Object(a.useRef)(Math.floor(t.length/2)),s=Object(a.useRef)(),l=Object(a.useRef)(),d=Object(a.useRef)(new Array(t.length).fill(128));return Object(a.useEffect)(function(){var e=x(i.current),n=e.animate,a=e.cleanup,r=e.sphere,u=e.halpern,d=r.geometry,f=u.geometry;return o.current=Math.floor(t.length/d.parameters.widthSegments),s.current=(d.vertices.length-2)/(d.parameters.widthSegments-1),l.current=f,c.current=f.attributes.position.array.slice(0),n(),a},[]),Object(a.useEffect)(function(){d.current.splice(0,5),d.current=d.current.concat(new Array(5).fill(t[u.current]));for(var e=l.current.getAttribute("position").array,n=0;n<c.current.length;){var a=Math.ceil(Math.floor(n/3)/s.current),r=a*o.current,i=Math.min(a,s.current-a),f=Math.abs(d.current[r]-128)/255*i*.1+1;e[n]=c.current[n]*f,e[n+1]=c.current[n+1]*f,e[n+2]=c.current[n+2]*f,n+=3}l.current.getAttribute("position").needsUpdate=!0},[t]),r.a.createElement("div",{className:"visualization halpern",ref:i,style:n})});var L="\nattribute float alpha;\nvarying float vAlpha;\n\nvoid main() {\n  vAlpha = alpha;\n  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n  gl_PointSize = 2.0;\n  gl_Position = projectionMatrix * mvPosition;\n}\n",k="\nuniform vec3 color;\nvarying float vAlpha;\n\nvoid main() {\n  gl_FragColor = vec4(color, vAlpha);\n}\n",V=2e4;function z(e){var t,n=function(){var e=new y.f(75,window.innerWidth/window.innerHeight,1,1e3);return e.position.z=-5,e}(),a=function(){var e=window,t=e.innerWidth,n=e.innerHeight,a=new y.n({alpha:!0});return a.setPixelRatio(window.devicePixelRatio),a.setSize(t,n),a.setClearColor(15,1),a}(),r=function(){for(var e=new y.b,t=new Float32Array(3*V),n=0;n<V;)t[n++]=100*Math.random()-50,t[n++]=100*Math.random()-50,t[n++]=100*Math.random()-50;e.addAttribute("position",new y.a(t,3));for(var a=new Float32Array(1*e.attributes.position.count),r=0;r<a.length;)a[r]=Math.random(),r+=1;e.addAttribute("alpha",new y.a(a,1));var i=new y.j({uniforms:{color:{value:new y.c(16777215)}},vertexShader:L,fragmentShader:k,transparent:!0});return new y.g(e,i)}();e.appendChild(a.domElement);var i=new y.i;i.add(r);for(var o=r.geometry.attributes.alpha,c=new Float32Array(o.count),u=0;u<c.length;u++)c[u]=Math.random()<.5?1:-1;return{animate:function e(){r.rotateY(5e-4),r.rotateX(5e-7),r.rotateZ(1e-4);for(var u=0;u<o.count;u++)c[u]>0?(o.array[u]*=1.007,o.array[u]>1&&(c[u]=-1)):(o.array[u]*=.993,o.array[u]<.3&&(c[u]=1));o.needsUpdate=!0,a.render(i,n),t=window.requestAnimationFrame(e)},cleanup:function(){window.cancelAnimationFrame(t),i.remove(r),r.geometry.dispose(),r.material.dispose()},stars:r,camera:n}}n(43);var M=h(function(e){var t=e.data,n=e.style,i=Object(a.useRef)(null),o=Object(a.useRef)(),c=Object(a.useRef)();return Object(a.useEffect)(function(){var e=z(i.current),t=e.animate,n=e.cleanup,a=e.stars,r=e.camera;return o.current=a,c.current=r,t(),n},[]),Object(a.useEffect)(function(){},[t]),r.a.createElement("div",{className:"visualization stars",ref:i,style:n})}),F=(n(44),h(function(e){var t=e.style;return r.a.createElement("div",{className:"visualization mobile-disabled",style:t},r.a.createElement("div",{className:"content"},r.a.createElement("img",{id:"desktop-icon",src:"/ltly/assets/images/desktop.png"}),r.a.createElement("div",{id:"message"},"Sorry, this visualization cannot be viewed on a mobile device.")))})),R=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),D=[{component:M},{component:O},{component:I,options:{smoothing:64}},{component:C}],P={component:F},U=500,B=Object(c.b)(function(e){return{currentIndex:e.currentVisualizationIndex,prevIndex:e.prevVisualizationIndex,isTransitioning:e.isTransitioning}},function(e){return{startTransition:function(){return e({type:u.BEGIN_VISUALIZATION_TRANSITION})},endTransition:function(){return e({type:u.END_VISUALIZATION_TRANSITION})}}})(function(e){var t,n,a=e.data,i=e.startTransition,o=e.endTransition,c=e.isTransitioning,u=e.prevIndex,s=e.currentIndex,l=null!=u&&u<s?"next":"prev",d=l?"visualization-".concat(l):void 0,f=(s%(t=D.length)+t)%t,m=D[f],w=m.options&&m.options.mobileDisabled&&R?P:m;return r.a.createElement(v.TransitionGroup,{component:null,childFactory:(n=d,function(e){return r.a.cloneElement(e,{classNames:n})})},r.a.createElement(v.CSSTransition,{key:f,timeout:U,classNames:d||"",onExit:i,onExited:o,mountOnEnter:!0,unmountOnExit:!0},r.a.createElement(w.component,{data:a,isTransitioning:c,timeout:U,options:w.options})))}),Z=function(e){var t=e.context,n=e.source,i=Object(a.useState)(new Uint8Array),o=Object(m.a)(i,2),c=o[0],u=o[1],s=Object(a.useRef)();return Object(a.useLayoutEffect)(function(){var e=t.createAnalyser();return e.fftSize=512,e.smoothingTimeConstant=0,n.connect(e),e.connect(t.destination),s.current=window.requestAnimationFrame(function t(){var n=new Uint8Array(512);e.getByteTimeDomainData(n),u(n),s.current=window.requestAnimationFrame(t)}),function(){null!=s.current&&window.cancelAnimationFrame(s.current),e&&e.disconnect(),n&&n.disconnect()}},[]),r.a.createElement(B,{data:c})},W=(n(45),function(e){var t=e.show;return r.a.createElement("div",{className:A()("loading",{show:!1!==t})},r.a.createElement("span",{className:"loading-dot"}),r.a.createElement("span",{className:"loading-dot"}),r.a.createElement("span",{className:"loading-dot"}))}),G=n(21),X=(n(46),Object(c.b)(null,function(e){return{goToNextVisualization:function(){return e({type:u.GO_TO_NEXT_VISUALIZATION})},goToPrevVisualization:function(){return e({type:u.GO_TO_PREV_VISUALIZATION})}}})(function(e){var t=Object(a.useState)(!1),n=Object(m.a)(t,2),i=n[0],o=n[1],c=Object(a.useState)(!1),u=Object(m.a)(c,2),s=u[0],l=u[1];Object(a.useEffect)(function(){var t=function(t){switch(t.which){case 37:case 38:e.goToPrevVisualization();break;case 39:case 40:e.goToNextVisualization()}};return document.addEventListener("keydown",t),function(){return document.removeEventListener("keydown",t)}},[]);var d=Object(a.useRef)(),f=Object(a.useRef)(),v=Object(a.useCallback)(function(){null!=d.current&&window.clearTimeout(d.current),o(!0),d.current=window.setTimeout(function(){s||o(!1)},1500)},[s]),w=Object(a.useCallback)(function(){e.context&&e.context.resume(),e.togglePlay(),v()},[e.context,e.togglePlay]),h=Object(a.useCallback)(function(e){e.preventDefault(),f.current=Date.now()},[]),p=Object(a.useCallback)(function(e){1===e.nativeEvent.which&&(f.current=Date.now())},[]),E=Object(a.useCallback)(function(e){1===e.nativeEvent.which&&f.current&&Date.now()-f.current<250&&w()},[]),g=Object(a.useCallback)(function(e){e.preventDefault(),f.current&&Date.now()-f.current<250&&v()},[]),b=Object(a.useCallback)(function(t){t.stopPropagation(),e.goToPrevVisualization(),v()},[e.goToPrevVisualization]),O=Object(a.useCallback)(function(t){t.stopPropagation(),e.goToNextVisualization(),v()},[e.goToNextVisualization]),T=Object(a.useCallback)(function(e){e.stopPropagation()},[]),I=Object(a.useCallback)(function(e){l(e)},[]),y=e.wantsToPlay,j=e.isPlaying;return r.a.createElement(r.a.Fragment,null,y&&!j&&r.a.createElement(W,null),r.a.createElement("div",{id:"overlay",onMouseDown:p,onMouseUp:E,onTouchStart:h,onTouchEnd:g,onMouseMove:v,className:A()({show:i})},r.a.createElement("h1",{id:"title"},"LTLY"),r.a.createElement("div",{id:"version"},"build ",G.a),r.a.createElement("div",{onTouchEnd:w,className:A()({play:!y&&!j,pause:y&&j})}),r.a.createElement("div",{className:"navigation"},r.a.createElement("div",{className:"arrow-container",onClick:b,onTouchStart:b,onMouseUp:T,onMouseEnter:function(){return I(!0)},onMouseLeave:function(){return I(!1)}},r.a.createElement("svg",{className:"arrow",width:"60px",height:"80px",viewBox:"0 0 50 80"},r.a.createElement("polyline",{fill:"none",stroke:"#FFF",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",points:"\r 45.63,75.8 0.375,38.087 45.63,0.375 "}))),r.a.createElement("div",{className:"arrow-container",onClick:O,onTouchStart:O,onMouseUp:T,onMouseEnter:function(){return I(!0)},onMouseLeave:function(){return I(!1)}},r.a.createElement("svg",{className:"arrow",width:"60px",height:"80px",viewBox:"0 0 50 80"},r.a.createElement("polyline",{fill:"none",stroke:"#FFF",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",points:"\r 0.375,0.375 45.63,38.087 0.375,75.8 "}))))))})),H=(n(47),function(){return r.a.createElement("div",{id:"no-web-audio"},"Your device doesn't support the Web Audio API.")});var Y=function(e){var t=Object(a.useState)(!1),n=Object(m.a)(t,2),i=n[0],o=n[1],c=Object(a.useState)(!1),u=Object(m.a)(c,2),s=u[0],l=u[1],d=function(e){var t=Object(a.useState)(e),n=Object(m.a)(t,2),r=n[0],i=n[1],o=Object(a.useRef)(r);return Object(a.useEffect)(function(){o.current=r},[r]),[r,i,o]}(void 0),f=Object(m.a)(d,3),v=f[0],w=f[1],h=f[2],p=Object(a.useState)(),E=Object(m.a)(p,2),g=E[0],b=E[1],O=Object(a.useState)(!1),T=Object(m.a)(O,2),A=T[0],I=T[1],y=Object(a.useRef)(null);Object(a.useEffect)(function(){try{new window.AudioContext}catch(e){I(!0)}},[]),Object(a.useEffect)(function(){var e=y.current,t=function(){return l(!0)},n=function(){return l(!1)},a=console.error;return e.addEventListener("playing",t),e.addEventListener("pause",n),e.addEventListener("error",a),function(){e.removeEventListener("playing",t),e.removeEventListener("pause",n),e.removeEventListener("error",a)}},[]);var j=Object(a.useCallback)(function(){var e=y.current,t=new window.AudioContext,n=t.createMediaElementSource(e);w(t),b(n)},[y.current]),N=Object(a.useCallback)(function(){var e=y.current;e.paused?(o(!0),e.play(),h.current||j()):(o(!1),e.pause())},[y.current]);return A?r.a.createElement(H,null):r.a.createElement(r.a.Fragment,null,r.a.createElement("audio",{ref:y,id:"audioElement",src:"http://snds.blackwright.com",preload:"auto",crossOrigin:"anonymous"}),v&&g&&r.a.createElement(Z,{context:v,source:g}),r.a.createElement(X,{context:v,wantsToPlay:i,isPlaying:s,togglePlay:N}))};n(48),n(49);o.a.render(r.a.createElement(c.a,{store:f},r.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[23,1,2]]]);
//# sourceMappingURL=main.00618359.chunk.js.map
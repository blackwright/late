(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e){e.exports={a:41}},23:function(e,t,n){e.exports=n(50)},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(8),o=n.n(i),c=n(5);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s,u=n(9),l=n(7);!function(e){e.BEGIN_VISUALIZATION_TRANSITION="BEGIN_VISUALIZATION_TRANSITION",e.END_VISUALIZATION_TRANSITION="END_VISUALIZATION_TRANSITION",e.GO_TO_PREV_VISUALIZATION="GO_TO_PREV_VISUALIZATION",e.GO_TO_NEXT_VISUALIZATION="GO_TO_NEXT_VISUALIZATION"}(s||(s={}));var d={currentVisualizationIndex:0,prevVisualizationIndex:0,isTransitioning:!1};var f=Object(u.b)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d;switch((arguments.length>1?arguments[1]:void 0).type){case s.GO_TO_NEXT_VISUALIZATION:return e.isTransitioning?e:Object(l.a)({},e,{currentVisualizationIndex:e.currentVisualizationIndex+1,prevVisualizationIndex:e.currentVisualizationIndex});case s.GO_TO_PREV_VISUALIZATION:return e.isTransitioning?e:Object(l.a)({},e,{currentVisualizationIndex:e.currentVisualizationIndex-1,prevVisualizationIndex:e.currentVisualizationIndex});case s.BEGIN_VISUALIZATION_TRANSITION:return Object(l.a)({},e,{isTransitioning:!0});case s.END_VISUALIZATION_TRANSITION:return Object(l.a)({},e,{isTransitioning:!1});default:return e}},window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),m=n(2),v=n(13),w=(n(39),{data:new Uint8Array,lowPassData:new Uint8Array,timeout:J,isTransitioning:!1,options:{}});function h(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,n=t.data,i=t.lowPassData,o=t.timeout,c=t.isTransitioning,s=t.options,u=Object(a.useState)(!1),l=Object(m.a)(u,2),d=l[0],f=l[1];Object(a.useEffect)(function(){window.setTimeout(function(){return f(!0)},0)},[d]);var v=Object(a.useRef)([]),h=Object(a.useRef)([]),p=Object(a.useRef)(Date.now());if(!d)return null;var g=0,E=0,b=n.map(function(e,t){g+=Math.abs(e-128);var a=i[t];if(E+=Math.abs(a-128),null!=s&&s.smoothing){for(var r=0,o=0,c=t-s.smoothing;c<t+s.smoothing;){r+=n[c]||128,o+=1,c+=1}return r/o}return e}),O=0,A=0,T=0,y=0;v.current.forEach(function(e,t){e>O&&(O=e);var n=h.current[t];A+=n,T+=1,n>y&&(y=n)});var I=g/n.length,j=A/T||0,N=E/i.length;v.current=v.current.concat(I),h.current=h.current.concat(N),Date.now()-p.current>2e3&&(v.current.shift(),h.current.shift());var S=N>1.75*j,x={transition:"transform ".concat(o,"ms linear")};return r.a.createElement(e,{data:b,isBeat:S,intensity:I,lowPassIntensity:N,style:x,isTransitioning:c})}}var p=n(22),g=[["#0E9AA7","#F6CD61","#FE8A71"],["#EE4540","#801336","#2D142C"],["#8FB9A8","#FDFBD4","#FCD0BA"],["#AC6D83","#685D79","#465C7A"],["#F36E38","#EF4648","#582841"],["#F1F1F1","#9BD7D1","#305D7A"],["#DEA5B6","#F3CD8C","#F2E9C2"],["#E27B47","#EFCA58","#46B29E"],["#2E7345","#2E9975","#2DB3B3"],["#52A3CC","#7EA1E5","#AAAAF2"],["#CC5285","#CC5285","#F2BCAA"],["#D8E0BB","#B6CEC7","#86A3C3"]];g.map(function(e,t){return{id:t,colorTriple:e}});function E(){return g[Math.floor(Math.random()*g.length)]}function b(){return function(e,t){for(var n=[];n.length<e;){var a=E(),r=a[Math.floor(Math.random()*a.length)];if(t&&n.includes(r))break;n.push(r)}return n}(1)[0]}n(40);var O=h(function(e){var t=e.data,n=e.style,i=Object(a.useRef)(null);return Object(a.useLayoutEffect)(function(){var e=i.current,t=function(){var t=window,n=t.innerWidth,a=t.innerHeight;e.width=n,e.height=a};return t(),window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}},[]),Object(a.useLayoutEffect)(function(){var e=i.current,t=e.getContext("2d");t.fillStyle="#101010",t.fillRect(0,0,e.width,e.height)},[]),Object(a.useLayoutEffect)(function(){var e=i.current,t=e.getContext("2d"),n=window.setInterval(function(){t.fillStyle="rgba(0, 0, 0, 0.05)",t.fillRect(0,0,e.width,e.height)},7);return function(){return window.clearInterval(n)}},[]),Object(a.useLayoutEffect)(function(){var e=i.current,n=e.getContext("2d"),a=function(){var e=Object(p.a)(E());return Math.random()<=.5?e.reverse():e}();n.lineWidth=10,n.lineCap="round";var r=e.width/t.length;a.forEach(function(i,o){n.strokeStyle=i,n.beginPath();var c=0*o;n.moveTo(c,e.height/2),t.forEach(function(t){var i=t/255*e.height-5*a.length/2;n.lineTo(c,i+o*(5*a.length/2)),c+=r}),n.lineTo(c,e.height/2),n.stroke()})},[t]),r.a.createElement("div",{className:"visualization waveform",style:n},r.a.createElement("div",{className:"backdrop"}),r.a.createElement("canvas",{ref:i}),";")}),A=n(4),T=n.n(A),y=(n(41),h(function(e){var t=e.data,n=e.isBeat,i=e.isTransitioning,o=e.style,c=Object(a.useState)(0),s=Object(m.a)(c,2),u=s[0],l=s[1],d=Object(a.useRef)({value:b(),lastChangedTimestamp:Date.now()});Object(a.useLayoutEffect)(function(){var e=function(){var e=window,t=e.innerWidth,n=e.innerHeight,a=Math.max(t,n);l(2*a)};return e(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}},[]);for(var f=d.current,v={},w=0;w<13;)v[w]=0,w+=1;t.forEach(function(e){for(var t=0;t<13;){var n=256/13*(t+1);if(Math.abs(e-128)>10&&e<=n){v[t]+=1;break}t+=1}});var h=Date.now();if(n&&!i&&h-f.lastChangedTimestamp>200){var p;do{p=b()}while(f.value===p);f.value=p,f.lastChangedTimestamp=h}var g=Object.entries(v).map(function(e,t){var n=Object(m.a)(e,2),a=n[0],i=n[1],o=(+a+1)*u/13;return r.a.createElement("div",{key:a,className:"drummer-container",style:{width:"".concat(o,"px"),height:"".concat(o,"px"),opacity:(13-t)/13*.5*.25}},r.a.createElement("div",{className:T()("beat",{hit:i>10.24})}))});return r.a.createElement("div",{className:"visualization drummer",style:o},g,r.a.createElement("div",{className:"overlay",style:{backgroundColor:f.value}}))})),I=n(1);var j=1500,N=200,S=.025,x=-.3,C=.3;function _(e){var t,n=Date.now(),a=0,r=new I.p(48,48,48),i=function(e){var t=new I.p(e.parameters.radius,e.parameters.widthSegments,e.parameters.heightSegments).vertices,n=new Float32Array(3*t.length);t.forEach(function(e,t){e.toArray(n,3*t)});var a=new I.c;a.addAttribute("position",new I.b(n,3)),a.attributes.position.dynamic=!0;var r=new I.m({size:.5,map:(new I.q).load("assets/images/point.png"),alphaTest:.5,color:6710886,transparent:!0});return new I.l(a,r)}(r),o=function(e){var t=new I.j(75,window.innerWidth/window.innerHeight,.1,1e3);return t.position.set(0,e,0),t.lookAt(new I.r(0,0,0)),t}(N),c=function(){var e=window,t=e.innerWidth,n=e.innerHeight,a=new I.s({alpha:!0});return a.setPixelRatio(window.devicePixelRatio),a.setSize(t,n),a.setClearColor(0,0),a}();e.appendChild(c.domElement);var s=new I.n;s.add(i),window.addEventListener("resize",l);var u=new I.d;function l(){o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),c.setSize(window.innerWidth,window.innerHeight),c.render(s,o)}return{clock:u,sphereGeometry:r,halpern:i,animate:function e(){var r=u.getDelta();i.rotateY(x*r),Date.now()-n>j&&i.rotateX(C*r),(a+=r)>=2*Math.PI&&(a=0),o.translateY(Math.cos(a)*S),o.translateX(Math.cos(a)*S),o.translateZ(Math.cos(a)*S*5),c.render(s,o),t=window.requestAnimationFrame(e)},cleanup:function(){window.cancelAnimationFrame(t),window.removeEventListener("resize",l),e.removeChild(c.domElement),s.remove(i),i.geometry.dispose(),i.material.dispose(),r.dispose()}}}n(42);var k=h(function(e){var t=e.data,n=e.style,i=Object(a.useRef)(null),o=Object(a.useRef)(),c=Object(a.useRef)(),s=Object(a.useRef)(Math.floor(t.length/2)),u=Object(a.useRef)(),l=Object(a.useRef)(),d=Object(a.useRef)(new Array(t.length).fill(128));return Object(a.useEffect)(function(){var e=_(i.current),n=e.clock,a=e.animate,r=e.cleanup,s=e.sphereGeometry,d=e.halpern.geometry;return o.current=Math.floor(t.length/s.parameters.widthSegments),u.current=(s.vertices.length-2)/(s.parameters.widthSegments-1),l.current=d,c.current=d.attributes.position.array.slice(0),n.start(),a(),r},[]),Object(a.useEffect)(function(){d.current.splice(0,5),d.current=d.current.concat(new Array(5).fill(t[s.current]));for(var e=l.current.getAttribute("position").array,n=0;n<c.current.length;){var a=Math.ceil(Math.floor(n/3)/u.current),r=a*o.current,i=Math.min(a,u.current-a),f=Math.abs(d.current[r]-128)/255*i*.1+1;e[n]=c.current[n]*f,e[n+1]=c.current[n+1]*f,e[n+2]=c.current[n+2]*f,n+=3}l.current.getAttribute("position").needsUpdate=!0},[t]),r.a.createElement("div",{className:"visualization halpern",ref:i,style:n})});var D="\nattribute float alpha;\nvarying float vAlpha;\n\nvoid main() {\n  vAlpha = alpha;\n  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n  gl_PointSize = 4.0 * alpha;\n  gl_Position = projectionMatrix * mvPosition;\n}\n",L="\nuniform vec3 color;\nvarying float vAlpha;\n\nvoid main() {\n  float r = 0.0;\n  vec2 cxy = 2.0 * gl_PointCoord - 1.0;\n  r = dot(cxy, cxy);\n  if (r > 1.0) {\n    discard;\n  }\n\n  gl_FragColor = vec4(color, vAlpha);\n}\n";function M(){var e=Math.random()<.5?"cloud.png":"smoke.png",t=new I.k(50,50),n=new I.i({map:(new I.q).load("assets/images/".concat(e)),transparent:!0,opacity:.15,depthTest:!1}),a=new I.h(t,n);a.rotateZ(360*Math.random());var r=15*Math.random()+10;return a.position.set(100*Math.random()-50,100*Math.random()-50,Math.random()<.5?r:-r),a}function z(e,t){return new I.f(e,t)}var V=2e4,P=1,R=.2,F=.75,B=65,U=.025,Z=.001;function W(e,t){var n,a=function(){var e=window,t=e.innerWidth,n=e.innerHeight,a=new I.s({antialias:!0});return a.setPixelRatio(window.devicePixelRatio),a.setSize(t,n),a.setClearColor(15,1),a}();e.appendChild(a.domElement);var r=new I.j(50,window.innerWidth/window.innerHeight,1,1e3),i=new I.n,o=function(e){for(var t=new I.c,n=new Float32Array(3*e),a=0;a<e;)n[a++]=100*Math.random()-50,n[a++]=100*Math.random()-50,n[a++]=100*Math.random()-50;t.addAttribute("position",new I.b(n,3));for(var r=new Float32Array(1*t.attributes.position.count),i=0;i<r.length;)r[i]=Math.random(),i+=1;t.addAttribute("alpha",new I.b(r,1));var o=new I.o({uniforms:{color:{type:"c",value:new I.e(16777215)}},vertexShader:D,fragmentShader:L,transparent:!0});return new I.l(t,o)}(V);i.add(o);for(var c=new I.g,s=0;s<=B;){var u=M();c.add(u),s+=1}i.add(c);var l,d,f=(l=16777215,d=t,new I.a(l,d));i.add(f);var m=z(13041721,2);m.position.set(0,0,1),i.add(m);var v=z(13041721,t);v.position.set(0,0,1),i.add(v),window.addEventListener("resize",E);for(var w=o.geometry.attributes.alpha,h=new Float32Array(w.count),p=0;p<h.length;p++)h[p]=Math.random()<.5?1:-1;var g=new I.d;function E(){r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight),a.render(i,r)}return{clock:g,animate:function e(){var t=g.getDelta();o.rotateX(Z*t),o.rotateY(U*t),c.rotateX(2*Z*t),c.rotateY(2*U*t),c.children.forEach(function(e){e.lookAt(r.position)});for(var s=0;s<w.count;s++)h[s]>0?(w.array[s]*=1+F*t,w.array[s]>P&&(h[s]=-1)):(w.array[s]*=1-F*t,w.array[s]<R&&(h[s]=1));w.needsUpdate=!0,a.render(i,r),n=window.requestAnimationFrame(e)},cleanup:function(){window.cancelAnimationFrame(n),window.removeEventListener("resize",E),e.removeChild(a.domElement),i.remove(o),o.geometry.dispose(),o.material.dispose(),i.remove(c),c.children.forEach(function(e){e.geometry.dispose(),e.material.dispose()})},dLight:v}}n(43);var G=h(function(e){e.isBeat;var t=e.lowPassIntensity,n=e.style,i=Object(a.useRef)(null),o=Object(a.useRef)(),c=Object(a.useRef)(Date.now());return Object(a.useEffect)(function(){var e=W(i.current,1),t=e.clock,n=e.animate,a=e.cleanup,r=e.dLight;return o.current=r,t.start(),n(),a},[]),Object(a.useEffect)(function(){var e=Date.now(),n=o.current.intensity,a=t/4;e-c.current>100&&(a-n>.5?a=n+.5:n-a>.5&&(a=n-.5),o.current.intensity=a,c.current=e)},[t]),r.a.createElement("div",{className:"visualization stars",ref:i,style:n})}),X=(n(44),h(function(e){var t=e.style;return r.a.createElement("div",{className:"visualization mobile-disabled",style:t},r.a.createElement("div",{className:"content"},r.a.createElement("img",{id:"desktop-icon",src:"/late/assets/images/desktop.png"}),r.a.createElement("div",{id:"message"},"Sorry, this visualization cannot be viewed on a mobile device.")))}));var H=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),q=[{component:G,options:{smoothing:128}},{component:O},{component:y,options:{smoothing:64}},{component:k}],Y={component:X},J=500,$=Object(c.b)(function(e){return{currentIndex:e.currentVisualizationIndex,prevIndex:e.prevVisualizationIndex,isTransitioning:e.isTransitioning}},function(e){return{startTransition:function(){return e({type:s.BEGIN_VISUALIZATION_TRANSITION})},endTransition:function(){return e({type:s.END_VISUALIZATION_TRANSITION})}}})(function(e){var t,n,a=e.data,i=e.lowPassData,o=e.startTransition,c=e.endTransition,s=e.isTransitioning,u=e.prevIndex,l=e.currentIndex,d=null!=u&&u<l?"next":"prev",f=d?"visualization-".concat(d):void 0,m=(l%(t=q.length)+t)%t,w=q[m],h=w.options&&w.options.mobileDisabled&&H?Y:w;return r.a.createElement(v.TransitionGroup,{component:null,childFactory:(n=f,function(e){return r.a.cloneElement(e,{classNames:n})})},r.a.createElement(v.CSSTransition,{key:m,timeout:J,classNames:f||"",onExit:o,onExited:c,mountOnEnter:!0,unmountOnExit:!0},r.a.createElement(h.component,{data:a,lowPassData:i,isTransitioning:s,timeout:J,options:h.options})))}),K=function(e){var t=e.context,n=e.source,i=Object(a.useState)(new Uint8Array),o=Object(m.a)(i,2),c=o[0],s=o[1],u=Object(a.useState)(new Uint8Array),l=Object(m.a)(u,2),d=l[0],f=l[1],v=Object(a.useRef)();return Object(a.useEffect)(function(){var e=t.createAnalyser();e.fftSize=512,e.smoothingTimeConstant=0,n.connect(e),e.connect(t.destination);var a=t.createBiquadFilter();a.type="lowpass";var r=t.createAnalyser();return r.fftSize=512,r.smoothingTimeConstant=0,n.connect(a),a.connect(r),v.current=window.requestAnimationFrame(function t(){var n=new Uint8Array(512);e.getByteTimeDomainData(n),s(n);var a=new Uint8Array(512);r.getByteTimeDomainData(a),f(a),v.current=window.requestAnimationFrame(t)}),function(){null!=v.current&&window.cancelAnimationFrame(v.current),e&&e.disconnect(),r&&r.disconnect(),n&&n.disconnect()}},[t,n]),r.a.createElement($,{data:c,lowPassData:d})},Q=(n(45),function(e){var t=e.show;return r.a.createElement("div",{className:T()("loading",{show:!1!==t})},r.a.createElement("span",{className:"loading-dot"}),r.a.createElement("span",{className:"loading-dot"}),r.a.createElement("span",{className:"loading-dot"}))}),ee=n(21),te=(n(46),Object(c.b)(null,function(e){return{goToNextVisualization:function(){return e({type:s.GO_TO_NEXT_VISUALIZATION})},goToPrevVisualization:function(){return e({type:s.GO_TO_PREV_VISUALIZATION})}}})(function(e){var t=Object(a.useState)(!1),n=Object(m.a)(t,2),i=n[0],o=n[1],c=Object(a.useState)(!1),s=Object(m.a)(c,2),u=s[0],l=s[1];Object(a.useEffect)(function(){var t=function(t){switch(t.which){case 37:case 38:e.goToPrevVisualization();break;case 39:case 40:e.goToNextVisualization()}};return document.addEventListener("keydown",t),function(){return document.removeEventListener("keydown",t)}},[]);var d=Object(a.useRef)(),f=Object(a.useRef)(),v=Object(a.useCallback)(function(){null!=d.current&&window.clearTimeout(d.current),o(!0),d.current=window.setTimeout(function(){u||o(!1)},1500)},[u]),w=Object(a.useCallback)(function(){e.context&&e.context.resume(),e.togglePlay(),v()},[e.context,e.togglePlay]),h=Object(a.useCallback)(function(e){e.preventDefault(),f.current=Date.now()},[]),p=Object(a.useCallback)(function(e){1===e.nativeEvent.which&&(f.current=Date.now())},[]),g=Object(a.useCallback)(function(e){1===e.nativeEvent.which&&f.current&&Date.now()-f.current<250&&w()},[]),E=Object(a.useCallback)(function(e){e.preventDefault(),f.current&&Date.now()-f.current<250&&v()},[]),b=Object(a.useCallback)(function(t){t.stopPropagation(),e.goToPrevVisualization(),v()},[e.goToPrevVisualization]),O=Object(a.useCallback)(function(t){t.stopPropagation(),e.goToNextVisualization(),v()},[e.goToNextVisualization]),A=Object(a.useCallback)(function(e){e.stopPropagation()},[]),y=Object(a.useCallback)(function(e){l(e)},[]),I=e.wantsToPlay,j=e.isPlaying;return r.a.createElement(r.a.Fragment,null,I&&!j&&r.a.createElement(Q,null),r.a.createElement("div",{id:"overlay",onMouseDown:p,onMouseUp:g,onTouchStart:h,onTouchEnd:E,onMouseMove:v,className:T()({show:i})},r.a.createElement("h1",{id:"title"},"LATE"),r.a.createElement("div",{id:"version"},"build ",ee.a),r.a.createElement("div",{onTouchEnd:w,className:T()({play:!I&&!j,pause:I&&j})}),r.a.createElement("div",{className:"navigation"},r.a.createElement("div",{className:"arrow-container",onClick:b,onTouchStart:b,onMouseUp:A,onMouseEnter:function(){return y(!0)},onMouseLeave:function(){return y(!1)}},r.a.createElement("svg",{className:"arrow",width:"60px",height:"80px",viewBox:"0 0 50 80"},r.a.createElement("polyline",{fill:"none",stroke:"#FFF",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",points:"\r 45.63,75.8 0.375,38.087 45.63,0.375 "}))),r.a.createElement("div",{className:"arrow-container",onClick:O,onTouchStart:O,onMouseUp:A,onMouseEnter:function(){return y(!0)},onMouseLeave:function(){return y(!1)}},r.a.createElement("svg",{className:"arrow",width:"60px",height:"80px",viewBox:"0 0 50 80"},r.a.createElement("polyline",{fill:"none",stroke:"#FFF",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round",points:"\r 0.375,0.375 45.63,38.087 0.375,75.8 "}))))))})),ne=(n(47),function(){return r.a.createElement("div",{id:"no-web-audio"},"Your device doesn't support the Web Audio API.")});var ae=function(e){var t=Object(a.useState)(!1),n=Object(m.a)(t,2),i=n[0],o=n[1],c=Object(a.useState)(!1),s=Object(m.a)(c,2),u=s[0],l=s[1],d=function(e){var t=Object(a.useState)(e),n=Object(m.a)(t,2),r=n[0],i=n[1],o=Object(a.useRef)(r);return Object(a.useEffect)(function(){o.current=r},[r]),[r,i,o]}(void 0),f=Object(m.a)(d,3),v=f[0],w=f[1],h=f[2],p=Object(a.useState)(),g=Object(m.a)(p,2),E=g[0],b=g[1],O=Object(a.useState)(!1),A=Object(m.a)(O,2),T=A[0],y=A[1],I=Object(a.useRef)(null);Object(a.useEffect)(function(){try{new window.AudioContext}catch(e){y(!0)}},[]),Object(a.useEffect)(function(){var e=I.current,t=function(){return l(!0)},n=function(){return l(!1)},a=console.error;return e.addEventListener("playing",t),e.addEventListener("pause",n),e.addEventListener("error",a),function(){e.removeEventListener("playing",t),e.removeEventListener("pause",n),e.removeEventListener("error",a)}},[]);var j=Object(a.useCallback)(function(){var e=I.current,t=new window.AudioContext,n=t.createMediaElementSource(e);w(t),b(n)},[I.current]),N=Object(a.useCallback)(function(){var e=I.current;e.paused?(o(!0),e.play(),h.current||j()):(o(!1),e.pause())},[I.current]);return T?r.a.createElement(ne,null):r.a.createElement(r.a.Fragment,null,r.a.createElement("audio",{ref:I,id:"audioElement",src:"http://snds.blackwright.com",preload:"auto",crossOrigin:"anonymous"}),v&&E&&r.a.createElement(K,{context:v,source:E}),r.a.createElement(te,{context:v,wantsToPlay:i,isPlaying:u,togglePlay:N}))};n(48),n(49);o.a.render(r.a.createElement(c.a,{store:f},r.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[23,1,2]]]);
//# sourceMappingURL=main.a1149784.chunk.js.map
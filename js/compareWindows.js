require(['dojo/on', 'dojo/dom', 'dojo/dom-class', 'dojo/domReady!'],function(on, dom, domClass){

  var slideAwayButtonSplit = dom.byId('slideAwayButton_split');

  var dualView = false;
  var fs, fs2;

  on(slideAwayButtonSplit, 'click', function(evt){
    if (dualView) {
      fs.removeChild(parent.document.getElementById('frame2'));
      fs = parent.document.getElementById('frameset');
      fs.cols = '100%';
      dualView = false;
      domClass.add('copyColorRange','disabled');
      domClass.remove('copyColorRange','enabled');
    } else {
      fs = parent.document.getElementById('frameset');
      f2 = top.document.createElement('frame');
      fs.cols = '50%,50%';
      f2.name = 'frame2';
      f2.id = 'frame2';
      f2.src = 'map.html';
      fs.appendChild(f2);
      dualView = true;
      domClass.remove('copyColorRange','disabled');
      domClass.add('copyColorRange','enabled');
    }

    /* jshint ignore:start */
    window.setTimeout('fullExtent(); fullExtent();', 500);
    /* jshint ignore:end*/
  });
});
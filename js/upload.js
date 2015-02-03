var myDialog;


function hide () {
  myDialog.hide();
}

function addColumn () {
  thead = $('#upload thead tr th');
  var colID = thead.length-1;
  colID = "year"+colID;
  console.log(colID);
  var colHeader = '<th class="'+colID+'">Jahr <input type="number" name="" value="" placeholder=""><a class="enabled" onclick="removeColumn(this);"><img src="images/close20.png"></a></th>';
  var colData = '<td class="'+colID+'"><input type="number" name="" value="" placeholder=""></td>';
  $('#upload thead tr > th:nth-child('+(thead.length-1)+')').after(colHeader);
  $('#upload tbody tr > td:last-child').after(colData);
}

function removeColumn (elem) {
  nextSiblings = $("."+elem.parentNode.className).nextUntil('#add');
  $("."+elem.parentNode.className).remove();
  $.each(nextSiblings, function (index,value) {
    className = value.className;
    lastDigit = className.slice(-1);
    newID = "year"+(parseInt(lastDigit)-1);
    value.className = newID;
  });
}


require(["dijit/Dialog", "dijit/form/Button", 'dojo/query', "dojo/domReady!"], function(Dialog, Button, query){
  myDialog = new Dialog({
    id: 'myDialog',
    title: "Neues Thema anlegen",
    draggable: false
  });

  query('.progbutton').on('click', function(e) {
    myDialog.set('href','/webgis/new.html');
    myDialog.show();
  });
});
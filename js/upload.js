var myDialog;


function hide () {
  myDialog.hide();
}

function addColumn () {
  var colHeader = '<th>Jahr <a class="enabled" onclick="removeColumn();"><img src="images/close20.png"></a></th>';
  var colData = '<td><input type="number" name="" value="" placeholder=""></td>';
  thead = $('#upload thead tr th');
  $('#upload thead tr > th:nth-child('+(thead.length-1)+')').after(colHeader);
  $('#upload tbody tr > td:last-child').after(colData);
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
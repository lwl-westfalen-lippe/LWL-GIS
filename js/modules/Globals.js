define([], function() {

  //the MapServer for the whole app:
  var mapServer = 'http://giv-learn2.uni-muenster.de/ArcGIS/rest/services/LWL/lwl_service/MapServer';

  //the Server for the feature Layer:
  var featureLayerServer = 'https://services1.arcgis.com/W47q82gM5Y2xNen1/arcgis/rest/services/westfalen_kreise/FeatureServer';
  var fLGemeinde = 'https://services1.arcgis.com/W47q82gM5Y2xNen1/arcgis/rest/services/westfalen_kreise/FeatureServer';

  var map, initExtent, osmLayer, operationalLayer;
  var currentDataframe = datenEinwohnerEntwicklung;
  var autoClassesStartColor = 'FFF880';
  var autoClassesEndColor = 'EA3313';
  var autoClassesBreaks = 3;
  var legendArray = [];
  var activeLayer = 1; // which layer is active at the beginning
  var currentLayer = 1;
  var layerAttributes = ['', 'Webgis Westfalen'];
  var activeClassification = 0; // Gibt die zuletzt durchgeführte Klassifikation an. 0=keine, 1=manuell, 2=automatisch
  var currentYear = years[currentLayer][initYearValues[currentLayer]]; //Aktuell angezeigtes Jahr
  var activeDiagramLayer = 0; //Aktuell angezeigter Diagrammlayer, 0=keiner
  var labelVisibility = true; //zum überprüfen, ob die Label angezeigt sind

  //Layer IDs
  var fIDkreisnamen = 0;
  var fIDeinwohner = 2;
  var fIDeinwohnerEntwicklung = 3;
  var fIDbevoelkerungsdichte = 4;
  var fIDaltersgruppen = 5;
  var fIDaltersgruppenDiagramme2011 = 1;
  var fIDgeburtenrate = 7;
  var fIDsterberate = 8;
  var fIDmigrationenGesamt = 9;
  var fIDmigrationenNichtdeutsch = 10;
  var fIDpflegebeduerftige = 12;
  var fIDpflegeeinrichtungen = 13;
  var fIDhaushaltsgroessen = 14;
  var fIDsingleHaushalte = 15;
  var fIDnichtdeutsche = 16;
  var fIDmigrationshintergrund = 17;
  var fIDeinkommen = 18;
  var fIDkonfessionen = 19;
  var fIDkonfessionenDiagramme20082010 = 2;

  return {

    getMapServer: function() {
      return mapServer;
    },

    getFeatureLayerServer: function() {
      return featureLayerServer;
    },

    getLayerID: function(layerName) {

    }

  }
});
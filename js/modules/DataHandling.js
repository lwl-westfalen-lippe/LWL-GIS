define(['dojo/_base/array'], function(arrayUtil) {

  function removeYearObject (dataframe) {
    return arrayUtil.filter(dataframe, function (item) {
      return item.Name !== 'Jahre';
    });
  }

  return {

    /**
     * Returns the Minimum and Maximum values of
     * an array.
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    getMinMax: function (data) {
      var min = 99999999999;
      var max = -99999999999;
      arrayUtil.forEach(data, function (item, index) {
        if (min > item) { min = item; }
        if (max < item) { max = item; }
      });

      return [min, max];
    },

    /**
     * Returns an Array with the Country-names and Values
     * of the given year from the given dataframe (from lwldatajson.js)
     * @param  {[type]} dataframe [description]
     * @param  {[type]} yearIndex [description]
     * @return {[type]}           [description]
     */
    getLayerData: function (dataframe, yearIndex) {
      var dataArray = [];
      var helpIndex = 0;
      var temp = removeYearObject(dataframe);
      arrayUtil.forEach(temp, function (item, index) {
        dataArray.push([item.Name, item.Data[yearIndex]]);
      });
      return dataArray;
    },

    /**
     * Retruns the index for a given year.
     * @param  {[type]} dataframe [description]
     * @param  {[type]} year      [description]
     * @return {[type]}           [description]
     */
    getYearIndex: function (dataframe, year) {
      var yearIndex = 0;
      for (var i = dataframe.length - 1; i >= 0; i--) {
        if (dataframe[i].Name === 'Jahre'){
          for (var j = 0; j <= dataframe[i].Data.length; j++) {
            if (dataframe[i].Data[j] === year){
              yearIndex = j;
            }
          }
        }
      }
      return yearIndex;
    },

    /**
     * Returns an array containing all available
     * years for a given dataframe.
     * @param  {[type]} dataframe [description]
     * @return {[type]}           [description]
     */
    getYearsArray: function (dataframe) {
      return arrayUtil.filter(dataframe, function (item) {
        if (item.Name === 'Jahre') {
          return item.Data;
        }
      });
    }
  }

});
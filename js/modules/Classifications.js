define(['data/DataHandling'], function(DataHandling) {

  var classes = [];

  function range(low, high, step) {
    //  discuss at: http://phpjs.org/functions/range/
    //  original by: Waldo Malqui Silva
    //   example 1: range ( 0, 12 );
    //   returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    //   example 2: range( 0, 100, 10 );
    //   returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    //   example 3: range( 'a', 'i' );
    //   returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    //   example 4: range( 'c', 'a' );
    //   returns 4: ['c', 'b', 'a']

    var matrix = [];
    var inival, endval, plus;
    var walker = step || 1;
    var chars = false;

    if (!isNaN(low) && !isNaN(high)) {
      inival = low;
      endval = high;
    } else if (isNaN(low) && isNaN(high)) {
      chars = true;
      inival = low.charCodeAt(0);
      endval = high.charCodeAt(0);
    } else {
      inival = (isNaN(low) ? 0 : low);
      endval = (isNaN(high) ? 0 : high);
    }

    plus = ((inival > endval) ? false : true);
    if (plus) {
      while (inival <= endval) {
        matrix.push(((chars) ? String.fromCharCode(inival) : inival));
        inival += walker;
      }
    } else {
      while (inival >= endval) {
        matrix.push(((chars) ? String.fromCharCode(inival) : inival));
        inival -= walker;
      }
    }

    return matrix;
  }

  function log10(x){
    return Math.log(x) / Math.LN10;
  }

  /**
   * Algorithm used by Pretty
   * @param  {[type]} dmin [description]
   * @param  {[type]} dmax [description]
   * @param  {[type]} n    [description]
   * @return {[type]}      [description]
   */
  function rpretty(dmin, dmax, n) {
    var resultArray = [];
    var min_n = parseInt(n / 3);
    var shrink_sml = 0.75;
    var high_u_bias = 1.5;
    var u5_bias = 0.5 + 1.5 * high_u_bias;
    var h = high_u_bias;
    var h5 = u5_bias;
    var ndiv = n;

    var dx = dmax - dmin;
    var cell, U, i_small;
    if (dx === 0 && dmax === 0) {
      cell = 1.0;
      i_small = true;
      U = 1;
    } else {
      cell = Math.max(Math.abs(dmin),Math.abs(dmax));
      if (h5 >= 1.5 * h + 0.5) {
        U = 1 + (1.0/(1+h));
      } else {
        U = 1 + (1.5 / (1 + h5));
        i_small = dx < (cell * U * Math.max(1.0, ndiv) * 1e-07 * 3.0);
      }
    }

    if (i_small) {
      if (cell > 10) {
        cell = 9 + cell / 10;
        cell = cell * shrink_sml;
      }
      if (min_n > 1) {
        cell = cell / min_n;
      }
    } else {
      cell = dx;
      if (ndiv > 1) {
        cell = cell / ndiv;
      }
    }

    if (cell < 20 * 1e-07) {
      cell = 20 * 1e-07;
    }

    base = Math.pow(10.0, Math.floor(log10(cell)));
    var unit = base;
    if ((2 * base) - cell < h * (cell - unit)) {
      unit = 2.0 * base;
      if ((5 * base) - cell < h5 * (cell - unit)) {
        unit = 5.0 * base;
        if ((10 * base) - cell < h * (cell - unit)) {
          unit = 10.0 * base;
        }
      }
    }

    var ns = Math.floor(dmin / unit + 1e-07);
    var nu = Math.ceil(dmax / unit - 1e-07);

    while (ns * unit > dmin + (1e-07 * unit)) {
      ns = ns - 1;
    }
    while (nu * unit < dmax - (1e-07 * unit)) {
      nu = nu + 1;
    }

    var k = Math.floor(0.5 + nu-ns);
    if (k < min_n) {
      k = min_n - k;
      if (ns >= 0) {
        nu = nu + k / 2;
        ns = ns - k / 2 + k % 2;
      } else {
        ns = ns - k / 2;
        nu = nu + k / 2 + k % 2 ;
      }
    } else {
      ndiv = k;
    }

    var graphmin = ns * unit;
    var graphmax = nu * unit;

    var count = parseInt(Math.ceil(graphmax - graphmin))/unit;
    for (var i = 0; i < count; i++) {
      tempVal = graphmin + i * unit;
      resultArray.push(tempVal);
    }

    if (resultArray[0] < dmin) {
      resultArray[0] = dmin;
    }
    if (resultArray[resultArray.length-1] > dmax) {
      resultArray[resultArray.length-1] = dmax;
    }
    return resultArray;
  }

  return {
    equalInterval: function (data, numberOfClasses) {

      // Wird nicht gebraucht
      // autoClassesStartColor = colorStart;
      // autoClassesEndColor = colorEnd;
      // autoClassesBreaks = number;
      // yearIndex = yearInd;

      // console.log('classification equal breaks');
      // activeClassification = 2; // 2 = automatic
      // getLayerData darf hier auch nicht rein. data wird ÜBERGEBEN!!!
      // classificationArray = getLayerData(currentDataframe, yearIndex); // jshint ignore:line

      // gehört hier nicht hin!!!
      //maximum of 12 classes:
      // if (number > 11){
      //     number = 11;
      //     document.getElementById('equalBreaksText').value = 12;
      // }
      var minmax = DataHandling.getMinMax(data); // jshint ignore:line
      var breakStep = (minmax[1] - minmax[0]) / (numberOfClasses + 1); //size of one class
      // braucht hier auch nicht hin!!! var colorArray = generateColor(colorStart, colorEnd, number);   // jshint ignore:line
                                                                      //generates an array of an color gradient

      legendArray = new Array(number+1);
      for (var i = 0; i < legendArray.length; i++) {
        legendArray[i] = new Array(3);
        legendArray[i][0] = colorArray[i];
        legendArray[i][1] = minmax[0] + (breakStep * i);
        legendArray[i][2] = minmax[0] + (breakStep * (i + 1));
      }

      console.log(legendArray);

      var colorIndex;
      for (var j = classificationArray.length - 1; j >= 0; j--) {
        if (classificationArray[j][1] === minmax[1]){
          colorIndex = number;
        }
        else if (classificationArray[j][1] === minmax[0]){
          colorIndex = 0;
        }
        else{
          colorIndex = Math.floor((classificationArray[j][1] - minmax[0]) / breakStep);
        }
        classificationArray[j][1] = [dojo.colorFromHex('#' + colorArray[colorIndex]).r,dojo.colorFromHex('#' + colorArray[colorIndex]).g,dojo.colorFromHex('#' + colorArray[colorIndex]).b,dojo.colorFromHex('#' + colorArray[colorIndex]).a];
      }

      console.log(classificationArray);

      return classes;
    },

    quantile: function (data, numberOfClasses) {

      var classificationArray = data;

      classificationArray.sort(function(a,b){
        return a[1]-b[1];
      });
      var n = classificationArray.length;
      var breaks = [];
      var test = range(0,number);
      test.forEach(function(elem, index, array){
        var q = elem / parseFloat(number+1);
        var a = q * n;
        var aa = parseInt(q * n);
        var r = a - aa;
        var Xq = (1 - r) * classificationArray[aa][1] + r * classificationArray[aa+1][1];
        breaks.push(Xq);
      });
      breaks.push(classificationArray[n-1][1]);

      return classificationArray;

      return classes;
    },

    jenks: function (data, numberOfClasses) {

      var classificationArray = data;
      var minmax = DataHandling.getMinMax(data);

      classificationArray.sort(function(a,b){
        return a[1]-b[1];
      });
      var mat1 = [];
      var mat2 = [];
      var range1 = range(0,classificationArray.length);
      var rangeClasses = range(0,numberOfClasses+1);
      range1.forEach(function(elem, index, array){
        temp = [];
        rangeClasses.forEach(function(elem, index, array){
          temp.push(0);
        });
        mat1.push(temp);
      });
      range1.forEach(function(elem, index, array){
        temp = [];
        rangeClasses.forEach(function(elem, index, array){
          temp.push(0);
        });
        mat2.push(temp);
      });
      rangeClasses2 = range(1,numberOfClasses+1);
      rangeClasses2.forEach(function(elem, index, array){
        mat1[1][elem] = 1;
        mat2[1][elem] = 0;
        rangeValues = range(2, classificationArray.length);
        rangeValues.forEach(function(elem1, index, array){
          mat2[elem1][elem] = parseFloat('Infinity');
        });
      });
      var v = 0.0;
      var range2 = range(2,classificationArray.length);
      range2.forEach(function(l, index, array){
        var s1 = 0.0;
        var s2 = 0.0;
        w = 0.0;
        var range3 = range(1,l);
        range3.forEach(function(m, index, array){
          var i3 = l - m + 1;
          var val = parseFloat(classificationArray[i3-1][1]);
          s2 += val * val;
          s1 += val;
          w += 1;
          v = s2 - (s1 * s1) / w;
          i4 = i3 - 1;
          if (i4 !== 0) {
            range4 = range(2, numberOfClasses+1);
            range4.forEach(function(j, index, array){
              if (mat2[l][j] >= (v + mat2[i4][j - 1])) {
                mat1[l][j] = i3;
                mat2[l][j] = v + mat2[i4][j - 1];
              }
            });
          }
        });
        mat1[l][1] = 1;
        mat2[l][1] = v;
      });
      var k = classificationArray.length;
      var kclass = [];
      var range5 = range(0,numberOfClasses+1);
      range5.forEach(function(i, index, array){
        kclass.push(0);
      });
      kclass[numberOfClasses+1] = parseFloat(classificationArray[classificationArray.length-1][1]);
      kclass[0] = parseFloat(classificationArray[0][1]);
      var countNum = numberOfClasses+1;
      while(countNum >= 2){
        var id = parseInt((mat1[k][countNum]) - 2);
        kclass[countNum - 1] = classificationArray[id][1];
        k = parseInt((mat1[k][countNum] - 1));
        countNum -= 1;
      }

      return classificationArray;
    },

    standardDeviation: function (data, numberOfClasses) {
      var classificationArray = data;

      var mean = 0.0;
      var sd2 = 0.0;
      var n = classificationArray.length;
      var minmax = DataHandling.getMinMax(classificationArray);
      for (var i = 0; i < n; i++) {
        mean = mean + classificationArray[i][1];
      }
      mean = mean / n;
      for (var j = 0; j < n; j++) {
        var sd = classificationArray[j][1] - mean;
        sd2 += sd * sd;
      }

      sd2 = Math.sqrt(sd2 / n);
      var res = rpretty((minmax[0]-mean)/sd2, (minmax[1]-mean)/sd2, number+1);
      var res2 = [];
      res.forEach(function(elem, index, arr){
        tempVal = (elem * sd2) + mean;
        res2.push(tempVal);
      });
      res2.push(minmax[1]);

      return classificationArray;
    },

    pretty: function (data, numberOfClasses) {

      var classificationArray = data;
      var minmax = DataHandling.getMinMax(classificationArray);

      var res = rpretty(minmax[0], minmax[1], numberOfClasses);
      res.push(minmax[1]);

      return classificationArray;
    }
  }

});
// FILL THIS OUT
// name of exercise
// name of student
var project = "Roman Numerals";
var myName = "JTF";


// business logic
var rome = function(number) {
  var numerals = ["", "", "", "", "", "", ""];
  var numerals_position = ["M", "D", "C", "L", "X", "V", "I"];
  var numerals_value = [1000, 500, 100, 50, 10, 5, 1];

  if (number !== 0 && number < 4000) {
    numerals_position.forEach(function(element) {
      var index = numerals_position.indexOf(element);
      while (number >= numerals_value[index]) {
        numerals[index] += numerals_position[index];
        number -= numerals_value[index];
      }
    });
  } else {
    errorMessage = 1;
    return number;
  }

  numerals.forEach(function(element) {
    var index = numerals.indexOf(element);
    if (element.length === 4 && numerals[index - 1].length === 1) {
      numerals.splice(index-1, 1, "");
      numerals.splice(index, 1, numerals_position[index] + numerals_position[index - 2]);
    } else if (element.length === 4) {
      numerals.splice(index, 1, numerals_position[index] + numerals_position[index - 1]);
    }
  });
  return numerals.join("");
};

function rome_J(num) {
  //the values array holds values for 1s, 5s, 10s, 50s, 100s, 1000s
  var values = [0,0,0,0,0,0];
  var output = "";
  for (i=1; i<=num; i++) {
    if (values[0] < 4) {
      values[0] += 1;
    } else {
      values[0] = 0;
      values[1] += 1;
      if (values[1] > 1) {
        values[1] = 0;
        values[2] += 1;
        if (values[2] > 4) {
          values[2] = 0;
          values[3] += 1;
          if (values[3] > 1) {
            values[3] = 0;
            values[4] += 1;
          }
        }
      }
    }
  }

  // Now translate to romans
  var hundreds = values[4];
  var fifties = values[3];
  var tens = values[2];
  var fives = values[1];
  var ones = values[0];
  // deal with hundreds
  for (i = hundreds; i>0; i--) {
    output = (output + "C");
  }
  // deal with fifties
  if (fifties === 1 && tens === 4) {
    output = (output + "XC");
    tens = 0;
  } else {
    for (i = fifties; i>0; i--) {
      output = (output + "L");
    }
  }
  // deal with tens
  if (tens===4) {
    output = (output + "XL");
  } else {
    for (i = tens; i>0; i--) {
      output = (output + "X");
    }
  }
  // deal with fives
  if (fives === 1 && ones === 4) {
    output = (output + "IX");
    ones = 0;
  } else {
    for (i = fives; i>0; i--) {
      output = (output + "V");
    }
  }
  // deal with ones
  if (ones === 4) {
    output = (output + "IV");
  }else{
    for (i = ones; i>0; i--) {
      output = (output + "I");
    }
  }

  return output;
}

function speedRun() {
  var start_time = new Date().getTime();
  for (counter=1;counter <= 10000;counter++) {
    rome_J(349);
  }
  var end_time = new Date().getTime();
  console.log((end_time - start_time) + " milliseconds.");
}


$(document).ready(function() {
  // page setup logic
  $("#this_exercise span").text(project);
  $("#this_field span").text(project);
  $("#this_output span").text(project);
  $("#footer span").text(myName);

  // page event logic
  $("#input").submit(function(event) {
    event.preventDefault();
    var userInput = parseInt($("#input_text").val());
    var output = rome_J(userInput);
    $(".calculated_output").text(output);
    $(".my_result").show();
    speedRun();

    // alert(userInput);
  });

  $("#reset").click(function() {
    $("#input_text").val("");
    $(".my_result").hide();
  })

})

window.onload = function () { // Once the page loads, print to console
    console.log("\"The only people who never fail are those who never try.\"");
}

function summonQuote() {
  // generate an index between 0 and 324 for the quotes JSON object
  var generatedIndex = Math.floor(Math.random()*324);
  // grab the quoteText randomly from the JSON object
  var listOfQuotes = this.quotes;
  var quoteText = listOfQuotes[generatedIndex].text;
  // Add quotation marks to the quote
  quoteText = '"'+quoteText+'"'

  // create the paragraph element for the generated quote
  var generatedQuote = document.createElement("p");
  var quote = document.createTextNode(quoteText);
  generatedQuote.appendChild(quote);
  // print the new quote to the console
  console.log(quoteText);

  // Get the div element with the id "consoleManipulation"
  let consoleManipulation = document.getElementById("consoleManipulation");
  //append the quote to the div element
  consoleManipulation.appendChild(generatedQuote);
}

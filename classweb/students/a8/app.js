

let urls = {
	xkcd:"http://xkcd.com",
	conceptnet: "http://api.conceptnet.io/c/en/example",
	// va: "http://www.vam.ac.uk/api/json/museumobject/?callback=foo&q=medieval&materialsearch=gold&images=1",
	va: "http://www.vam.ac.uk/api/json/museumobject/?callback=foo&q=medieval&materialsearch=gold&images=1",
	placeholder: 'https://jsonplaceholder.typicode.com/todos/1',
	wiki: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Stack%20Overflow",
	ghibli: "https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49",
	resig: "https://api.github.com/users/jeresig"
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}




function foo(data)
{
	console.log("FOO", data)
    // do stuff with JSON
}

// or document.head.appendChild(script) in modern browsers

//http://www.vam.ac.uk/api/json/museumobject/?callback=my_callback1&q=medieval&materialsearch=gold&images=1

let app = {
	reviewWords: [[],[],[],[],[],[],[],[]],
	colors: [],
	init() {
		console.log("start the app!")


		let map;


		// fetch("https://ghibdsafsdafsliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49")
		// .then(response => response.json())
		// .then(json => {
		// 	console.log("GHIBLI", json)
		// 	// Vue.set(app, "colors", json.colors)
		// }).catch(err => {
		// 	console.log(err)
		// });

		fetch("data/xkcd-colors.json")
		.then(response => response.json())
		.then(json => {
			console.log("COLORS", json)
			Vue.set(app, "colors", json.colors)
		});


		fetch("data/genmeth-peer-reviews.json")
		.then(response => response.json())
		.then(json => {
			console.log("REVIEWS", json)
			Vue.set(app, "reviewWords", json.frequency)
		});

		Vue.component("review-word", {
			template: `<div class="card" :style="style" v-if="count < 100">
				{{word}}
			</div>`,
			computed: {
				style() {
					return {
						fontSize: (this.count + 10 + 1000/this.word.length) + "%"
					}
				}
			},
			props: ["word", "count"]
	
		})


		new Vue({
			template: `
				<div id="app">

					<div class="card-holder" v-if="true">

						<div v-for="(assignment,anum) in app.reviewWords" class="card" >
							<h2>{{anum}}</h2>
							<review-word v-for="(count,word) in assignment" :word="word" :count="count" />
								
						</div>
					</div>

					<div class="card-holder" v-if="false">
						<div v-for="color in app.colors" class="card" :style="{backgroundColor:color.hex}">
							{{color}}
						</div>
					</div>

					
				</div>

			`,
			data() {
				return {
					app: app
				}
			},
			el: "#app"
		})
		

		function tryURL(url) {
			// fetch(url,  {mode: 'cors' }).then((response) => {
			// 	console.log(url, response)
			// })

			// $.getJSON(url + "?callback=?", function(result){
			// 	//response data are now in the result variable
			// 	console.log(url, result);
			// });
			 // $.ajax({
		  //       url: url,
		  //       dataType: 'jsonp',
		  //       jsonpCallback: 'foo',
		  //       jsonp: true,
		  //   });

			// $.ajax({
			// 	url: url,

			// 	dataType: "jsonp",
			// 	success: function( response ) {
			// 		console.log(url,  response ); // server response
			// 	}

			// });

			// $.getJSON(url + "?callback=?",function(json){
			// 	console.log(json);
			// });
			// $.getJSON(url + "?callback=?",function(json){
			// 	console.log(json);
			// });

			$.getJSON(url,function(json){
				console.log(json);
			});

			// var script = document.createElement('script');
			// script.src = url + '?callback=foo'

			// document.getElementsByTagName('head')[0].appendChild(script);
		}
		
		// tryURL(urls.conceptnet)
		// tryURL(urls.ghibli)
		// tryURL(urls.wiki)
		// // tryURL(urls.xkcd)
		// tryURL(urls.placeholder)
		// tryURL(urls.va)


		  
	}
}
/*
Clever stuff goes here
*/
function renderResults(jsonp_data) {	
	console.log("DATA", jsonp_data)
    /* Do something with the JSON objects */
}

/*
Execute the XHR request and call success function
*/
function executeApiQuery(search_parameters) {
	options = {
	  type: 'GET',
	  dataType: 'jsonp',
	  data: search_parameters,
	  success: function(data){ 
		  renderResults(data);
	  },
	  failure: function(data){}
	};
	$('#submit').hide();
	$.ajax('http://www.vam.ac.uk/api/json/museumobject/', options);
}

/*
 Make AJAX JSONP request when page ready
*/
$(document).ready(function(){
	search_parameters = {
	  q: 'medieval', 
	  materialsearch:'gold',
	  images: 1
	}
	executeApiQuery(search_parameters);
})

document.addEventListener("DOMContentLoaded", function(){
	app.init()
})
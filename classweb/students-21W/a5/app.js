


// Do setup
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el: "#app",
		template: `<div id="app">
			<chat-widget :messages="messages" />


			Coffee: {{bot.coffeeAmount}}/{{bot.maxCoffee}} cups of {{bot.coffeeFlavor}}

			<div id="controls">
				<div>
					<input ref="input" v-model="currentInput" @keyup="sayKey" @keyup.enter="enterInput">
					
					<button @click="enterInput">↩️</button>
				</div>
				<div>
					<button @click="handleInput('brew')">☕️</button>
					<button @click="handleInput('drink')">drink</button>
				</div>
			

			</div>

			{{currentInput}}
		</div>`,

		watch: {
			// currentInput() {
			// 	console.log('Input is now', this.currentInput)
			// },

			messages() {
				// console.log("messages", this.messages)
			}
		},

		methods: {
			sayKey() {
				console.log("KEY")
			},

			postToChat(text, owner, isSelf) {
				this.messages.push({
					text: text,
					isSelf: isSelf,
					owner: owner,
				})
			},

			enterInput() {
				let text = this.currentInput
				this.currentInput = ""

				
				this.handleInput(text)

			},

			handleInput(text) {
				// Does bot things
				this.postToChat(text, "😐", true)

				// Add to the messages in chat
			
				// Bot does something
				let output = this.bot.respondTo(text)

				setTimeout(() => {
					this.postToChat(output, "☕️")
					
				}, Math.random()*100 + 400)

			}
		},

		mounted() {

			console.log("Vue app is all set up....")
			setInterval(() => {
				// this.currentInput = randomMessage()

			}, 1000)

			this.bot.post = (text) =>  {
				// this is now the vue object
				this.postToChat(text, "☕️")
			}

		},
		

		data() {
			return {
				// Store the bot
				bot: new CoffeeBot(),

				// And the message
				messages: [],

				// And the current thing in the input
				currentInput: ""
			}
		}
	})	
})

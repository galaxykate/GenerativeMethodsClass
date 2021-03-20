// Do setup
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el: "#app",
        template: `<div id="app"> 
            <chat-widget :messages="messages" />



			<div id="controls">
				<div>
					<input ref="input" v-model="currentInput" @keyup.enter="enterInput">
					<button @click="enterInput">↩️</button>
				</div>
				<div>
					<button @click="clickInput('positive')">😍</button>
					<button @click="clickInput('negative')">🤨</button>
				</div>
			

			</div>
		</div>`,

        
        watch: {
			messages() {
				// console.log("messages", this.messages)
			}
		},

		methods: {
            
            postToChat(text, owner, isSelf) {
				this.messages.push({
					text: text,
					isSelf: isSelf,
					owner: owner,
				})
            },
            
            handleOutput(input) {
                let output = this.bot.respondTo(input)
                
                setTimeout(() => {
					this.postToChat(output, "🤩")
					
                }, 500)
            },

			enterInput() {
				let text = this.currentInput
				this.currentInput = ""

				//this.handleInput(text)
                this.postToChat(text, "😎", true)
                this.handleOutput(text)
			},

			// handleInput(text) {
			// 	// Does bot things
			// 	this.postToChat(text, "😎", true)

			// 	// Add to the messages in chat
			
			// 	// Bot does something
			// 	this.handleOutput(text)
            // },

            clickInput(button) {
                
                let randomText
                if (button === "positive") {
                    randomText = this.bot.grammar.flatten('#positive#')
                    this.postToChat(randomText, "😎", true)
                    this.handleOutput("positive")
                }
                else if (button === "negative") {
                    randomText = this.bot.grammar.flatten('#negative#')
                    this.postToChat(randomText, "😎", true)
                    this.handleOutput("negative")
                }
                else {
                    
                }

            }
			
		},

		mounted() {

			console.log("Vue app is all set up....")
			setInterval(() => {
				

			}, 1000)

			this.bot.post = (text) =>  {
				// this is now the vue object
				this.postToChat(text, "🤩")
			}
            this.bot.post("I have some new ideas about our next character!")
            this.bot.post("Do you wanna meet a fighter or a mage?")
		},
		

		data() {
			return {
				// Store the bot
				bot: new PitchBot(),

				// And the message
				messages: [],

				// And the current thing in the input
				currentInput: ""
			}
		}
	})	
})
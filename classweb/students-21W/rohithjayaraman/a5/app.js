document.addEventListener("DOMContentLoaded", function () {
  //main vue element - renders page
  new Vue({
    el: "#app",
    template: `<div id="app">
				<chat-widget :messages="messages" />

				<div id="controls">
				<div>
					<input class="input" placeholder="Type here" ref="input" v-model="currentInput" @keyup.enter="enterInput">
					<button class="button" @click="enterInput">Send</button>
				</div>

				</div>
				</div>
				`,
    methods: {
      /*
      function to post to chat
      text - text to post
      owner - name of person posting - either "you" or "RoBot"
      */
      postToChat(text, owner) {
        this.messages.push({
          text: text,
          owner: owner,
        });
      },
      /*
      captures input in input box and then clears it after calling handler 
      */
      enterInput() {
        let text = this.currentInput;
        this.currentInput = "";

        this.handleInput(text);
      },
      /*
      input handler - posts input to chat, calls bot to fetch response for input
      then posts bot response 
      */
      handleInput(text) {
        this.postToChat(text, "You", true);

        const output = this.bot.reply(text);

        let counter = 0;

        //putting postToChat in a global function
        const postChat = this.postToChat;

        //function to post messages returned by the bot, each after a small delay
        function post() {
          postChat(output[counter], "Ro-bot");
          if (++counter < output.length) {
            setTimeout(post, Math.random() * 100 + 400);
          }
        }

        //calling method to post bot responses
        post();
      },
    },
    //logging to know if vue setup is done
    mounted() {
      console.log("Vue setup done");
    },
    data() {
      //data - object of robot class, messages array and current input value
      return {
        bot: new RoBot(),
        messages: [],
        currentInput: "",
      };
    },
  });
});

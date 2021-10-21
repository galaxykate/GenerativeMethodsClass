//chat message component
Vue.component("chat-message", {
  template: `<div class="chat-row"  :class="rowClasses">
		<div class="chat-message" :class="ownerClass"><div class="chat-owner" v-if="notYou">{{message.owner}}</div><div>{{message.text}}</div></div>
	</div>`,

  mounted() {
    this.$el.scrollIntoView({ behavior: "smooth" });
  },
  computed: {
    //calculate stuff for aligning messages (only for user)
    rowClasses() {
      if (this.message.owner == "You") return "self";
    },
    //calculate stuff for showing owner name (only for bot)
    ownerClass() {
      if (this.message.owner == "You") return "user";
      return "bot";
    },
    //check if owner is not user
    notYou() {
      return this.message.owner != "You";
    },
  },
  props: {
    message: {
      required: true,
    },
  },
});

//widget component
Vue.component("chat-widget", {
  template: `
		<div class="chat-widget">
			<div class="messages">
				<chat-message 
					v-for="(msg,msgIndex) in messages" 
					:key="msgIndex" 
					:id="'msgrow'+msgIndex"
					:message="msg" />
			</div>

		</div>
	`,
  props: {
    messages: {
      required: true,
      type: Array,
    },
  },
});

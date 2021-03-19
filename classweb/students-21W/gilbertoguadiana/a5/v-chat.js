function randomMessage() {
	let count = (Math.random()**3) *10
	let text = Math.random().toString(36).substring(7);
	for (var i = 0; i < count; i++) {
		text += " " + Math.random().toString(36).substring(Math.random()*15);
	}
	return text
}

Vue.component("chat-message", {
	template:`<div class="chat-row"  :class="rowClasses">
		<div class="chat-owner" v-if="owner">{{message.owner}}</div>
		<div class="chat-message">{{message.text}}</div>
	</div>`,

	mounted() {

		console.log("I'm a message")
		this.$el.scrollIntoView({behavior: 'smooth'});
	},
	computed: {
		owner() {
			return this.message.owner
		},
		rowClasses() {
			
			let c = {
				"self": this.owner && this.message.isSelf
			}
			if (this.message.type) {
				c["chat-msg-" + this.message.type] = true
			}
			return c
		}
	},

	props: {
		message: {
			required: true
		}
	}
})

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
			type: Array
		}
	},

})
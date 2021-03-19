class BlockchainBelieverBot {
 constructor() {
		this.grammar = tracery.createGrammar(blockchainGrammar)
    this.blockchainType = this.grammar.flatten("#blockchainType#")
    console.log("A type of blockchain:", this.blockchainType)
    this.flag = 0;
	}

	respondTo(s) {
    if (this.flag == 1) { // disregards whatever input because the bot does not care at this stage of the conversation.
      this.flag = 0 // reset flag
      return this.grammar.flatten("Sure, but it's definitely time to watch #blockchainType# because its amazing #blockchainProperty# is getting the public's attention and its #blockchainMetric# cannot be beat.")
    }

    if (this.flag == 2) {
      this.flag = 0 // reset flag
      this.post(`${s}?`)
      return this.grammar.flatten("#blockchainComparisonComment#'s #blockchainMetric# or #blockchainProperty#")
    }

    if (s.includes("invest")) {
      this.flag = 1
			return this.grammar.flatten("Are you investing in crypto?")
		}

		if (s.includes("future")) {
      this.post(this.grammar.flatten("The future of #blockchainRelated# technology is full of #blockchainApplications# for #blockchainUsers#."))
			return this.grammar.flatten("We know this because tons of developers are working on improving its #blockchainMetric#")
		}

    if (s.includes("I like blockchain")) {
      this.flag = 2;
			return "Which one is your favorite?"
		}

		if (s.includes("blockchain is bad"))
			return `No.`
		return `I don't understand. What part of the blockchain industry is ${s} in?`
	}
}

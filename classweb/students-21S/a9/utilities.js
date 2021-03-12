// Returns a value between 0 and 1, but never reaching either
function sigmoid(v) {
	return 1 / (1 + Math.pow(Math.E, -v));
}


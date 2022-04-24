export default class Clamp {
	constructor(min, max, num) {
		this.min = min
		this.max = max
		this.num = num
	}
	clampThisRange() {
		return Math.min(Math.max(this.num, this.min), this.max)
	}
}

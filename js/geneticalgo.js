class Population {
	constructor(m) {
		this.candidates = [];

		for (var i = 0; i < m; i++) {
			this.candidates.push(new Candidate());
		}

		this.current = 0;
		this.generation = 0;
	}

	reportFitness(fitness) {
		// Finish a sound and report its quality
		this.candidates[this.current].fitness = fitness;

		if (this.current < this.candidates.length - 1) {
			this.current ++;
		} else {
			this.evolve();
			this.current = 0;
		}
	}

	evolve() {
		let new_candidates = [];

		// TODO: use crossover for this
		let cand;
		for (cand in this.candidates) {
			new_candidates.push(new Candidate());
		}

		this.candidates = new_candidates;
		this.generation ++;
	}

	genChild() {
		// TODO
	}

	rouletteSelect() {
		// TODO
	}

}

class Candidate {


	constructor() {
		const SIZE = 12;
		this.DNA = [];
		this.fitness = null;

		for (var i = 0; i < SIZE; i++) {
			this.DNA.push(Math.floor(Math.random() * 12));
		}
		console.log(this.DNA);
	}

	play() {

	}

}
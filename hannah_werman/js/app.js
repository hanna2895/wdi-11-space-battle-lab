const getRandomInteger = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomAccuracy = (min, max) => {
	return Math.random() * (max-min) + min;
}

const theGame = {
	fightingMegaShip: false,
	startGame() {
		let rounds = getRandomInteger(6, 11)
		alienShipFactory.alienShips = [];
		// if (alienShipFactory.alienShips.length > 0) {
		// 	const startOver = prompt("Are you sure you want to start over?")
		// 	if (startOver === 'yes') {
		// 		for (let i = 1; i <= rounds; i++) {
		// 			alienShipFactory.generateAlienShips()
		// 		} console.log("There are " + rounds + " alien ships on the horizon. Type USSAssembly.attack() to begin the game.");
		// 	} else {
		// 		console.log("Please type theGame.continue() to continue.");
		// 	}
		// } else {
			for (let i = 1; i <= rounds; i++) {
				alienShipFactory.generateAlienShips()
				this.shipsDestroyed = 0;
			} console.log("There are " + rounds + " alien ships on the horizon. Type attackAliens() to begin the game.");
		// }

		// console.log(alienShipFactory.alienShips)
	},
	continue() {
		// if there are remaining alien ships, 
		if (alienShipFactory.alienShips.length > 0) {
			const userInput = prompt("You have defeated " + this.shipsDestroyed + " alien ships. You have " + USSAssembly.hull + " out of 20 hull strength remaining. \n\n\nTo continue to the next alien ship, please type 'attack'. If you would like to use one of your " + USSAssembly.missileAttacksRemaining + " remaining missile attacks, please type 'missile attack'. \nIf you would like to retreat, please type 'retreat'.")
			if (userInput === "attack") {
				USSAssembly.attackAlien(USSAssembly.targetAlien());
			} else if (userInput === 'missile attack') {
				USSAssembly.missileAttack();
			}else if (userInput === "retreat") {
				console.log("You have chosen to retreat. The alien ships destroyed the earth in your absence. Game Over.");
			}
		} else if (alienShipFactory.alienShips.length === 0 && this.fightingMegaShip === false) {
			console.log("You have defeated all the alien ships. The Mega Ship approaches.");
			// if (megaShip.miniships)
			
			this.fightingMegaShip = true;
			this.continueToMegaShip();
		}
	},

	continueToMegaShip () {
		if (this.fightingMegaShip === true) {
			const userInput = prompt("You have defeated the alien ships but now you must fight the MegaShip in order to protect the Earth. To continue, please type 'attack'. If you would like to retreat, please type 'retreat'. \nYou have " + USSAssembly.hull + " hull points remaining.");
			let rounds = getRandomInteger(6, 11);
			megaShip['miniShips'] = [];

			for (let i = 1; i <= rounds; i++) {
				megaShip.generateMiniShips()
				this.gunTowersDestroyed = 0;
			}
				if (userInput === 'attack') {
					this.fightMegaShip();
				} else if (userInput === 'retreat') {
					console.log("You have chosen to retreat. The alien ships destroyed the Earth in your absence. Game Over.");
				}
					
		}
	}, 

	fightMegaShip() {
		if (megaShip.miniShips.length > 0) {
			// create a ship method thta fights the miniships
			USSAssembly.attackMega()
		} else if (megaShip.miniShips.length === 0 && megaShip.hull > 0) {
			// fight mega ship
			USSAssembly.attackMotherShip()
		} else if (megaShip.miniShips.length === 0 && megaShip.hull === 0) {
			console.log("You have defeated the MegaShip. You win the game. ");
		}
	},
	shipsDestroyed: 0,
	gunTowersDestroyed: 0
}







const USSAssembly = {
	hull: 20,
	firepower: 5,
	accuracy: .7,
	missileAttacksRemaining: getRandomInteger(2,8), 
	targetAlien() {
		const target = prompt("Scientists on Earth have developed a super targeting computer for your lasers. Please enter a number between 1 and " + alienShipFactory.alienShips.length + " to select which alien ship you'd like to target.")
		return target - 1;
	},
	attackAlien(idx) {
		// this.targetAlien();
		let attack = Math.random();
		if (alienShipFactory.alienShips.length > 0) {
			if (attack < this.accuracy) {
			alienShipFactory.alienShips[idx].hull -= this.firepower;
			// console.log(alienShips[0]);
			console.log("You hit the alien ship!");
			if (alienShipFactory.alienShips[idx].hull > 0) {
				alienShipFactory.alienShips[idx].attack()
			} else {
				theGame.shipsDestroyed += 1;
				alienShipFactory.alienShips.shift(); 
				console.log("You destroyed the alien ship. You have destroyed " + theGame.shipsDestroyed + " total alien ships. There are " + alienShipFactory.alienShips.length + " alien ships remaining.");
				theGame.continue();
				// say something like pls bring anohther ship to continue
			}
			} else if (attack > this.accuracy) {
				console.log("Your attack did not hit the alien ship.");
				alienShipFactory.alienShips[idx].attack();
				theGame.continue();
			}
		} else if (alien.length === 0) {
			console.log("There are no alien ships remaining. The mega ship approaches over the horizon. Please type theGame.continueToMegaShip() to continue.");
				// theGame.continueToMegaShip()
		}
		// console.log(attack);
		
	},
	missileAttack() {
		if (this.missileAttacksRemaining > 0) {
			theGame.shipsDestroyed += 1;
			this.missileAttacksRemaining -= 1;
			console.log("You destroyed the alien ship using your heat seeking missile. You have " + this.missileAttacksRemaining + " missile attacks remaining.");
			alienShipFactory.alienShips.shift();
			theGame.continue();
		} else {
			console.log("You have no remaining missile attacks.");
			theGame.continue();
		}
		
	}, 
	attackMega() {
		let attack = Math.random();
		if (megaShip.miniShips.length > 0) {
			if (attack < this.accuracy) {
			megaShip.miniShips[0].hull -= this.firepower;
			// console.log(alienShips[0]);
			console.log("You hit the a gun tower on the MegaShip!");
			if (megaShip.miniShips[0].hull > 0) {
				megaShip.miniShips[0].attack()
			} else {
				theGame.gunTowersDestroyed += 1;
				megaShip.miniShips.shift(); 
				console.log("You destroyed one of the gun towers. You have destroyed " + theGame.gunTowersDestroyed + " total gun towers on the mother ship. There are " + mega.length + " gun towers and the mothership remaining.");
				if (megaShip.miniShips.length === 0) {
					console.log("You have destroyed all of the Mothership's gun towers but you must still destroy the Mothership to save the Earth.");
					this.attackMotherShip();
				} else {
					theGame.fightMegaShip();
				}
				
				// say something like pls bring anohther ship to continue
			}
			} else if (attack > this.accuracy) {
				console.log("Your attack did not hit the alien ship.");
				megaShip.miniShips[0].attack();
			}
		} else {
			console.log("There are no alien ships remaining. You must now fight the mothership. Please type USSAssembly.attackMotherShip() to continue.");
		}
	},
	attackMotherShip () {
		let attack = Math.random();
		if (attack < this.accuracy) {
			megaShip.hull -+ this.firepower;
			console.log("You hit the mothership.");
			if (megaShip.hull > 0) {
				// megaship attack method
			} else {
				console.log("You have defeated the mothership and saved Earth from the alien invasion. You win the game. Congratulations.");
			}
		}
	}
	
}



// ALIEN SHIP (make as a class?)
class AlienShip {
	constructor() {
		this.hull = getRandomInteger(3, 7),
		this.firepower = getRandomInteger(2, 5),
		this.accuracy = getRandomAccuracy(.6, .8)
	// hull: random range between 3 and 6
	// firepower: random range betwen 2 and 4
	// accuracy: random range between .6 and. .8
	}
	attack() {
		if (this.hull > 0) {
			let alienAttack = Math.random()
			// also add shields that work inconsistently
			let shieldStrength = 1-alienAttack;
			if (shieldStrength < alienAttack && alienAttack < this.accuracy) {
				USSAssembly.hull -= (this.firepower * shieldStrength);
				console.log("Your ship sustained an indirect hit from the alien ship's lasers thanks to your shield. You received " + (this.firepower * shieldStrength) + "damage. Your hull strength is now " + USSAssembly.hull + ".");
				theGame.continue();
			} else if (alienAttack < this.accuracy) {
				USSAssembly.hull -= this.firepower;
				console.log("Your ship sustained a direct hit from the alien ship's lasers. You received " + this.firepower + " damage. Your hull strength is now " + USSAssembly.hull + ".");
					theGame.continue();
				if (USSAssembly.hull > 0) {
					console.log("You survived and may now retaliate.");
					theGame.continue()
				} else if (USSAssembly.hull <= 0) {
					alert("The aliens destroyed your ship. Game over.");
				}
			} else if (alienAttack > this.accuracy) {
				console.log("The alien ship's attack missed your ship.");
				theGame.continue()
			}
		}

		if (alienShipFactory.alienShips.length === 0) {
		"ERROR: NO ALIEN SHIPS"
	}
	}


}

const alienShipFactory = {
	alienShips: [],
	generateAlienShips() {
		const newAlienShip = new AlienShip(this.alienShips.length);
		this.alienShips.push(newAlienShip);
		return newAlienShip;
	},
	findShip(index) {
		return this.alienShips[index]
	}
}

// MEGA SHIPPPPPPPP
// has a bunch of little ships 
const megaShip = {
	miniShips: [],
	hull: 15,
	generateMiniShips() {
		const newMiniShip = new AlienShip(this.miniShips.length);
		this.miniShips.push(newMiniShip);
		return newMiniShip;
	}, 
	findMiniShip(index) {
		return this.miniShips[index]
	}, 
	attack () {
		if (this.hull > 0) {
			let alienAttack = Math.random()
			// also add shields that work inconsistently
			let shieldStrength = 1-alienAttack;
			if (shieldStrength < alienAttack && alienAttack < this.accuracy) {
				USSAssembly.hull -= (this.firepower * shieldStrength);
				console.log("Your ship sustained an indirect hit from the Mothership's lasers thanks to your shield. You received " + (this.firepower * shieldStrength) + "damage. Your hull strength is now " + USSAssembly.hull + ".");
				theGame.fightMegaShip();
			} else if (alienAttack < this.accuracy) {
				USSAssembly.hull -= this.firepower;
				console.log("Your ship sustained a direct hit from the Mothership's lasers. You received " + this.firepower + " damage. Your hull strength is now " + USSAssembly.hull + ".");
					theGame.fightMegaShip();
				if (USSAssembly.hull > 0) {
				//USS ASSEMLY ATTACK METHOD
					console.log("You survived and may now retaliate.");
					theGame.fightMegaShip()
				} else if (USSAssembly.hull <= 0) {
					alert("The aliens destroyed your ship. Game over.");
				}
			} else if (alienAttack > this.accuracy) {
				console.log("The Mothership's attack missed your ship.");
				theGame.fightMegaShip()
			}
		}
	}
}

const alien = alienShipFactory.alienShips;

const mega = megaShip.miniShips;

const start = () => {
	theGame.startGame()	
}

const attackAliens = () => {
	USSAssembly.attackAlien(USSAssembly.targetAlien());
}

// YOU ATTACK THE SHIP
	// IF THE SHIP SURVIVES, IT ATTACKS YOU
		// IF YOU SURVIVE, YOU ATTACK AGAIN

		// if the alien ship is destroyed, remove that ship from the alien ships array
		// if the alien ships array . length is zero, you defeated all the alien ships and win the game. 

		// IF YOU ARE DESTROYED, GAME OVER

	// IF THE SHIP IS DESTROYED, YOU CHOOSE WHETHER TO ATTACK THE NEXT SHIP OR RETREAT
		// IF YOU CHOOSE TO ATTACK THE NEXT SHIP, RETURN TO THE BEGINNING
		// IF YOU CHOOSE TO RETREAT, GAME OVER

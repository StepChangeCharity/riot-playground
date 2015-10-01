"use strict";

var DB = {

	getClient: function() {
		debugger;
		var wn = null;

		this.ensureHasAccount();
		wn = localStorage["WEB_NUMBER"];

		return wn;
	},

	getAnswers: function() {
		var data = null, answers = null;

		this.ensureHasAccount();
		data = localStorage["ANSWERS"];
		answers = JSON.parse(data);

		return answers;
	},

	saveAnswers: function(answers) {
		localStorage["ANSWERS"] = JSON.stringify(answers);
		return answers;
	},

	ensureHasAccount: function() {
		var data = localStorage["WEB_NUMBER"];
		if (data !== undefined){
			// account already exists
			return true;
		}

		// No account, so initial setup
		this.createClient();

		// Flag account was created
		return true;
	},

	createClient: function() {
		// start afresh
		localStorage.clear();

		var db = null;
		var webNumber = "";
		var nextId = localStorage["MAX_ID"];
		if (nextId === undefined)
			nextId = 999;
		nextId++;

		webNumber = "W" + nextId.toString();

		localStorage["WEB_NUMBER"] = webNumber;

		// add empty placeholders
		var initAnswers = [
	    {"id": 1, "group": "INCOME", "amount": 10, "dataItem": "CltWork", "prompt": "How much do you earn?", "frequency": "MONTHLY", "supports": "WF4MY" },
	    {"id": 2, "group": "INCOME", "amount": 1200, "dataItem": "ChildSupport", "prompt": "How much child support do you get?", "frequency": "YEARLY", "supports": "WF4Y" },
	    {"id": 3, "group": "EXPENDITURE", "amount": 15, "dataItem": "TVLicense", "prompt": "How much for your TV license?", "frequency": "MONTHLY", "supports": "WF4MY" }
	  ];
		localStorage["ANSWERS"] = JSON.stringify(initAnswers);
		localStorage["DEBTS"] = "{}";
		localStorage["ASSETS"] = "{}";
		localStorage["YOU"] = "{}";

		return db;
	},

	initDB: function(withIncrementor) {
		var incrementer = localStorage["MAX_ID"];
		if (incrementer !== undefined) {
			// already done, so skip this step
			return;
		}

		// initialise with the given incrementer
		localStorage["MAX_ID"] = withIncrementor;
	},


};



// ASYNC JSON load snippet
// $.ajax({
// 	// Hey, we're just prototyping ... stop judging me !
// 	async: false,
// 	url: "./data.js",
// 	dataType: "json",
// 	cache: false,
// 	success: function(data) {
// 		db = DB.saveBudget(data);
// 		console.log("Budget initialised.");
// 	},
// 	error: function(xhr, status, err) {
// 		console.log("error!", err);
// 	}
// });

function AnswerStore() {
  // enforce singleton (I think!)
  if (!(this instanceof AnswerStore)) return new AnswerStore();

  riot.observable(this);

  var self = this;

  self.answers = [
    {"id": 1, "group": "INCOME", "amount": 10, "dataItem": "CltWork", "prompt": "How much do you earn?", "frequency": "MONTHLY", "supports": "WF4MY" },
    {"id": 2, "group": "INCOME", "amount": 1200, "dataItem": "ChildSupport", "prompt": "How much child support do you get?", "frequency": "YEARLY", "supports": "WF4Y" },
    {"id": 3, "group": "EXPENDITURE", "amount": 15, "dataItem": "TVLicense", "prompt": "How much for your TV license?", "frequency": "MONTHLY", "supports": "WF4MY" }    
  ];

  self.on("Answers::ON_MOUNT", function() {
    console.log("answer-store.js","Answers loading");

    // Load answers from the database
    self.trigger("Answers::ON_CHANGE", self.answers);
  });

  self.on("Answer::ON_CHANGE", function(answer) {
    self.answers.some(function(p) {
      if (p.id === answer.id) {
        // found existing, so update => Fire update to API
        p.amount = answer.amount;
        p.frequency = answer.frequency;

        // tell rest of the system about the change
        console.log("answer-store.js", "trigger ON_CHANGE");
        self.trigger("Answers::ON_CHANGE", self.answers);
        return true;
      }
    }); // some
  });

}

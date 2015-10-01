"use strict";
//# sourceURL=_answer-store.js

function AnswerStore() {
  // enforce singleton (I think!)
  if (!(this instanceof AnswerStore)) return new AnswerStore();

  riot.observable(this);

  var self = this;

  self.answers = DB.getAnswers();

  self.on(Messages.ANSWERS_MOUNTED, function() {
    console.log("answer-store.js","Answers loading");

    // Load answers from the database
    self.trigger(Messages.ANSWERS_CHANGE, self.answers);
  });

  self.on(Messages.ANSWER_CHANGE, function(answer) {
    self.answers.some(function(p) {
      if (p.id === answer.id) {
        // found existing, so update => Fire update to API
        p.amount = answer.amount;
        p.frequency = answer.frequency;

        // tell rest of the system about the change
        // ... Note we send the full list through ... which probably isn't the best thing to do !
        console.log("answer-store.js", "trigger ON_CHANGE");
        self.trigger(Messages.ANSWERS_CHANGE, self.answers);
        return true;
      }
    }); // some
  });

}

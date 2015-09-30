var Utils = {

  getMonthly: function(amount, frequency) {
		var multiplier = 1; // default to monthly
    var pcm = 0;
    var type = "";

    // for case insensitive match
    amount = parseFloat(amount);
    frequency = (frequency || "M");
    type = frequency.substr(0, 1).toUpperCase();

    switch (type) {
      case "Y": multiplier = 0.083333; break;
      case "Q": multiplier = 0.333333; break;
      case "M": multiplier = 1;        break;
      case "4": multiplier = 1.083333; break;
      case "W": multiplier = 4.33333;  break;
      case "F": multiplier = 2.166666; break;
      default:  multiplier = 1;
    }

    pcm = (amount * multiplier);

    if (isNaN(pcm)) {
      pcm = 0;
    }

    pcm = pcm.toFixed(2);

		return parseFloat(pcm);
	},


  commafy: function(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

};

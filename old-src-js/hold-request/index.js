const holdRequest = (seconds = 10) => {

	seconds = parseInt(seconds);

	if(seconds > 10){
		seconds = 10;
	}

	let current = new Date();
	let stopAt = new Date();
	stopAt.setSeconds(stopAt.getSeconds() + seconds);
	let stopAtTimestamp = stopAt.getTime();

	while(new Date().getTime() < stopAtTimestamp){
		let any = new Date().getTime();
	}

	return {
		start: current,
		stop: stopAt
	}

}

module.exports = {
	holdRequest
}

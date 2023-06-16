import table from './table/init';

/** app init class **/
class App {
	/** create app **/
	constructor() {
		this.init();
	}

	/** init other modules **/
	init() {
		window.addEventListener('load', () => {
			table();
		});
	}
}

new App();

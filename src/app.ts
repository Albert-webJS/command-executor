import { DirExecuter } from './commands/dir/dir.extcuter';
import { ConsoleLogger } from './out/console-logger/console-logger';

export class App {
	async run() {
		new DirExecuter(ConsoleLogger.getInstance()).executer();
	}
}

const app = new App();
app.run();
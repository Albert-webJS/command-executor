import { ChildProcessWithoutNullStreams } from "child_process";
import { StreamLogger } from "../handlers/stream-logger.interface";
import { CommandExe } from "./command.types";

export abstract class CommandExecuter<Input> {
    constructor(private logger: StreamLogger) { }

    public async executer() {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = this.spawn(command);
        this.processStream(stream, this.logger);
    }

    protected abstract prompt(): Promise<Input>;
    protected abstract build(input: Input): CommandExe;
    protected abstract spawn(command: CommandExe): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLogger): void;
}
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecuter } from '../../core/executor/command.executor';
import { FileService } from '../../core/files/file.service';
import { StreamLogger } from '../../core/handlers/stream-logger.interface';
import { StreamHandler } from '../../core/handlers/stream.handler';
import { PromptService } from '../../core/prompt/prompt.service';
import { FfmpegBuilder } from './ffmpeg.builder';
import { CommandExecuterFfmpeg, FfmpegInput } from './ffmpeg.types';

export class FfmpegExecutor extends CommandExecuter<FfmpegInput> {
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: StreamLogger) {
        super(logger);
    }

    protected async prompt(): Promise<FfmpegInput> {
        const width = await this.promptService.input<number>('Ширина', 'number');
        const height = await this.promptService.input<number>('Высота', 'number');
        const path = await this.promptService.input<string>('Путь до файла', 'input');
        const name = await this.promptService.input<string>('Имя', 'input');
        return { width, height, path, name };
    }

    protected build({ width, height, path, name }: FfmpegInput): CommandExecuterFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new FfmpegBuilder)
            .input(path)
            .setVideoSize(width, height)
            .output(output);
        return { command: 'ffmpeg', args, output };
    }

    protected spawn({ output, command: commmand, args }: CommandExecuterFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(output);
        return spawn(commmand, args);
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }
}
import { CommandExe } from '../../core/executor/command.types';

export interface FfmpegInput {
    width: number;
    height: number;
    path: string;
    name: string
}

export interface CommandExecuterFfmpeg extends CommandExe {
    output: string;
}
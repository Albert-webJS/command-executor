export interface StreamLogger {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
    end(): void;
}
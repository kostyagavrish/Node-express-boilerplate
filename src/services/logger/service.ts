export class LoggerService {
  constructor() {}
  private static getUTCString() {
    return new Date().toUTCString();
  }
  public error(...args: any[]) {
    console.error(
      `\n\u001b[31mError[${LoggerService.getUTCString()}]:\n  ${args.join(
        "\n  "
      )}\u001b[0m\n`
    );
  }
  public log(...args: any[]) {
    console.log(...args);
  }
  public warn(...args: any[]) {
    console.warn(...args);
  }
  public info(...args: any[]) {
    console.info(...args);
  }
}

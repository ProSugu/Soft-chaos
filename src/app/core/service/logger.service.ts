import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private logger: NGXLogger) {}

  public showTrace(message: string): void {
    this.logger.trace(message);
  }

  public showDebug(message: string): void {
    this.logger.debug(message);
  }

  public showInfo(message: string): void {
    this.logger.info(message);
  }

  public showWarn(message: string): void {
    this.logger.warn(message);
  }

  public showError(message: string): void {
    this.logger.error(message);
  }

  public showFatal(message: string): void {
    this.logger.fatal(message);
  }
}

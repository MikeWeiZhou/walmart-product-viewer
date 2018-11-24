import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * LoggerService.
 * 
 * Logs errors, warnings, or messages.
 */
export class LoggerService {

  /**
   * Constructor.
   */
  constructor() { }

  /**
   * Log error.
   * @param tag for grouping this error
   * @param msg to log
   */
  LogError(tag: string, msg: string, err: any) {
    console.error(`${tag} ERROR: ${msg}`);
    console.error(err);
  }

  /**
   * Log warning.
   * @param tag for grouping this warning
   * @param msg to log
   */
  LogWarning(tag: string, msg: string) {
    console.warn(`${tag} Warning: ${msg}`);
  }

  /**
   * Log message.
   * @param tag for grouping this message
   * @param msg to log
   */
  LogMessage(tag: string, msg: string) {
    console.log(`${tag} Message: ${msg}`);
  }
}

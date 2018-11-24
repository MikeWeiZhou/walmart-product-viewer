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
  LogError(tag: string, msg: string) {
    console.error(tag + ' ERROR:');
    console.error(msg);
  }

  /**
   * Log warning.
   * @param tag for grouping this warning
   * @param msg to log
   */
  LogWarning(tag: string, msg: string) {
    console.warn(tag + ' Warning:');
    console.warn(msg);
  }

  /**
   * Log message.
   * @param tag for grouping this message
   * @param msg to log
   */
  LogMessage(tag: string, msg: string) {
    console.log(tag + ' message:');
    console.log(msg);
  }
}

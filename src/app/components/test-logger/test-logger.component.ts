import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-test-logger',
  templateUrl: './test-logger.component.html',
  styleUrls: ['./test-logger.component.css']
})
/**
 * TestLoggerComponent.
 * 
 * Tests LoggerService functionality.
 */
export class TestLoggerComponent implements OnInit {

  // Logger Service
  private mLogger: LoggerService;

  /**
   * Constructor.
   * @param logger LoggerService
   */
  constructor(logger: LoggerService) {
    this.mLogger = logger;
  }

  /**
   * On Angular Initialization.
   * Called after object is constructed.
   */
  ngOnInit() {
    this.mLogger.LogError('ErrorTag', 'This is an error.', { err: 'ErrorObject' });
    this.mLogger.LogWarning('WarningTag', 'This is a warning.');
    this.mLogger.LogMessage('MessageTag', 'This is a message.');
  }
}

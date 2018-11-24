import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-test-logger',
  templateUrl: './test-logger.component.html',
  styleUrls: ['./test-logger.component.css']
})
export class TestLoggerComponent implements OnInit {

  private mLogger: LoggerService;

  /**
   * Constructor.
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

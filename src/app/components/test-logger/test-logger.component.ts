import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-test-logger',
  templateUrl: './test-logger.component.html',
  styleUrls: ['./test-logger.component.css']
})
export class TestLoggerComponent implements OnInit {

  private logger: LoggerService;

  /**
   * Constructor.
   */
  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  /**
   * On Angular Initialization.
   * Called after object is constructed.
   */
  ngOnInit() {
    this.logger.LogError('ErrorTag', 'This is an error.');
    this.logger.LogWarning('WarningTag', 'This is a warning.');
    this.logger.LogMessage('MessageTag', 'This is a message.');
  }

}

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataService } from './data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { Logger, Options } from "angular2-logger/core";
// import { CustomLoggerOptions } from '../classes/custom-logger-options/custom-logger-options';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule, NgIdleKeepaliveModule.forRoot()],
      providers: [
        DataService,
        { provide: Options },
        // , useClass: CustomLoggerOptions
        Logger,]
    });
  });

  it('should ...', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});

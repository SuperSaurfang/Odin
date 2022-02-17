import { InjectionToken } from '@angular/core';
import { environment } from './environment';
import { IEnvironemnt } from './iEnvironment';

export const ENV = new InjectionToken<string>('env');

export function getEnv(): IEnvironemnt {
  return environment;
}

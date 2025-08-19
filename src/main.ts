import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element/bundle';
// import { register as registerSwiperElement } from 'swiper/element-bundle';

register();
// registerSwiperElement();
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutsModule } from './core/layouts.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    AppRoutingModule,
    CoreModule,
    LayoutsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

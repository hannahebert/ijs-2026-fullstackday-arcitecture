import { Component } from '@angular/core';
import { GodComponent } from './god/god.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GodComponent],
  template: `<main style="padding: 2rem"><app-god /></main>`,
})
export class AppComponent {}

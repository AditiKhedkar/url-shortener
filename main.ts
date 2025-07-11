import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { UrlListComponent } from './components/url-list/url-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UrlFormComponent, UrlListComponent],
  template: `
    <div class="container">
      <div class="card">
        <h1 class="title">URL Shortener</h1>
        <p class="subtitle">Make long URLs short and easy to share</p>
        
        <app-url-form (urlShortened)="onUrlShortened()"></app-url-form>
        
        <div class="success-message" *ngIf="showSuccess">
          ✓ URL shortened successfully!
        </div>
      </div>

      <div class="card">
        <app-url-list></app-url-list>
      </div>
    </div>
  `
})
export class App {
  showSuccess = false;

  onUrlShortened(): void {
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }
}

bootstrapApplication(App);
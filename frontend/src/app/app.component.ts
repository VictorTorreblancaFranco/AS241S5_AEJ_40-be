import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="app-container">
      <nav class="navbar">
        <div class="nav-brand">
          <h1>🤖 AI Integration Platform</h1>
          <p class="subtitle">Spring WebFlux + MongoDB + APIs IA</p>
        </div>
        <div class="nav-links">
          <a routerLink="/text-to-image" routerLinkActive="active">🎨 Generar Imagen</a>
          <a routerLink="/instagram-transcript" routerLinkActive="active">📹 Transcript Instagram</a>
          <a routerLink="/logs" routerLinkActive="active">📊 Historial</a>
        </div>
      </nav>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
      <footer class="footer">
        <p>🚀 Backend: Spring WebFlux | 📦 MongoDB Cloud | 🎯 APIs: Text-to-Image + Instagram Transcript</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container { min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .navbar { background: rgba(26, 26, 46, 0.95); color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; backdrop-filter: blur(10px); }
    .nav-brand h1 { margin: 0; font-size: 1.5rem; }
    .subtitle { margin: 0; font-size: 0.8rem; opacity: 0.8; }
    .nav-links { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .nav-links a { color: white; text-decoration: none; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s; font-weight: 500; }
    .nav-links a:hover, .nav-links a.active { background: rgba(255,255,255,0.2); transform: translateY(-2px); }
    .content { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .footer { background: rgba(26, 26, 46, 0.95); color: white; text-align: center; padding: 1rem; margin-top: 2rem; font-size: 0.8rem; }
    @media (max-width: 768px) {
      .navbar { flex-direction: column; text-align: center; }
      .content { padding: 1rem; }
    }
  `]
})
export class AppComponent {
  title = 'aej-frontend';
}

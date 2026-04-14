import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-instagram-transcript',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>📹 Transcriptor de Videos de Instagram</h2>
      
      <div class="form-group">
        <label>URL del Video de Instagram:</label>
        <input type="text" [(ngModel)]="videoUrl" 
               placeholder="https://www.instagram.com/reel/xxxxx">
      </div>

      <div class="form-group">
        <label>Idioma (opcional):</label>
        <select [(ngModel)]="language">
          <option value="">Automático</option>
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="pt">Portugués</option>
        </select>
      </div>

      <button (click)="getTranscript()" [disabled]="loading">
        {{ loading ? 'Obteniendo...' : 'Obtener Transcript' }}
      </button>

      <div *ngIf="error" class="error">{{ error }}</div>

      <div *ngIf="transcript" class="results">
        <h3>Transcript:</h3>
        <div class="transcript-box">
          <p>{{ transcript }}</p>
        </div>
        
        <div *ngIf="segments.length > 0">
          <h4>Segmentos:</h4>
          <ul>
            <li *ngFor="let segment of segments">{{ segment }}</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    button { background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
    button:disabled { background: #ccc; }
    .error { color: red; margin-top: 10px; padding: 10px; background: #ffe6e6; border-radius: 4px; }
    .results { margin-top: 20px; }
    .transcript-box { background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 10px; }
    .transcript-box p { margin: 0; line-height: 1.6; }
    ul { margin-top: 10px; padding-left: 20px; }
    li { margin: 5px 0; }
  `]
})
export class InstagramTranscriptComponent {
  videoUrl = '';
  language = '';
  loading = false;
  error = '';
  transcript = '';
  segments: string[] = [];

  constructor(private apiService: ApiService) {}

  getTranscript() {
    if (!this.videoUrl.trim()) {
      this.error = 'Por favor ingresa una URL de Instagram';
      return;
    }

    this.loading = true;
    this.error = '';
    this.transcript = '';
    this.segments = [];

    this.apiService.getTranscript({ videoUrl: this.videoUrl, language: this.language }).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.transcript = response.data.transcript || 'No se encontró transcript';
          this.segments = response.data.segments || [];
        } else {
          this.error = response.message || 'Error al obtener transcript';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión con el servidor. ¿El backend está corriendo en puerto 8080?';
        this.loading = false;
      }
    });
  }
}

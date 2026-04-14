import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-text-to-image',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>🎨 Generador de Imágenes con IA</h2>
      
      <div class="form-group">
        <label>Prompt:</label>
        <textarea [(ngModel)]="prompt" rows="3" placeholder="Describe la imagen que quieres generar"></textarea>
      </div>

      <button (click)="generateImage()" [disabled]="loading">
        {{ loading ? 'Generando...' : 'Generar Imagen' }}
      </button>

      <!-- Mostrar mensaje de éxito temporal -->
      <div *ngIf="successMessage" class="success">{{ successMessage }}</div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <!-- Mostrar imágenes generadas -->
      <div *ngIf="images.length > 0" class="results">
        <h3>🎉 Imágenes Generadas ({{ images.length }})</h3>
        <div class="image-grid">
          <div *ngFor="let img of images; let i = index" class="image-card">
            <img [src]="img" [alt]="'Imagen ' + (i+1)" (error)="onImageError(img, i)">
            <div class="image-actions">
              <button class="btn-download" (click)="downloadImage(img, i+1)">
                📥 Descargar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Depuración: Mostrar la respuesta completa -->
      <div *ngIf="debugResponse" class="debug">
        <details>
          <summary>🔧 Respuesta de la API (click para ver)</summary>
          <pre>{{ debugResponse | json }}</pre>
        </details>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; color: #333; }
    textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; resize: vertical; }
    button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; width: 100%; }
    button:disabled { background: #ccc; cursor: not-allowed; }
    .error { color: red; margin-top: 10px; padding: 10px; background: #ffe6e6; border-radius: 5px; }
    .success { color: green; margin-top: 10px; padding: 10px; background: #e6ffe6; border-radius: 5px; }
    .results { margin-top: 30px; }
    .results h3 { color: #333; margin-bottom: 15px; }
    .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 15px; }
    .image-card { background: #f8f9fa; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.3s; }
    .image-card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
    .image-card img { width: 100%; height: 200px; object-fit: cover; cursor: pointer; }
    .image-actions { display: flex; gap: 10px; padding: 10px; }
    .btn-download { flex: 1; padding: 8px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; }
    .btn-download:hover { background: #218838; }
    .debug { margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 5px; font-size: 12px; }
    .debug pre { overflow-x: auto; }
  `]
})
export class TextToImageComponent {
  prompt = '';
  loading = false;
  error = '';
  successMessage = '';
  images: string[] = [];
  debugResponse: any = null;

  constructor(private apiService: ApiService) {}

  generateImage() {
    if (!this.prompt.trim()) {
      this.error = 'Por favor ingresa un prompt';
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';
    this.images = [];
    this.debugResponse = null;

    const request = {
      prompt: this.prompt,
      styleId: 4,
      size: "1-1"
    };

    this.apiService.generateImage(request).subscribe({
      next: (response) => {
        console.log('Respuesta completa:', response);
        this.debugResponse = response;
        
        if (response.success && response.data) {
          this.successMessage = response.message || 'Imagen generada exitosamente';
          
          // Extraer las URLs de las imágenes
          if (response.data.images && Array.isArray(response.data.images)) {
            this.images = response.data.images;
            console.log('Imágenes encontradas:', this.images.length);
          } else {
            console.warn('No se encontraron imágenes en la respuesta:', response.data);
            this.error = 'La API respondió pero no devolvió URLs de imágenes';
          }
        } else {
          this.error = response.message || 'Error al generar la imagen';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error de conexión:', err);
        this.error = 'Error de conexión con el backend';
        this.loading = false;
      }
    });
  }

  downloadImage(imageUrl: string, index: number) {
    window.open(imageUrl, '_blank');
  }

  onImageError(imageUrl: string, index: number) {
    console.error(`Error cargando imagen ${index + 1}: ${imageUrl}`);
  }
}

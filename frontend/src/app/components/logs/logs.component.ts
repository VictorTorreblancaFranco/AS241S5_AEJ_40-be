import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>📊 Historial de Consultas</h2>
      
      <div class="filter">
        <label>Filtrar por API:</label>
        <select [(ngModel)]="selectedApi" (change)="loadLogs()">
          <option value="">Todas</option>
          <option value="Text to Image Generator">🎨 Text to Image</option>
          <option value="Instagram Video Transcript">📹 Instagram Transcript</option>
        </select>
        <button (click)="loadLogs()" class="refresh">🔄 Refrescar</button>
      </div>

      <div *ngIf="loading" class="loading">Cargando...</div>
      
      <div *ngIf="error" class="error">{{ error }}</div>

      <div *ngIf="logs.length === 0 && !loading" class="empty">
        No hay consultas registradas. Prueba generando una imagen o transcript primero.
      </div>

      <div *ngIf="logs.length > 0" class="logs-list">
        <div *ngFor="let log of logs" class="log-card">
          <div class="log-header">
            <strong>{{ log.apiName }}</strong>
            <span class="status" [class.success]="log.status === 'SUCCESS'" 
                                 [class.error]="log.status === 'ERROR'">
              {{ log.status }}
            </span>
          </div>
          <div class="log-date">{{ log.callTime | date:'medium' }}</div>
          <details>
            <summary>📋 Ver detalles completos</summary>
            <div class="log-details">
              <h4>📤 Request:</h4>
              <pre>{{ log.requestData | json }}</pre>
              <h4>📥 Response:</h4>
              <pre>{{ log.responseData | json }}</pre>
              <div *ngIf="log.errorMessage" class="error-message">
                <strong>❌ Error:</strong> {{ log.errorMessage }}
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 900px; margin: 0 auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .filter { margin-bottom: 20px; display: flex; gap: 10px; align-items: center; }
    .filter select { padding: 8px; border: 1px solid #ddd; border-radius: 4px; flex: 1; }
    .refresh { background: #6c757d; color: white; padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; }
    .log-card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; transition: box-shadow 0.3s; }
    .log-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .log-header { display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center; }
    .status { padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
    .status.success { background: #d4edda; color: #155724; }
    .status.error { background: #f8d7da; color: #721c24; }
    .log-date { color: #666; font-size: 12px; margin-bottom: 10px; }
    details { cursor: pointer; }
    summary { font-weight: bold; margin: 10px 0; }
    .log-details { background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 10px; }
    .log-details pre { margin: 5px 0; padding: 10px; background: white; border-radius: 4px; overflow-x: auto; font-size: 12px; }
    .error-message { color: #dc3545; margin-top: 10px; padding: 10px; background: #f8d7da; border-radius: 4px; }
    .loading { text-align: center; padding: 40px; color: #666; }
    .empty { text-align: center; padding: 40px; color: #666; background: #f8f9fa; border-radius: 8px; }
    h4 { margin: 10px 0 5px 0; color: #495057; }
  `]
})
export class LogsComponent implements OnInit {
  logs: any[] = [];
  loading = false;
  error = '';
  selectedApi = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.loading = true;
    this.error = '';
    
    const request = this.selectedApi 
      ? this.apiService.getLogsByApiName(this.selectedApi)
      : this.apiService.getAllLogs();

    request.subscribe({
      next: (response) => {
        if (response.success) {
          this.logs = response.data || [];
        } else {
          this.error = response.message || 'Error al cargar logs';
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

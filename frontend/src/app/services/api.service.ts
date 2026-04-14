import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TextToImageRequest {
  prompt: string;
  styleId?: number;
  size?: string;
  negativePrompt?: string;
  numImages?: number;
}

export interface InstagramTranscriptRequest {
  videoUrl: string;
  language?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/v1/ai';

  constructor(private http: HttpClient) {}

  generateImage(request: TextToImageRequest): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/generate-image`, request);
  }

  getTranscript(request: InstagramTranscriptRequest): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/instagram-transcript`, request);
  }

  getAllLogs(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/logs`);
  }

  getLogsByApiName(apiName: string): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/logs/${apiName}`);
  }
}

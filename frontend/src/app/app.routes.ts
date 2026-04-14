import { Routes } from '@angular/router';
import { TextToImageComponent } from './components/text-to-image/text-to-image.component';
import { InstagramTranscriptComponent } from './components/instagram-transcript/instagram-transcript.component';
import { LogsComponent } from './components/logs/logs.component';

export const routes: Routes = [
  { path: 'text-to-image', component: TextToImageComponent },
  { path: 'instagram-transcript', component: InstagramTranscriptComponent },
  { path: 'logs', component: LogsComponent },
  { path: '', redirectTo: '/text-to-image', pathMatch: 'full' }
];

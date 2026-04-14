import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramTranscriptComponent } from './instagram-transcript.component';

describe('InstagramTranscriptComponent', () => {
  let component: InstagramTranscriptComponent;
  let fixture: ComponentFixture<InstagramTranscriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstagramTranscriptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstagramTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

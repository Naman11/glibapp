  /*==================== loading all the files we need ================================*/
  import { async, ComponentFixture, TestBed } from '@angular/core/testing';
  import { VideoCallComponent } from './video-call.component';

  /*=================== test suite for video call component ==============================
  */describe('VideoCallComponent', () => {
    let component: VideoCallComponent;
    let fixture: ComponentFixture<VideoCallComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ VideoCallComponent ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(VideoCallComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    /*=================== test case that the component exists ==============================*/
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });

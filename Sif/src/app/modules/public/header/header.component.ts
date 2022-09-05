import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WindowsScrollService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isFixed = false;

  @ViewChild('navMenu', { static: true }) 
  public navElement: ElementRef;
  
  private subscription: Subscription

  constructor(private windowsScrollService: WindowsScrollService) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.windowsScrollService.scrolled().subscribe(event => {
      this.isFixed = event.scrollY >= this.navElement.nativeElement.offsetTop;
    });
  }

}

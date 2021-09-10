import { NavService } from './../../../services/nav.service';
import { Component, OnInit } from '@angular/core';
import { NavOptions } from 'src/app/social-network/app-models/nav-options.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private navService: NavService) { }

  toggleNavOptions(
    option: 'messages' | 'notifications' | 'friends' | 'search'
  ) {
    switch (option) {
      case 'messages':
        this.navService.setNavOption(NavOptions.messages);
        break;
      case 'notifications':
        this.navService.setNavOption(NavOptions.notifications);
        break;
      case 'friends':
        this.navService.setNavOption(NavOptions.friends);
        break;
      case 'search':
        this.navService.setNavOption(NavOptions.search);
        break;
      default:
        return;
    }
  }
  ngOnInit(): void {
  }

}

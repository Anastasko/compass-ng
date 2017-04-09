import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuItems = [{
    text: 'About',
    link: '/about'
  }, {
    text: 'Places',
    link: '/places'
  }, {
    text: 'Buildings',
    link: '/buildings'
  }, {
    text: 'Contact',
    link: '/contact'
  }
  ]

  constructor() { }

  ngOnInit() {
  }

}

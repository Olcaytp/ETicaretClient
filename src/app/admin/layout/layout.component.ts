import { Component, OnInit } from '@angular/core';

// declare var alertify: any; 1.0

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // alertify.success('Hello'); 1.0
  }

}

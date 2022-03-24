import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  panelOpenState = false;

  isExpanded: boolean=false;
  expan: boolean=false;
  expanPersona: boolean=false;
  expanVenta: boolean=false;
  expanroles: boolean=false;
  
  constructor() { }

  ngOnInit(): void {
  }

}

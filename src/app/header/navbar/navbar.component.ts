import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	@Input() title!: string;
	//@Output() dataFromChild = new EventEmitter<string>();

	constructor() {}

	ngOnInit() {}

	/*sendData() {
    this.dataFromChild.emit('Hello from Child!');
  }*/
}

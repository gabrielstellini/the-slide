import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-instructions',
    templateUrl: './instructions.component.html',
    styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

    public address = "http://[your pc ip address]/mobile/mobile-page.html";

    constructor() { }

    ngOnInit() {
        this.getIP();
    }

    getIP() {
    }

}
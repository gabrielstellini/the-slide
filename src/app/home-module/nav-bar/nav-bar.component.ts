import { Component, OnInit } from '@angular/core';
import {LocalUserService} from "../../shared/api/local-user.service";


@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    providers: [LocalUserService]
})
export class NavBarComponent implements OnInit {

    constructor(private localService:LocalUserService) { }

    ngOnInit() {
    }

    logout(){
        this.localService.removeCurrentUser();
    }
}

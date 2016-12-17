import {Component, OnInit} from '@angular/core';
import {LocalUserService} from "../../shared/api/local-user.service";
import {ColumnAttrib} from "./ColumnAttrib";
let $ = require('../../../../node_modules/jquery/dist/jquery.min.js');

@Component({
    selector: 'app-scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.scss'],
    providers: [LocalUserService]
})

export class ScoresComponent implements OnInit {

    private tableAttrib: Array<ColumnAttrib>;

    constructor(private localService:LocalUserService) {
         this.tableAttrib = this.getUserData();
    }

    ngOnInit() {

    }

    getUserData():Array<ColumnAttrib>{

        let result:Array<ColumnAttrib> = [];


        let length = this.localService.getLastUserID();


        for(let i=0;i<length;i++){
            let tempUser = this.localService.getUser(i.toString());
            let tempColumnAttrib:ColumnAttrib = <ColumnAttrib>{};
            tempColumnAttrib.username = tempUser.username;
            tempColumnAttrib.score = tempUser.score;

            result.push(tempColumnAttrib);
        }


        return result;

    }

}

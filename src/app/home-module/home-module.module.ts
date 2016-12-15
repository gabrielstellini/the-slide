import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructionsComponent } from './instructions/instructions.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {HomeModuleComponent} from "./home-module.component";
import { ScoresComponent } from './scores/scores.component';
import { GameComponent } from './game/game.component';
import { UsersComponent } from './users/users.component';
import {SharedModule} from "../shared/shared.module";
import {RevieveAccelDataService} from "./services/revieve-accel-data.service";
import { CreditsComponent } from './credits/credits.component';
import {homeRoutes} from "./home.routes";
import {RouterModule} from "@angular/router";
import { WinScreenComponent } from './game/win-screen/win-screen.component';
import { LoseScreenComponent } from './game/lose-screen/lose-screen.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(homeRoutes)
    ],
    declarations: [
        InstructionsComponent,
        NavBarComponent,
        HomeModuleComponent,
        InstructionsComponent,
        ScoresComponent,
        GameComponent,
        UsersComponent,
        CreditsComponent,
        WinScreenComponent,
        LoseScreenComponent
    ],
    providers: [
        RevieveAccelDataService
    ]
})
export class HomeModuleModule { }
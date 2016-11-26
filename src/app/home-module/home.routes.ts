import {Routes, RouterModule} from "@angular/router";
import {CreditsComponent} from "./credits/credits.component";
import {GameComponent} from "./game/game.component";
import {InstructionsComponent} from "./instructions/instructions.component";

export const homeRoutes : Routes = [
    {path: 'home',component: GameComponent},
    {path: 'instructions', component:InstructionsComponent},
    {path: 'credits', component:CreditsComponent}
];
import {Routes, RouterModule} from "@angular/router";
import {GameComponent} from "./game/game.component";
import {InstructionsComponent} from "./instructions/instructions.component";
import {ScoresComponent} from "./scores/scores.component";

export const homeRoutes : Routes = [
    {path: 'home',component: GameComponent},
    {path: 'instructions', component:InstructionsComponent},
    {path: 'scores', component:ScoresComponent}
];
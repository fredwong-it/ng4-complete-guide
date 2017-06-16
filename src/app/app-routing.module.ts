import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';

const appRoute: Routes = [
    { path: '', component: RecipesComponent },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: ':id', component: RecipeItemComponent }
    ]},
    { path: 'shopping-list', component: ShoppingListComponent}
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
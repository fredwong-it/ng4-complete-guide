import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const appRoute: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent },    
        { path: ':id/edit', component: RecipeEditComponent }    
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
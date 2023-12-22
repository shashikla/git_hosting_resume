import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PlaneTemplateComponent } from './plane-template/plane-template.component';
import { FormResumeComponent } from './form-resume/form-resume.component';
import { DemoFormValidationComponent } from './demo-form-validation/demo-form-validation.component';




const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path : 'details/:name/:id', component: PlaneTemplateComponent,
  },
  {
    path : 'resume-card/:name', component: ResumeComponent
  },
  {
    // path : 'submit-data', component: FormResumeComponent
    path : 'submit-data', component: DemoFormValidationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

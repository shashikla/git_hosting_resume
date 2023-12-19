import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PlaneTemplateComponent } from './plane-template/plane-template.component';
import { FormResumeComponent } from './form-resume/form-resume.component';




const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path : 'details/:id', component: PlaneTemplateComponent
  },
  {
    path : 'resume-card/:name', component: ResumeComponent
  },
  {
    path : 'submit-data', component: FormResumeComponent
    // path : 'submit-data/:name', component: FormResumeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

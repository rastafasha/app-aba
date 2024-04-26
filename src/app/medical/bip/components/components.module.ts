import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BipformComponent } from './bipform/bipform.component';
import { ReductionGoalFormComponent } from './reduction-goal-form/reduction-goal-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ChartReductionComponent } from './charts/chart-reduction/chart-reduction.component';
import { FamilyInvolvementGoalFormComponent } from './family-involvement-goal-form/family-involvement-goal-form.component';
import { MonitoringEvaluatingComponent } from './monitoring-evaluating/monitoring-evaluating.component';
import { BehaviorAssistantComponent } from './behavior-assistant/behavior-assistant.component';
import { GeneralizationTrainingComponent } from './generalization-training/generalization-training.component';
import { CrisisPlanComponent } from './crisis-plan/crisis-plan.component';
import { DeEscalationTecniquesComponent } from './de-escalation-tecniques/de-escalation-tecniques.component';
import { ConsentTreatmentFormComponent } from './consent-treatment-form/consent-treatment-form.component';
import { SustitutionListComponent } from './sustitution-list/sustitution-list.component';
import { ChartReplacementComponent } from './charts/chart-replacement/chart-replacement.component';


@NgModule({
  declarations: [
    BipformComponent,
    ReductionGoalFormComponent,
    FamilyInvolvementGoalFormComponent,
    MonitoringEvaluatingComponent,
    BehaviorAssistantComponent,
    GeneralizationTrainingComponent,
    CrisisPlanComponent,
    DeEscalationTecniquesComponent,
    ConsentTreatmentFormComponent,
    SustitutionListComponent,
    ChartReductionComponent,
    ChartReplacementComponent,
  ],
  exports: [
    BipformComponent,
    ReductionGoalFormComponent,
    FamilyInvolvementGoalFormComponent,
    MonitoringEvaluatingComponent,
    BehaviorAssistantComponent,
    GeneralizationTrainingComponent,
    CrisisPlanComponent,
    DeEscalationTecniquesComponent,
    ConsentTreatmentFormComponent,
    SustitutionListComponent,
    ChartReductionComponent,
    ChartReplacementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    
  ]
})
export class ComponentsModule { }

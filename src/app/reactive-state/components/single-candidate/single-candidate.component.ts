import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(private candidateService: CandidateService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.initObservables();
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates');
  }

  onRefuse() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidateService.refuseCandidat(candidate.id);
        this.onGoBack();
      })
    ).subscribe();
  }

  onHire() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidateService.hireCandidat(candidate.id);
        this.onGoBack();
      })
    ).subscribe();
  }

  private initObservables() {
    this.loading$ = this.candidateService.loading$;
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candidateService.getCandidateById(+params['id']))
    );
  }

}

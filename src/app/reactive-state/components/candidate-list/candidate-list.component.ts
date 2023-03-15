import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {

  loading$!: Observable<boolean>;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.loading$ = this.candidateService.loading$;
  }

}

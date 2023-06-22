import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCandidateComponent implements OnInit {
  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.loading$ = this.candidateService.loading$;
    this.candidate$ = this.route.params.pipe(
      switchMap((params) =>
        this.candidateService.getCandidateById(+params['id'])
      )
    );
  }

  onHire() {
    this.candidate$
      .pipe(
        take(1),
        tap((candidate) => {
          this.candidateService.hireCandidate(candidate.id);
          this.onGoBack();
        })
      )
      .subscribe();
  }

  onRefuse() {
    this.candidate$
      .pipe(
        take(1),
        tap((candidate) => {
          this.candidateService.refuseCandidate(candidate.id);
          this.onGoBack();
        })
      )
      .subscribe();
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates');
  }
}

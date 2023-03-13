import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Observable, of, tap } from 'rxjs';
import { News } from '../../../shared/model/news.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsList$: Observable<News[]> = of([]);
  array: any = 'text'

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.loadData().subscribe();
  }

  loadData() {
    return this.dataService.getNewsList().pipe(
      tap(data => {
        this.newsList$ = of(data);
      })
    );
  }

  onEditNews(item: News) {
    this.router.navigate(['new-news'], {
      state: item,
    });
    }

  deleteNewses() {
    this.dataService.deleteNewses().subscribe();
  }
}

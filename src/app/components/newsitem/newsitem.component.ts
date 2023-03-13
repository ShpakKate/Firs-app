import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Observable, of, switchMap, tap } from 'rxjs';
import { News } from '../../../shared/model/news.model';

@Component({
  selector: 'app-newsitem',
  templateUrl: './newsitem.component.html',
  styleUrls: ['./newsitem.component.scss'],
})
export class NewsitemComponent implements OnInit {
  @Input() item!: News;
  @Input() arr!: any;
  @Output() editClick = new EventEmitter();
  newsList$: Observable<News[]> = of([]);
  shortNews = true;
  btnName = 'Show full news';
  abbreviatedNotation!: string | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData().subscribe();
    this.abbreviatedNotation = this.item?.full?.slice(0, 40);
  }

  loadData() {
    return this.dataService.getNewsList().pipe(
      tap(data => {
        this.newsList$ = of(data);
      })
    );
  }

  get news() {
    return this.shortNews ? `${this.abbreviatedNotation}...` : this.item.full;
  }

  toggleFull() {
    this.shortNews = !this.shortNews;
    this.btnName = this.shortNews ? 'Show full news' : 'Show short news';
  }

  hidingBtn() {
    return this.abbreviatedNotation !== this.item.full;
  }

  deleteNews(item: News) {
    this.newsList$
      .pipe(
        switchMap(() => this.dataService.deleteNews(item)),
        switchMap(() => this.loadData())
      )
      .subscribe();
  }

  onEditNews() {
    this.editClick.emit();
  }
}

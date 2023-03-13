import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../shared/model/user.model';
import { DeletingUserComponent } from '../deleting-user/deleting-user.component';
import { EditingUserDataComponent } from '../editing-user-data/editing-user-data.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss'],
})
export class ListOfUsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'username', 'role', 'password', 'symbol'];
  userList$: Observable<User[]> = of([]);
  dataSource!: MatTableDataSource<User>;
  notAdmin = false;
  usersLength!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private auth: AuthenticationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadData().subscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);

  }

  loadData() {
    return this.auth.getList().pipe(
      tap(data => {
        this.userList$ = of(data);
        this.dataSource = new MatTableDataSource(data)
        this.usersLength = data.length
        this.notAdmin = false;
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteUser(user: User) {
    if (user.username !== 'Admin') {
      const dialogRef = this.dialog.open(DeletingUserComponent, { data: {} });

      dialogRef
        .afterClosed()
        .pipe(
          switchMap(confirmed => (confirmed ? this.auth.deleteUser(user) : of(false))),
          switchMap(() => this.loadData())
        )
        .subscribe();
    } else {
      this.notAdmin = true;
    }
  }

  onEditUser(user: User) {
    if (user.username !== 'Admin') {
      const dialogRef = this.dialog.open(EditingUserDataComponent, { data: user });

      dialogRef
        .afterClosed()
        .pipe(
          switchMap(data => {
            return this.auth.updateUser({
              ...user,
              username: data.username,
              password: data.password,
              role: data.role,
            });
          }),
          switchMap(() => this.loadData())
        )
        .subscribe();
    } else this.notAdmin = true;
  }
}

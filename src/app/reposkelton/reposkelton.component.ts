import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reposkelton',
  templateUrl: './reposkelton.component.html',
  styleUrls: ['./reposkelton.component.scss']
})
export class ReposkeltonComponent implements OnInit{
  @Input() loading: any;
  ngOnInit(): void {
  }
}

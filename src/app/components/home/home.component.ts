import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postsHome: Post[] = [];
  constructor() { }

  ngOnInit() {
  }

  //   ppppp=[
  //   {title:'Title 1',description:'Content 1'},
  //   {title:'Title 2',description:'Content 2'},
  //   {title:'Title 3',description:'Content 3'},
  // ];
}

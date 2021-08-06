import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  constructor() { }

  data = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
  ngOnInit(): void {
  }

}

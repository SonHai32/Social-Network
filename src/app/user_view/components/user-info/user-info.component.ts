import { UserService } from 'src/app/user_view/services/user.service';
import { User } from './../../models/user.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  user!: Observable<User>;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params =>{
      const id = params.get('id')
      if(id){
        this.user = this.userService.getUserInfo(id)
      }
    })
    this.route.queryParamMap.subscribe(res =>{
      if(!res.get('tab')){
        this.router.navigate([], {
          queryParams: {tab: 'overview'},
          queryParamsHandling: 'merge'
        })
      }
    })
  }

}

import { UserService } from 'src/app/social-network/services/user.service';
import { User } from 'src/app/social-network/models/user.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }
  userID!: string | null;
  user!: Observable<User>
  ngOnInit(): void {
    this.route.paramMap.subscribe((val) =>{
      const ID = val.get('id')
      if(ID){
        this.userID = val.get('id')
        this.user = this.userService.getUserInfo(ID)
      }
    })
  }

}

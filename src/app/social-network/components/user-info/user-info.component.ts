import { PostsService } from 'src/app/social-network/services/posts.service';
import { vmFromLatest } from 'src/app/social-network/utils/operators';
import { getUserSelector } from '../../store/auth/auth.selectors';
import { Subscription, Observable } from 'rxjs';
import { AppMessageAction } from '../../store/app-message/app-message.actions';
import { Store } from '@ngrx/store';
import { Hobby } from '../../models/hobby.model';
import { UserService } from 'src/app/social-network/services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user!: User;
  private subscription: Subscription = new Subscription();
  editHobbiesVisible: boolean = false;
  editGenderVisible: boolean = false;
  editBirthdayVisible: boolean = false;
  editPhoneNumberVisible: boolean = false;
  editEmailVisible: boolean = false;
  editFacebookVisible: boolean = false;
  editInstagramVisible: boolean = false;
  editTwitterVisible: boolean = false;
  editGithubVisible: boolean = false;
  editLinkedinVisible: boolean = false;
  isUpdating: boolean = false;
  isValueChange: boolean = false;
  isUserOverviewChange: boolean = false;
  isUserHobbiesChange: boolean = false;

  canEdit: boolean = false;

  hobbies: Hobby[] = [];
  backgroundColor: string = '#fd70a1';
  textColor: string = '#ffffff';
  textHobby: string = '';
  displayNameInputVisible: boolean = false;
  genderOption: string[] = ['Nam', 'Nữ', 'Khác'];
  genderSelected = this.genderOption[0];
  @ViewChild('displayNameInputRef') displayNameInputRef!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostsService,
    private router: Router,
    private store: Store,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.subscription.add(
          this.store.select(getUserSelector).subscribe((user) => {
            if (user) {
              this.canEdit = id === user.id;

            }
          })
        );
        this.subscription.add(
          this.userService
            .getUserInfo(id)
            .pipe()
            .subscribe((user) => {
              this.user = user;
              this.detector.detectChanges();
            })
        );
      }
    });
    this.route.queryParamMap.subscribe((res) => {
      if (!res.get('tab')) {
        this.router.navigate([], {
          queryParams: { tab: 'overview' },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  toggleEditHobbies() {
    this.editHobbiesVisible = !this.editHobbiesVisible;
  }

  handleColorPicker(color: string, handleType: 'text' | 'bg') {
    if (handleType === 'text') this.textColor = color;
    else this.backgroundColor = color;
  }

  hobbySumited() {
    if (this.textHobby.trim() !== '' && this.textHobby.length < 25) {
      this.user.hobbies = [
        ...(this.user.hobbies ? this.user.hobbies : []),
        {
          textHobby: this.textHobby,
          bgColor: this.backgroundColor,
          textColor: this.textColor,
        },
      ];
      this.setDefaultColor();
      this.toggleEditHobbies();
      this.isValueChange = true;
    } else {
      this.store.dispatch(
        AppMessageAction.SetAppMessage({
          message: 'Sở thích không thể bỏ trống hoặc vượt quá 25 kí tự',
          message_type: 'error',
        })
      );
    }
  }

  setDefaultColor() {
    this.backgroundColor = '#fd70a1';
    this.textColor = '#ffffff';
    this.textHobby = '';
  }

  handleEditClick(
    key:
      | 'displayName'
      | 'gender'
      | 'birthday'
      | 'phone'
      | 'email'
      | 'facebook'
      | 'instagram'
      | 'twitter'
      | 'github'
      | 'linkedin'
  ) {
    switch (key) {
      case 'displayName':
        this.displayNameInputVisible = !this.displayNameInputVisible;
        setTimeout(() => {
          this.displayNameInputRef.nativeElement.focus();
        }, 10);
        break;
      case 'gender':
        this.editGenderVisible = !this.editGenderVisible;
        break;
      case 'birthday':
        this.editBirthdayVisible = !this.editBirthdayVisible;
        break;
      case 'phone':
        this.editPhoneNumberVisible = !this.editPhoneNumberVisible;
        break;
      case 'email':
        this.editEmailVisible = !this.editEmailVisible;
        break;
      case 'facebook':
        this.editFacebookVisible = !this.editFacebookVisible;
        break;
      case 'instagram':
        this.editInstagramVisible = !this.editInstagramVisible;
        break;
      case 'twitter':
        this.editTwitterVisible = !this.editTwitterVisible;
        break;
      case 'github':
        this.editGithubVisible = !this.editGithubVisible;
        break;
      case 'linkedin':
        this.editLinkedinVisible = !this.editLinkedinVisible;
        break;
      default:
        return;
    }
  }

  handleInputChange(
    key:
      | 'facebook'
      | 'github'
      | 'instagram'
      | 'twitter'
      | 'linkedin'
      | 'displayName'
      | 'gender'
      | 'birthday'
      | 'phone'
      | 'email',
    event: any
  ) {
    this.isValueChange = true;
    switch (key) {
      case 'facebook':
        this.user.biolink = {
          ...this.user.biolink,
          facebook: event.target.value,
        };
        break;
      case 'github':
        this.user.biolink = {
          ...this.user.biolink,
          github: event.target.value,
        };
        break;
      case 'instagram':
        this.user.biolink = {
          ...this.user.biolink,
          instagram: event.target.value,
        };
        break;
      case 'twitter':
        this.user.biolink = {
          ...this.user.biolink,
          twitter: event.target.value,
        };
        break;
      case 'linkedin':
        this.user.biolink = {
          ...this.user.biolink,
          linkedin: event.target.value,
        };
        break;
      default:
        return;
    }
  }

  deleteHobby(i: number) {
    this.isValueChange = true;
    this.user.hobbies = this.user.hobbies?.filter((val, index) => {
      return index !== i;
    });
    // this.detector.detectChanges()
  }
  closeInput(
    key:
      | 'displayName'
      | 'gender'
      | 'birthday'
      | 'phone'
      | 'email'
      | 'facebook'
      | 'instagram'
      | 'twitter'
      | 'github'
      | 'linkedin'
  ) {
    switch (key) {
      case 'displayName':
        this.displayNameInputVisible = false;
        break;
      case 'gender':
        setTimeout(() => (this.editGenderVisible = false), 10);
        break;
      case 'birthday':
        this.editBirthdayVisible = false;
        break;
      case 'phone':
        this.editPhoneNumberVisible = false;
        break;
      case 'email':
        this.editEmailVisible = false;
        break;
      case 'facebook':
        this.editFacebookVisible = false;
        break;
      case 'instagram':
        this.editInstagramVisible = false;
        break;
      case 'twitter':
        this.editTwitterVisible = false;
        break;
      case 'github':
        this.editGithubVisible = false;
        break;
      case 'linkedin':
        this.editLinkedinVisible = false;
        break;
    }
  }

  updateSubmit(user: User) {
    if (user.hobbies) {
      user.hobbies = [...user.hobbies, ...this.hobbies];
    } else {
      user.hobbies = [...this.hobbies];
    }
    this.userService
      .updateUserData(user)
      .then(() => {
        this.hobbies = [];
        this.isValueChange = false;
        this.detector.detectChanges();
      })
      .then(() => (this.isUserHobbiesChange = false))
      .catch(() => (this.isUpdating = false));
  }
}

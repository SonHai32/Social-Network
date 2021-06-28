import { Post } from './../../models/post.model';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [
    {
      createdAt: '2021-06-24T22:09:56.622Z',
      name: 'Ms. Perry Walter',
      avatar: 'https://cdn.fakercloud.com/avatars/derienzo777_128.jpg',
      content:
        'Assumenda quia vero consequatur corrupti aut dolorem maxime veritatis. Sunt culpa aspernatur est rerum aspernatur est illo. Tempora molestiae esse ea. Nam quia quod quisquam dolorem. Accusantium consequatur blanditiis qui.\n \rSunt nobis ratione ut. Enim atque expedita. Officia voluptatem autem quia hic cumque rerum qui eligendi et.\n \rItaque aut in amet rem. Quaerat doloremque ullam consequatur illum aspernatur. Ut eum repellat laboriosam ex error incidunt occaecati voluptatum quaerat.',
      images: [

        {src: 'http://placeimg.com/640/480/fashion'},
        {src: 'http://placeimg.com/640/480/food'},
        {src: 'http://placeimg.com/640/480/animals'},
        {src: 'http://placeimg.com/640/480/people'},
        {src: 'http://placeimg.com/640/480/technics'},
      ],
      comments: [],
      id: '1',
    },
    {
      createdAt: '2021-06-24T15:15:23.395Z',
      name: 'Emilio Bogisich',
      avatar: 'https://cdn.fakercloud.com/avatars/joetruesdell_128.jpg',
      content:
        'Doloribus assumenda libero est est non sunt qui rerum in. In dolorem officia impedit perspiciatis. Dolorum quisquam sed eaque fuga maxime dolorum id nulla aperiam. Eius mollitia reiciendis. Alias ut qui fugit accusamus perferendis ea amet. Error doloribus ea sunt ducimus non nisi hic.\n \rIpsum hic vero consequatur voluptas quis. Corporis nulla cupiditate illo cum aut veritatis. Tempora reiciendis expedita.\n \rSed ea laudantium. Provident et ut est. Accusamus veniam tempora et quasi saepe iure est ab est. In et aliquam vel ipsa quo nisi quasi suscipit. Recusandae dolore quia non distinctio.',
      images: [
        {src: 'http://placeimg.com/640/480/technics'},
        {src: 'http://placeimg.com/640/480/technics'},
        {src: 'http://placeimg.com/640/480/technics'},
        {src: 'http://placeimg.com/640/480/technics'},
      ],
      comments: [],
      id: '2',
    },
    {
      createdAt: '2021-06-25T07:16:42.923Z',
      name: 'Bobbie Price',
      avatar: 'https://cdn.fakercloud.com/avatars/ipavelek_128.jpg',
      content:
        'Deserunt non laborum tenetur possimus. Vel ab unde iste optio vel autem hic at consectetur. Ut rerum iusto ut animi autem sit. Impedit dolor dolorem officiis voluptatem in provident. Molestiae illo sed delectus quia velit voluptas veniam.\n \rConsequuntur velit autem voluptatem. Quia ex ex. Vitae eligendi distinctio cupiditate. Voluptatem enim nemo ut laborum odio praesentium recusandae ea et. Explicabo dolore error et non officiis velit facilis eaque enim. Officiis consectetur labore doloremque quam voluptas quaerat voluptas adipisci qui.\n \rTenetur est voluptatibus. Quasi assumenda vero. Animi culpa ad in eligendi quia fugit. Nihil omnis et. Fugit et est maxime minima.',
      images: [
        {src: 'http://placeimg.com/640/480/technics'},
        {src: 'http://placeimg.com/640/480/technics'},
        {src: 'http://placeimg.com/640/480/technics'},
        {src: 'http://placeimg.com/640/480/technics'},
        {src: 'http://placeimg.com/640/480/technics'},
        {src: 'http://placeimg.com/640/480/technics'},
      ],
      comments: [],
      id: '3',
    },
    {
      createdAt: '2021-06-24T21:00:43.553Z',
      name: 'Guadalupe Hoeger',
      avatar: 'https://cdn.fakercloud.com/avatars/dhooyenga_128.jpg',
      content:
        'Perspiciatis est modi consequatur laborum dolores harum magni. Qui ut hic nulla dicta perspiciatis hic. A repellendus enim. Architecto totam qui magni sequi est. Ab quo sunt. Possimus nostrum aut mollitia modi aperiam fugiat harum qui expedita.\n \rOmnis laborum recusandae quibusdam dolores sed alias officiis. Non illum minima. Dicta sint porro expedita unde rerum.\n \rDelectus ducimus dolorem beatae perferendis incidunt at. Quia nesciunt ut. Necessitatibus aliquam ut ut maiores esse sapiente nam vel sint.',
      images: [
        {src: 'http://placeimg.com/640/480/technics'},
],
      comments: [],
      id: '4',
    },
    {
      createdAt: '2021-06-25T07:35:54.158Z',
      name: 'Caleb Harris',
      avatar: 'https://cdn.fakercloud.com/avatars/abelcabans_128.jpg',
      content:
        'Non ex aut vel voluptatem. Fugit commodi occaecati ad maiores sapiente ad illo. Quia tempora quam occaecati voluptatibus consequatur corrupti. Eos quidem fugiat minus et non.\n \rEt vel quasi eveniet est voluptatem qui enim voluptas. Atque repellat architecto omnis fugiat. Molestiae illum nihil amet placeat quos voluptatem laboriosam consectetur perferendis. Vel autem modi molestiae totam. Aspernatur incidunt eos similique omnis at. Nihil adipisci praesentium eum mollitia natus minus voluptate consequatur.\n \rSit architecto ratione qui. Ipsum sunt ut blanditiis id. Officia qui repellendus et et.',
      images: [{src: 'http://placeimg.com/640/480/technics'},],
      comments: [],
      id: '5',
    },
    {
      createdAt: '2021-06-24T19:24:50.600Z',
      name: 'Dr. Gregg Jast',
      avatar: 'https://cdn.fakercloud.com/avatars/mattdetails_128.jpg',
      content:
        'Sint iusto quia qui harum et autem dolorum blanditiis necessitatibus. Dolorum magni minus quas dolor quo. Molestias reprehenderit minus consectetur earum. Necessitatibus quas eos quis tempore.\n \rOdit nam suscipit ipsam quis voluptas quo voluptate molestias exercitationem. Laboriosam voluptatem quo. Harum illo soluta et explicabo eos. Saepe nihil a sequi provident tempore. Et reiciendis optio omnis enim eos sequi omnis. Doloremque quia sit error fugiat est consequatur consectetur minima sed.\n \rAnimi rem deserunt. Unde ea quae. Voluptas asperiores dolorum. Distinctio sunt ipsam vitae qui omnis ad omnis optio. Sit praesentium id ut iste voluptatem. Quo accusamus natus soluta tenetur rerum.',
      images: [{src: 'http://placeimg.com/640/480/technics'},],
      comments: [],
      id: '6',
    },
    {
      createdAt: '2021-06-25T09:39:42.116Z',
      name: 'Bryant Beatty',
      avatar: 'https://cdn.fakercloud.com/avatars/vaughanmoffitt_128.jpg',
      content:
        'Minus omnis eos quo. Omnis quos consequatur unde harum soluta sed. Voluptatem voluptatibus excepturi aut. Sed tempora animi eius accusamus. Dolorem nisi consequatur molestias. Accusantium eius iusto aperiam fugiat.\n \rVoluptas aut voluptatem vero molestiae quia ut ullam consequuntur nobis. Aliquid nulla exercitationem sunt voluptatem iste. Consequuntur nulla autem odit tempora dolorem et. Neque animi et doloremque vero consectetur. Deserunt nemo blanditiis.\n \rQui totam nulla laboriosam dolorem. Et dicta voluptas deserunt. At nulla et. Ut nostrum voluptas inventore.',
      images: [{src: 'http://placeimg.com/640/480/technics'},],
      comments: [],
      id: '7',
    },
    {
      createdAt: '2021-06-24T17:05:43.259Z',
      name: 'Kara Sauer',
      avatar: 'https://cdn.fakercloud.com/avatars/koridhandy_128.jpg',
      content:
        'Placeat perferendis quas odit. Sit et reprehenderit. Sed amet suscipit ut quis quia.\n \rEt quo ipsam atque. Vitae sed dolorem qui qui. Nihil voluptatibus reiciendis occaecati consequatur et quae labore. Sed commodi qui in culpa facere. Officiis quasi magnam.\n \rQui animi quis eaque modi dicta qui ipsam voluptatem et. Itaque ut aut. Quidem quia consequatur ut placeat sit exercitationem quo beatae. Et expedita unde quisquam impedit ut quam porro. Ut quia non.',
      images: [{src: 'http://placeimg.com/640/480/technics'},],
      comments: [],
      id: '8',
    },
  ];
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    // this.getAllPost()
  }

  // getAllPost(){
  //   this.postsService.getAllPosts().subscribe((posts: Post[]) =>{
  //     this.posts = posts
  //   })
  // }
}

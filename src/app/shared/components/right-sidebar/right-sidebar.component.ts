import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  public users: any[] = [
    {
      id: 0,
      name: 'Elana Jecno',
      status: 'In Meeting..',
      profile: 'assets/images/user/1.jpg',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 1,
      call: {
        status: '',
        date_time: ''
      }
    },
    {
      id: 1,
      name: 'Mark Jecno',
      status: 'Be the change',
      profile: 'assets/images/user/12.png',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '5 May, 4:40 PM'
      }
    },
    {
      id: 2,
      name: 'Aiden Chavez',
      status: 'Out is my favorite.',
      profile: 'assets/images/user/2.png',
      seen: 'Last Seen 3:55 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '6 May, 1:50 PM'
      }
    },
    {
      id: 3,
      name: 'Prasanth Anand',
      status: 'Change for anyone.',
      profile: 'assets/images/user/8.jpg',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'outgoing',
        date_time: '7 May, 9:40 PM'
      }
    },
    {
      id: 4,
      name: 'Venkata Satyamu',
      status: 'First bun like a sun.',
      profile: 'assets/images/user/4.jpg',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '7 May, 10:50 PM'
      }
    },
    {
      id: 5,
      name: 'Ginger Johnston',
      status: 'its my life. Mind it.',
      profile: 'assets/images/user/5.jpg',
      seen: 'Last Seen 5:55 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'outgoing',
        date_time: '7 May, 11:40 PM'
      }
    },
    {
      id: 6,
      name: 'Kori Thomas',
      status: 'status pending...',
      profile: 'assets/images/user/9.jpg',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'outgoing',
        date_time: '8 May, 9:15 AM'
      }
    },
    {
      id: 7,
      name: 'Marked Thomas',
      status: 'away from home',
      profile: 'assets/images/user/11.png',
      seen: 'Last Seen 1:55 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '8 May, 10:50 Am'
      }
    },
    {
      id: 8,
      name: 'Jaclin Thomas',
      status: 'Single..',
      profile: 'assets/images/user/10.jpg',
      seen: 'Last Seen 3:15 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '9 May, 11:50 PM'
      }
    }
  ];
  public searchUsers: any[] = [
    {
      id: 0,
      name: 'Elana Jecno',
      status: 'In Meeting..',
      profile: 'assets/images/user/1.jpg',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 1,
      call: {
        status: '',
        date_time: ''
      }
    },
    {
      id: 1,
      name: 'Mark Jecno',
      status: 'Be the change',
      profile: 'assets/images/user/12.png',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '5 May, 4:40 PM'
      }
    },
    {
      id: 2,
      name: 'Aiden Chavez',
      status: 'Out is my favorite.',
      profile: 'assets/images/user/2.png',
      seen: 'Last Seen 3:55 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '6 May, 1:50 PM'
      }
    },
    {
      id: 3,
      name: 'Prasanth Anand',
      status: 'Change for anyone.',
      profile: 'assets/images/user/8.jpg',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'outgoing',
        date_time: '7 May, 9:40 PM'
      }
    },
    {
      id: 4,
      name: 'Venkata Satyamu',
      status: 'First bun like a sun.',
      profile: 'assets/images/user/4.jpg',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '7 May, 10:50 PM'
      }
    },
    {
      id: 5,
      name: 'Ginger Johnston',
      status: 'its my life. Mind it.',
      profile: 'assets/images/user/5.jpg',
      seen: 'Last Seen 5:55 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'outgoing',
        date_time: '7 May, 11:40 PM'
      }
    },
    {
      id: 6,
      name: 'Kori Thomas',
      status: 'status pending...',
      profile: 'assets/images/user/9.jpg',
      seen: 'online',
      online: true,
      typing: false,
      authenticate: 0,
      call: {
        status: 'outgoing',
        date_time: '8 May, 9:15 AM'
      }
    },
    {
      id: 7,
      name: 'Marked Thomas',
      status: 'away from home',
      profile: 'assets/images/user/11.png',
      seen: 'Last Seen 1:55 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '8 May, 10:50 Am'
      }
    },
    {
      id: 8,
      name: 'Jaclin Thomas',
      status: 'Single..',
      profile: 'assets/images/user/10.jpg',
      seen: 'Last Seen 3:15 PM',
      online: false,
      typing: false,
      authenticate: 0,
      call: {
        status: 'incoming',
        date_time: '9 May, 11:50 PM'
      }
    }
  ];
  public notFound = false;
  public searchText: string;

  constructor() {
  }

  searchTerm(term: any) {
    if (!term) { return this.searchUsers = this.users; }
    term = term.toLowerCase();
    const user = [];
    this.users.filter(users => {
      if (users.name.toLowerCase().includes(term)) {
        user.push(users);
      }
    });
    this.checkSearchResultEmpty(user);
    this.searchUsers = user;
  }

  checkSearchResultEmpty(user) {
    if (!user.length) {
      this.notFound = true;
    }
    else {
      this.notFound = false;
    }
  }

  ngOnInit() {
  }

}

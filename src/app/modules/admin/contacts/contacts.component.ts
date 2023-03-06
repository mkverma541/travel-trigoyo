import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public contactList :any;
  constructor(private userService: UsersService) { }

  ngOnInit() {

    this.userService.contactList().subscribe(res => {
      this.contactList = res.data;
      console.log(res)
    })
  }

}


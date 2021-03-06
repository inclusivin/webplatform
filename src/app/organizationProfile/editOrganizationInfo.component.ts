import {Component} from '@angular/core';
import {AppState} from '../app.service';
import {ProfileService} from './profile.service';
import {HTTP_PROVIDERS} from '@angular/http';

const util = require('util');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'editOrganizationInfo',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ...HTTP_PROVIDERS,ProfileService],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./profile.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./editOrganizationInfo.html')
})
export class EditOrganizationInfo {
  public name = '';
  public password= '';
  public nif ='';
  public location ='';
  public type ='';
  public field ='';
  public website ='';
  public address ='';
  public telephone ='';
  public fax='';
  public mail ='';

  // TypeScript public modifiers
  constructor(public appState: AppState,public profileService: ProfileService) {

  }

  ngOnInit() {
    console.log('hello `EditOrganizationInfo` component');
    //this.getMyProfile();
    // this.title.getData().subscribe(data => this.data = data);
  }

  getMyProfile(){
    this.profileService.getMyProfile().subscribe(
      (res) => {console.log(util.inspect(res));},
      (err) => {console.log(util.inspect(err));}
    );
  }

  setMyProfile(){
    this.profileService.setMyProfile(this.name,this.password,this.nif,this.location,this.type,
      this.field,this.website,this.address,this.telephone,this.fax,this.mail).subscribe(
      (res) => {
        console.log(util.inspect(res));
        window.location.href= '/#/organizationProfile';
      },
      (err) => {console.log(util.inspect(err));}
    );
  }
}

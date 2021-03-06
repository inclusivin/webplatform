import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

var Promise = require("bluebird");

var userId='';

@Injectable()
export class ProfileService {

  constructor(public http:Http){
    if (userId == '')
      this.getMyProfile().subscribe(
        (res) => {
          userId = res.user._id;
          console.log("DB "+res.user._id);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getMyProfile(){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/my_profile', options).map((res) => res.json());
  }


setMyProfile(email: String, password: String, username: String, location: String,deficiency: String,situation: String,certificate: String,skills: Array<String>) {
  let body = JSON.stringify({
      email: email,
      password: password,
      username: username,
      location: location,
      deficiency: deficiency,
      situation: situation,
      certificate: certificate,
      skills: skills
    });
   // console.log(body);
    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.post('/api/my_profile', body, options).map((res) => res.json());
  }


  setSkills(skills: Array<string>) {
    let body = JSON.stringify({
      skills: skills,
    });

    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.post('/api/my_skills', body, options).map((res) => res.json());
  }

  setAbout(about: string) {
    let body = JSON.stringify({
      about: about,
    });

    let headers = new Headers({'Content-Type': 'application/json','Authorization': 'JWT ' + localStorage.getItem('jwt') });
    let options = new RequestOptions({headers: headers});
    return this.http.post('/api/my_about', body, options).map((res) => res.json());
  }

  uploadImg(file: File){

   return new Promise((resolve, reject) => {
      let formData= new FormData();
      let xhr = new XMLHttpRequest();

      let fileName=userId+"."+file.type.split("/")[1];

     /* console.log(file.type.split("/")[1]);
     console.log(file.type.split("/")[0]);
     console.log(file.type.split("/").length);
*/

     formData.append("img",file,fileName);

      //console.log("FILENAME: "+fileName);
     //console.log("FILESSS: "+file.type+" dede: "+this.email);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open("POST", 'http://localhost:8080/api/upload_img', true);
    // xhr.setRequestHeader("Content-Type", "multipart/form-data");

     xhr.setRequestHeader('Authorization', 'JWT ' + localStorage.getItem('jwt'));

     xhr.send(formData);
    });
  }
}

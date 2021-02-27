import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { BlogMeFirebaseService } from '../_service/blog-me-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogModel: any = {
    title: '',
    imageUrl: '',
    type : '',
    detailOfBlog: ''
  }

  blogType = [{displayName:'Food',val:'food'},{displayName:'Travel',val:'travel'},{displayName: 'Sports', val : 'sports'},{displayName : 'Other', val :'other'}];

  constructor(private modalService: NgbModal,
    public router: Router,
    public firebaseService: BlogMeFirebaseService) {}

  ngOnInit() {
    this.firebaseService.getAll().subscribe(res => {
    },(error)=> {
      console.log(error.message);
    });
  }

  open(content) {
    this.modalService.open(content).result.then((res) => {
      //this.saveOnLocalStorage();
      this.saveOnFireBase();
      this.resetModal(this.blogModel);
      this.router.navigate(['/blogs']);
    }, (reason) => {});
  }

  saveOnLocalStorage() {
    let items = localStorage.getItem('blogs');
    let blogsInArray;
    if (items) {
      blogsInArray = JSON.parse(items);
      blogsInArray.push(this.blogModel);
    } else {
      blogsInArray = [];
      blogsInArray.push(this.blogModel);
    }
    localStorage.setItem('blogs', JSON.stringify(blogsInArray));
    
  }

  resetModal(obj) {
    var keys = Object.keys(obj);
    keys.forEach(key => {
      obj[key] = '';
    });
  }

  saveOnFireBase(){
    this.firebaseService.create(this.blogModel.type,this.blogModel);
  }

  makeCommentBoxBigger() {
    return document.getElementById('DetailOfBlog').style.height = "900px";

  }

  //  gotoblogs(itemsOnLocalStroge){
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: { itemsOnLocalStroge },
  //     skipLocationChange: false
  //   };
    
  //   this.router.navigate(['/blogs'],navigationExtras);
  // }

}

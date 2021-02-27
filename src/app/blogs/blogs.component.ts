import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogMeFirebaseService } from '../_service/blog-me-firebase.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogsData: any;
  categories = ['food','travel','sports','other'];

  allDataForCategoryRoot:any;
  displayData:any;
  constructor(public firebaseService : BlogMeFirebaseService, public activatedRoute: ActivatedRoute, public router: Router) { }

  
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (!params.category) {
        this.getDataForDisplay(undefined);
      } else {
        if (this.categories.includes(params.category)) {
          this.getDataForDisplay(params.category);
        } else {
          this.router.navigate(['/blogs']);
        }
      }
    }, (error) => {});

    this.getDataForDisplay('undefined');
  }

  getDataForDisplay(category) {
    this.firebaseService.getAll().subscribe((res: any[]) => {
      if (category) {
        let filter = res.filter(x => x.key == category);
        if (filter.length > 0) {
          this.blogsData = this.convertObjectOfObjectsToArrayOfObjects(filter[0].payload.val())
        }
      } else {
        let tempArray = [];
        res.forEach(element => {
          let arrayOfObjects = this.convertObjectOfObjectsToArrayOfObjects(element.payload.val());
          arrayOfObjects.forEach((obj) => {
            tempArray.push(obj);
          });
        });
        this.blogsData = tempArray;
      }
    }, (error) => {

    });
  }

  convertObjectOfObjectsToArrayOfObjects(data) {
    let aOO = Object.keys(data).map(key => {
      return data[key];
    });

    return aOO;
  }

}

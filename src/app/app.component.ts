/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation
} from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DocumentationService } from './services/documentation.service';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <sam-banner *ngIf="showBanner"></sam-banner>
    <header *ngIf="showHeader" class="usa-header site-header">
      <div class="usa-navbar site-header-navbar">
        <div class="usa-logo site-logo" id="logo" style="height:60px;margin-top:0;">
          <em class="usa-logo-text">
            <a routerLink="/" accesskey="1" title="Home" aria-label="Home" style="line-height:60px;">
            SAM Web Standards</a></em>
        </div>
      </div>
    </header>
    <main class="sticky-target-app">
      <div class="usa-grid">
        <aside class="usa-width-one-fourth">
          <nav sam-sticky [limit]="1200" [container]="'sticky-target-app'">
            <sam-sidenav [model]="sidenavConfig" (path)="resolveRoute($event)"></sam-sidenav>
          </nav>&nbsp;
        </aside>
        <div class="usa-width-three-fourths">
          <router-outlet></router-outlet>
        </div>
      </div>
    </main>
    <sam-alert-footer>
  `,
  providers: [DocumentationService]
})
export class AppComponent implements OnInit {

  sidenavConfig = {
      label: "test",
      children: [],
  };
  uikitList = {};
  staticpagelist = {};

  showBanner = false;
  showHeader = true;
  showUIKitHeader = false;
  showUIKitSearchHeader = false;
  constructor(private route: ActivatedRoute, private router: Router,
              private service: DocumentationService) {}
  resolveRoute(path){
    //console.log("click",path);
    if(path == "/"){
      
    } else {
      this.router.navigate([path]);
    }
  }
  public ngOnInit() {

    //sidenav config setup
    //DOCS is a global defined in webpack
    //console.log(STATICPAGES);
    for(var idx in DOCS){
      if(!this.uikitList[DOCS[idx]['section']]){
        this.uikitList[DOCS[idx]['section']] = [{
          label: DOCS[idx]['item'],
          route: DOCS[idx]['link']
        }];
      } else {
        this.uikitList[DOCS[idx]['section']].push({
          label: DOCS[idx]['item'],
          route: DOCS[idx]['link']
        });
      }
      
    }
    var x = this.uikitList;
    var test = Object.keys(this.uikitList).map(function(key){
      var list = x[key];
      return {
        label: key,
        route: "/",
        children: list
      };
    });
    this.sidenavConfig['children'] = test;
    //STATICPAGES is a global defined in webpack
    for(var idx in STATICPAGES){
      if(!this.staticpagelist[STATICPAGES[idx]['section']]){
        this.staticpagelist[STATICPAGES[idx]['section']] = [{
          label: STATICPAGES[idx]['item'],
          route: STATICPAGES[idx]['link']
        }];
      } else {
        this.staticpagelist[STATICPAGES[idx]['section']].push({
          label: STATICPAGES[idx]['item'],
          route: STATICPAGES[idx]['link']
        });
      }
    }
    var x = this.staticpagelist;
    var test2 = Object.keys(this.staticpagelist).map(function(key){
      var list = x[key];
      return {
        label: key,
        route: "/",
        children: list
      };
    }).sort(function(a,b){
      if(a.label=="Overview"){
        return -1;
      } else if (b.label=="Overview"){
        return 1;
      }
      if(a.label.charAt(0).toLowerCase()<b.label.charAt(0).toLowerCase()){
        return -1;
      } else if (a.label.charAt(0).toLowerCase()>b.label.charAt(0).toLowerCase()) {
        return 1;
      }
      return 0;
    });
    this.sidenavConfig['children'] =  test2.concat(this.sidenavConfig['children']);
    
    //handlers for specific routes
    this.router.events.subscribe( (event) => {
      if (event instanceof NavigationEnd) {
        if(event.url.match(/^\/components\/banner/)){
          this.showBanner = true;
        } else {
          this.showBanner = false;
        }
        if(event.url.match(/^\/components\/header/) || event.url.match(/^\/components\/search-header/)){
          this.showHeader = false;
          if(event.url.match(/^\/components\/header/)){
            this.showUIKitHeader = true;
          } else if(event.url.match(/^\/components\/search-header/)){
            this.showUIKitSearchHeader = true;
          }
        } else {
          this.showUIKitHeader = false;
          this.showHeader = true;
          this.showUIKitSearchHeader = false;
        }
      }
    });
  }
}
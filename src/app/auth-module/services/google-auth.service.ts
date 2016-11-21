import { Injectable } from '@angular/core';
import {AppStateService} from "../../shared/app-state.service";

@Injectable()
export class GoogleAuthService {

  private signInUrl: string;
  private redirectUrl: string;
  constructor(
      private appStateService: AppStateService
  ) {
    let OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
    let VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
    let SCOPE       =   'https://www.googleapis.com/auth/userinfo.profile';
    let CLIENTID    =   '1014694017193-a2vo8590blduvaui8vkr6ef6hr0jtkgh.apps.googleusercontent.com';

    let TYPE        =   'token';
    this.redirectUrl=   'http://localhost:4200/game/';
    this.signInUrl  =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + this.redirectUrl + '&response_type=' + TYPE;
  }

  login() {
    debugger;
    var win         =   window.open(this.signInUrl, "windowname1", 'width=800, height=600');

    var pollTimer   =   window.setInterval(function() {
      try {
        console.log(win.document.URL);
        if (win.document.URL.indexOf(this.redirectUrl) != -1) {
          window.clearInterval(pollTimer);
          var url =   win.document.URL;
          let acToken =   this.gup(url, 'access_token');
          let tokenType = this.gup(url, 'token_type');
          let expiresIn = this.gup(url, 'expires_in');
          win.close();

          this.validateToken(acToken);
        }
      } catch(e) {
      }
    }, 100);
  }

  validateToken(token) {

  }

  //credits: http://www.netlobo.com/url_query_string_javascript.html
  gup(url, name) {
    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
    var regexS = "[\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    if( results == null )
      return "";
    else
      return results[1];
  }


}

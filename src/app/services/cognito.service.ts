import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthenticationDetails, CognitoIdentityServiceProvider, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
import * as CognitoIdentity from "aws-sdk/clients/cognitoidentity";


export interface CognitoCallback {
  cognitoCallback(message:string, result:any);
}

export interface LoggedInCallback {
  isLoggedIn(message:string, loggedIn:boolean);
}


@Injectable()
export class CognitoService
{
  public static CLIENT_ID = environment.clientId;
  public static IDENTITY_POOL_ID = environment.identityPoolId;
  public static REGION = environment.region;
  public static USER_POOL_ID = environment.userPoolId;

  public static POOL_DATA = {
    UserPoolId:CognitoService.USER_POOL_ID,
    ClientId:CognitoService.CLIENT_ID
  };

  cognitoCredentials:AWS.CognitoIdentityCredentials;

  constructor() {
    console.log("CognitoService: constructor");
  }

  // This method takes in a raw jwtToken and uses the global AWS config options to build a
  // CognitoIdentityCredentials object and store it for us. It also returns the object to the caller
  // to avoid unnecessary calls to setCognitoCredentials.

  buildCognitoCredentials(idTokenJwt:string) {
    let url = 'cognito-idp.' + CognitoService.REGION.toLowerCase() + '.amazonaws.com/' + CognitoService.USER_POOL_ID;
    let logins:CognitoIdentity.LoginsMap = {};
    logins[url] = idTokenJwt;
    let params = {
      IdentityPoolId:CognitoService.IDENTITY_POOL_ID, /* required */
      Logins:logins
    };
    let creds = new AWS.CognitoIdentityCredentials(params);
    this.setCognitoCredentials(creds);
    return creds;
  }

  getAccessToken(callback:CognitoCallback) {

    if (callback == null) {
      throw ("CognitoService: callback is null");
    }

    if (this.getCurrentUser() != null) {
      this.getCurrentUser().getSession(function (err, session) {
        if (err) {
          callback.cognitoCallback(err, null);
        } else {
          if (session.isValid()) {
            callback.cognitoCallback(null, session.getAccessToken().getJwtToken());
          }
        }
      });
    } else {
      callback.cognitoCallback("No current user", null);
    }
  }

  getCognitoCredentials() {
    return this.cognitoCredentials;
  }

  getCognitoIdentity():string {
    return this.cognitoCredentials.identityId;
  }

  getCurrentUser() {
    return this.getUserPool().getCurrentUser();
  }

  getIdToken(callback:CognitoCallback) {

    if (callback == null) {
      throw ("CognitoService: callback is null");
    }

    if (this.getCurrentUser() != null) {
      this.getCurrentUser().getSession(function (err, session) {
        if (err) {
          callback.cognitoCallback(err, null);
        } else {
          if (session.isValid()) {
            callback.cognitoCallback(null, session.getIdToken().getJwtToken());
          } else {
            callback.cognitoCallback("Got the id token, but the session isn't valid", null);
          }
        }
      });
    } else {
      callback.cognitoCallback("No current user", null);
    }
  }

  getRefreshToken(callback:CognitoCallback) {

    if (callback == null) {
      throw ("CognitoService: callback is null");
    }

    if (this.getCurrentUser() != null) {
      this.getCurrentUser().getSession(function (err, session) {
        if (err) {
          callback.cognitoCallback(err, null);
        } else {
          if (session.isValid()) {
            callback.cognitoCallback(null, session.getRefreshToken());
          }
        }
      });
    } else {
      callback.cognitoCallback("No current user", null);
    }
  }

  getUserPool() {
    return new CognitoUserPool(CognitoService.POOL_DATA);
  }

  refresh() {
    this.getCurrentUser().getSession(function (err, session) {
      if (err) {
        console.log("CognitoService: " + err);
      } else {
        if (session.isValid()) {
          console.log("CognitoService: refreshed successfully");
        } else {
          console.log("CognitoService: refreshed but session is still not valid");
        }
      }
    });
  }

  setCognitoCredentials(creds:AWS.CognitoIdentityCredentials) {
    this.cognitoCredentials = creds;
  }
}
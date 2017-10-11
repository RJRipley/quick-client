import { Inject, Injectable } from "@angular/core";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { CognitoService, CognitoCallback, LoggedInCallback } from "./cognito.service";
import { DynamoDBService } from "./ddb.service";
import { User } from "../custom/user";
import * as AWS from "aws-sdk/global";
import * as STS from "aws-sdk/clients/sts";


@Injectable()
export class UserService
{
  constructor(public cognitoService:CognitoService, public ddb:DynamoDBService) {
    console.log("UserService: constructor");
  }

  authenticate(username:string, password:string, callback:CognitoCallback) {

    let authenticationData = {
      Username:username,
      Password:password,
    };
    let authenticationDetails = new AuthenticationDetails(authenticationData);

    let userData = {
      Username:username,
      Pool:this.cognitoService.getUserPool()
    };
    let cognitoUser = new CognitoUser(userData);

    var self = this;

    cognitoUser.authenticateUser(authenticationDetails, {

      newPasswordRequired:function (userAttributes, requiredAttributes) {
        callback.cognitoCallback('User needs to set password.', null);
      },
      onSuccess:function (result) {

        console.log("UserService: Authenticated");

        let creds = self.cognitoService.buildCognitoCredentials(result.getIdToken().getJwtToken());

        AWS.config.credentials = creds;

        // So, when CognitoIdentity authenticates a user, it doesn't actually hand us the IdentityID,
        // used by many of our other handlers. This is handled by some sly underhanded calls to AWS Cognito
        // API's by the SDK itself, automatically when the first AWS SDK request is made that requires our
        // security credentials. The identity is then injected directly into the credentials object.
        // If the first SDK call we make wants to use our IdentityID, we have a
        // chicken and egg problem on our hands. We resolve this problem by "priming" the AWS SDK by calling a
        // very innocuous API call that forces this behavior.

        let sts = new STS(); // Security Token Service
        sts.getCallerIdentity(function (err, data) {
          console.log("UserService: Successfully set the AWS credentials");
          callback.cognitoCallback(null, result);
        });
      },
      onFailure:function (err) {
        callback.cognitoCallback(err.message, null);
      },
    });
  }

  changePassword(user:User, callback:CognitoCallback):void {

    // User was signed up by an admin and must provide new password 
    // and required attributes, if any, to complete authentication.
 
    let authenticationData = {
      Username:user.email,
      Password:user.code
    };
    let authenticationDetails = new AuthenticationDetails(authenticationData);

    let userData = {
      Username:user.email,
      Pool:this.cognitoService.getUserPool()
    };
    let cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {

      newPasswordRequired:function (userAttributes, requiredAttributes) {

        // The api doesn't accept this field back
        delete userAttributes.email_verified;

        cognitoUser.completeNewPasswordChallenge(user.password, requiredAttributes, {
          onSuccess:function (result) {
            callback.cognitoCallback(null, userAttributes);
          },
          onFailure:function (err) {
            callback.cognitoCallback(err, null);
          }
        });
      },
      onSuccess:function (result) {
        callback.cognitoCallback(null, result);
      },
      onFailure:function (err) {
        callback.cognitoCallback(err, null);
      }
    });
  }

  confirmPassword(email:string, verificationCode:string, password:string, callback:CognitoCallback) {
    let userData = {
      Username:email,
      Pool:this.cognitoService.getUserPool()
    };

    let cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess:function () {
        callback.cognitoCallback(null, null);
      },
      onFailure:function (err) {
        callback.cognitoCallback(err.message, null);
      }
    });
  }

  confirmRegistration(name:string, code:string, callback:CognitoCallback) {

    let userData = {
      Username:name,
      Pool:this.cognitoService.getUserPool()
    };

    let cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
      } else {
        callback.cognitoCallback(null, result);
      }
    });
  }

  forgotPassword(username:string, callback:CognitoCallback) {
    let userData = {
      Username:username,
      Pool:this.cognitoService.getUserPool()
    };

    let cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
      onSuccess:function () {
        //
      },
      onFailure:function (err) {
        callback.cognitoCallback(err.message, null);
      },
      inputVerificationCode() {
        callback.cognitoCallback(null, null);
      }
    });
  }

  getParameters(callback:CognitoCallback) {
    
    let cognitoUser = this.cognitoService.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log("UserService: " + err);
        } else {
          cognitoUser.getUserAttributes(function (err, result) {
            if (err) {
              console.log("UserService: " + err);
            } else {
              callback.cognitoCallback(null, result);
            }
          });
        }
      });
    } else {
      callback.cognitoCallback("No current user", null);
    }
  }

  isAuthenticated(callback:LoggedInCallback) {

    if (callback == null) {
      throw ("UserService: callback is null");
    }

    let cognitoUser = this.cognitoService.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log("UserService: " + err, err.stack);
          callback.isLoggedIn(err, false);
        } else {
          callback.isLoggedIn(err, session.isValid());
        }
      });
    } else {
      callback.isLoggedIn("Can't retrieve the CurrentUser", false);
    }
  }

  logout() {
    console.log("UserService: Logging out");
    this.ddb.writeLogEntry("logout");
    this.cognitoService.getCurrentUser().signOut();
  }

  register(user:User, callback:CognitoCallback):void {

    let attributeList = [];

    let dataEmail = {
      Name:'email',
      Value:user.email
    };

    let dataNickname = {
      Name:'nickname',
      Value:user.name
    };

    attributeList.push(new CognitoUserAttribute(dataEmail));
    attributeList.push(new CognitoUserAttribute(dataNickname));

    this.cognitoService.getUserPool().signUp(user.email, user.password, attributeList, null, function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
      } else {
        callback.cognitoCallback(null, result);
      }
    });
  }

  resendCode(name:string, callback:CognitoCallback):void {

    let userData = {
      Username:name,
      Pool:this.cognitoService.getUserPool()
    };

    let cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null);
      } else {
        callback.cognitoCallback(null, result);
      }
    });
  }
}
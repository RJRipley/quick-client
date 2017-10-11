import { Injectable } from "@angular/core";
import { CognitoService } from "./cognito.service";
import { environment } from "../../environments/environment";
import * as AWS from "aws-sdk/global";
import * as DynamoDB from "aws-sdk/clients/dynamodb";


@Injectable()
export class DynamoDBService
{
  constructor(public cognitoService:CognitoService) {
    console.log("DynamoDBService: constructor");
  }

  getAWS() {
    return AWS;
  }

  getLogEntries() {
    var params = {
      TableName:environment.ddbTableName,
      KeyConditionExpression:"userId = :userId",
      ExpressionAttributeValues:{ ":userId":this.cognitoService.getCognitoIdentity() }
    };

    var docClient = new DynamoDB.DocumentClient();
    docClient.query(params, onQuery);

    function onQuery(err, data) {
      if (err) {
        console.error("DynamoDBService: ", JSON.stringify(err, null, 2));
      } else {
        data.Items.forEach(function (logitem) {
          // TODO:
        });
      }
    }
  }

  write(data:string, date:string, type:string) {

    console.log("DynamoDBService: Writing " + type + " entry");

    var DDB = new DynamoDB({ params:{ TableName:environment.ddbTableName }});

    // Write the item to the table
    var itemParams =
      {
        TableName:environment.ddbTableName,
        Item:{
          userId:{ S:data },
          activityDate:{ S:date },
          type:{ S:type }
        }
      };

    DDB.putItem(itemParams, function (result) {
      //
    });
  }

  writeLogEntry(type:string) {
    try {
      let date = new Date().toString();
      this.write(this.cognitoService.getCognitoIdentity(), date, type);
    } catch (exc) {
      console.log("DynamoDBService: Couldn't write to DDB");
    }
  }
}



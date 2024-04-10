// export const handler = async (event) => {
//   // TODO implement
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify('Hello from Lambda!'),
//   };
//   return response;
// };

import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { nanoid } from "nanoid";

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    // const body = JSON.parse(event.body || "{}");
    const { input_text, input_file_path } = event;

    const putItemCommand = new PutItemCommand({
      TableName: "archit-db",
      Item: {
        id: { S: nanoid() },
        input_text: { S: input_text },
        file_path: { S: input_file_path },
      },
    });

    await dynamoDBClient.send(putItemCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data saved successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error saving data", error }),
    };
  }
};

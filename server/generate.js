import openaiClient from './api.js';

const generate = async(queryDescription) => {
    const response = await openaiClient.chatCompletion({
        provider: "novita",
        model: "deepseek-ai/DeepSeek-V3-0324",
        messages: [
            {
                role : "system",
                content : "You are a SQL query generator. You will be given a description of a SQL query and you will generate the SQL query for it. You will not give any explanation or comments. You will only generate the SQL query."
            },
            {
                role : "user",
                content : ` just Generate a SQL query for the following description donot give any explanation the output should generate only the query that is ready to copy paste, remove all the comments and extra spaces, and make sure to use the correct syntax for the SQL query, Remove the backticks and sql as well. The description is: ${queryDescription}.`
            }
        ],
    });
    return response.choices[0].message.content;
}

export default generate;
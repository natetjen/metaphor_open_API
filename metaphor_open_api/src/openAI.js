import axios from 'axios';
import openai from 'openai';
import { Configuration, OpenAIApi } from "openai";



// async function getChatGBTSummary() {

//   // const configuration = new Configuration({
//   //   apiKey: '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',
//   // });
//   const openai = new OpenAIApi({
//     apiKey: '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'
//   });

//   // const response = await openai.createCompletion({
//   //   model: "text-davinci-003",
//   //   prompt: 'Make me a story',
//   //   temperature: 0,
//   //   max_tokens:100
//   // })

async function getChatGBTSummary(prompt, callback) {
  const apiKey = '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';

  const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

  // let prompt= 'Write a story about a brave knight.'

  console.log(`Bearer ${apiKey}`, 'i want to check thisss')

  var option = {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }}

  var data = {
    "messages": [{"role": "user", "content": prompt}],
    "model": "gpt-3.5-turbo",
    "temperature": 0.7,
    "max_tokens": 300,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
  };

  axios.post(API_ENDPOINT, data, option)
      .then(result => {callback(result.data.choices[0].message.content);})
      .catch(err => console.error('error is: ', err))
}
export {getChatGBTSummary}
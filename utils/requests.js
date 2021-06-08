/*
Copyright 2019, Cachengo, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


import { CACHENGO_API_URL } from './Constants';


export const headers = {	
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const checkResStatus = response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
  
export async function postJSON(url, data, api=CACHENGO_API_URL){
    const body = JSON.stringify(data)

    const options = {
        headers: {...headers},
        method: 'POST',
        body: body,
        credentials: 'include',
    }

    return fetch(`${api}/${url}`, 
        options
    ).then(checkResStatus)
    .then(res => res.json())
        .catch(err => {
            //Add isError to the err and set it to true so to know if the response is an error or not
            err.isError = true
            if (!err.response) {
                console.log('error', err)
            }
            return err
        })
}  
 
export async function getJSON(url, api=CACHENGO_API_URL) {
    return getResponse(url, api).then(res => res.json() || res)
}  
 
export async function postJSONwErrHandler(url, data, errorHandler, api=CACHENGO_API_URL) {
    const body = JSON.stringify(data)
    const options = {
        headers: {...headers},
        method: 'POST',
        body: body,
        credentials: 'include',
    }

    return fetch(`${api}/${url}`,
        options
    ).then(checkResStatus)
    .then(res => res.json())
        .catch(err => {
            if (errorHandler !== undefined && err.response) {
                return err.response.json().then(res => errorHandler(res));
            }
            console.log('err', err);
        });
}

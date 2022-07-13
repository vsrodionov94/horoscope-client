import {
} from "../types";


class Api {
  private url: string;
  private headers: { "Content-type": string; };

  constructor(config: { url: string, headers: { "Content-type": string } }) {
    this.url = config.url;
    this.headers = config.headers;
  }

  private handleResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  // public checkUser(data: CheckUserRequest): Promise<CheckUserResponse> {
  //   return fetch(`${this.url}/checkUser`, {
  //     headers: this.headers,
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   }).then(this.handleResponseData);
  // }
}

const api = new Api({
  url: process.env.API,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
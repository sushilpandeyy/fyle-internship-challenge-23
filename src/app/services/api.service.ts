import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Octokit } from "octokit";

interface IssueInfo {
  title: string;
  authorID: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private octokit: Octokit;

  constructor(private httpClient: HttpClient) {
    this.octokit = new Octokit({ 
      auth: ""
    });
  }

  async getUser(username: string){
    try {
        const response = await this.octokit.request<any>(`GET /users/${username}`);
        const userData = response.data;
            return userData;
    } catch (error:any) {
        console.error(`Error fetching user data for ${username}: ${error.message}`);
        throw error;
    }
}


  async getReposForUser(username: string, page: number = 1, perPage: number = 10) {
    try {
      const response = await this.octokit.request<any>('GET /users/{username}/repos', {
        username: username,
        page: page,
        per_page: perPage
      });
      const data = response.data;

      return data;
    } catch (error :any) {
      console.log(`Error fetching repositories: ${error.message}`);
      throw error;
    }
  }
}

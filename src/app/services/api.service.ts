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

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  async getIssues(owner: string, repo: string) {
    try {
      const result = await this.octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: owner,
        repo: repo,
      });

      const titleAndAuthor: IssueInfo[] = result.data.map(issue => ({
        title: issue.title,
        authorID: issue.user?.id ?? -1 
      }));
      console.log(titleAndAuthor);

      return titleAndAuthor; 
    } catch (error :any) {
      console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`);
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
      console.log(data);

      return data;
    } catch (error :any) {
      console.log(`Error fetching repositories: ${error.message}`);
      throw error;
    }
  }
}

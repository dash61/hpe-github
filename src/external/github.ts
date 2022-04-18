import "../secrets.json";

export interface IGithubUser {
  avatar_url: string;
  location: string;
  login: string;
  name: string;
  public_repos: number;
  repos_url: string;
  url: string;
}

export interface IGithubRepo {
  description: string;
  language: string;
  name: string;
  stargazers_count: number;
  svn_url: string;
}


export async function getUserData(user: string): Promise<IGithubUser | undefined> {
  try {
    const req: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `username:${TOKEN}`
      },
      method: "GET",
    };
    const rsp = await fetch(`https://api.github.com/users/${user}`, req);
    if (rsp.status === 200) {
        return await rsp.json();
    }
  } catch (err: unknown) {
    const errMsg = (err as Error)?.message;
    console.log("getting user data - EXCEPTION - err=", errMsg);
  }
  return undefined;
}

export async function getUserRepos(user: string, page: number, maxRepos = 5): Promise<IGithubRepo[]> {
  try {
    const req: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `username:${TOKEN}`
      },
      method: "GET",
    };
    const rsp = await fetch(`https://api.github.com/users/${user}/repos?page=${page}&per_page=${maxRepos}`, req);
    if (rsp.status === 200) {
        return await rsp.json();
    }
  } catch (err: unknown) {
    const errMsg = (err as Error)?.message;
    console.log("getting user repos - EXCEPTION - err=", errMsg);
  }
  return [];
}

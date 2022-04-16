export interface IGithubUser {
  avatar_url: string;
  name: string;
  login: string;
  url: string;
  repos_url: string;
  location: string;
}

export async function getUserData(user: string): Promise<IGithubUser | undefined> {
  console.log("going to get user=", user);
  
  const req: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.github.v3+json",
    },
    method: "GET",
  };
  const rsp = await fetch(`https://api.github.com/users/${user}`, req);
  if (rsp.status === 200) {
      const jsonResults = await rsp.json();

      console.log("jsonResults=", jsonResults);
      return jsonResults; // as P[];
  }
  return undefined;
}

export async function getUserRepos(user: string): Promise<[]> {
  console.log("going to get user=", user);
  
  const req: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.github.v3+json",
    },
    method: "GET",
  };
  const rsp = await fetch(`https://api.github.com/users/${user}/repos`, req);
  if (rsp.status === 200) {
      const jsonResults: any = await rsp.json();

      console.log("jsonResults=", jsonResults);
      return jsonResults; // as P[];
  }
  return [];
}

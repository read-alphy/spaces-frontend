"use client"
import { useEffect, useState } from "react";
import { login } from "../auth";
import { HOST, SpaceDetail } from "@/utils";

interface Space {
  id: string;
  title: string;
  creator_name: string;
}

export default function Home() {
  const [spaces, setSpaces] = useState<Array<SpaceDetail> | null>(null);
  const [inputValue, setInputValue] = useState("");

  // const router = useRouter();
  
  useEffect(() => {
    const getSpaces = async () => {
      // TODO limit offset
      console.log("fetching spaces")
      const resp = await fetch(`${HOST}/sp?in_progress=true`, {
        credentials: "include",
      });
      if (resp.status !== 200) {
        console.log("Error fetching spaces");
        return null;
      }
      const data = await resp.json();
      console.log("got spaces", data);
      return data;
    };
    if (spaces === null) getSpaces().then(setSpaces);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted value:", inputValue);
    const resp = await fetch(`${HOST}/sp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputValue, notify: true }),
    })
    setInputValue("");
    if (resp.status !== 200) {
      console.log("Error submitting space");
      console.log(await resp.json())
      return null;
    }
    const data = await resp.json();
    console.log("submitted space", data);
    // DID NOT WORK
    // router.push(`/sp/${data.id}`)
  };

  return (
    <>
      <h1><a href="/">Home</a></h1>
      <h2>Welcome to twspace downloader</h2>
      <p>If needed, <button onClick={login}>Google Login</button></p>
      <form onSubmit={handleSubmit}>
        <label>
          Input value:
          <input type="text" placeholder="https://twitter.com/i/spaces/<space_id>" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <h3>Latest downloaded spaces</h3>
      {spaces ? (
        <>
          {spaces.map((space) => (
            <div key={space.id}>
              <h3><a href={`/sp/${space.id}`}>{space.title}</a></h3>
              <p>Creator: {space.creator_name}</p>
              <p>ID: {space.id}</p>
            </div>
          ))}
        </>
      ): <p>Fetching spaces...</p>}

      
    </>
  );
}

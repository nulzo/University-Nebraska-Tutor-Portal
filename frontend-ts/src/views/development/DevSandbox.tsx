import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DevSandbox() {
  const [count, setCount] = useState(1);
  const [data, setData] = useState({ name: "", img: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPokes();
  }, [count]);

  function getPokes() {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${count}`)
      .then((res) => {
        console.log(res);
        setData({ name: res.data.name, img: res.data.sprites.front_default });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  if (!loading) {
    console.log(data, count);
    return (
      <div>
        <Button
          disabled={count < 2}
          className="link"
          onClick={() => setCount((c) => c - 1)}
        >
          Prev
        </Button>
        <Button className="link" onClick={() => setCount((c) => c + 1)}>
          Next
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>
              Pokemon: #{count} - {data.name}
            </CardTitle>
            <CardDescription>Weight:</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={data.img} alt="sprite"></img>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    console.log("Loading...");
    return <div>Loading...</div>;
  }
}

"use client";

import useDebouce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import Input from "./input";

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounceValue = useDebouce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debounceValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debounceValue, router]);

  return (
    <Input
      placeholder="what do you want to listen to ?"
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

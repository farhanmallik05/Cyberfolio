"use client";

import dynamic from "next/dynamic";

const Giscus = dynamic(() => import("./Giscus"), { ssr: false });

export function BlogComments() {
    return <Giscus />;
}

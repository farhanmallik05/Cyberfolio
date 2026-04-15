import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "./index";

interface CustomMDXProps {
    source: string;
}

export function CustomMDX({ source }: CustomMDXProps) {
    return (
        <MDXRemote 
            source={source} 
            components={MDXComponents}
        />
    );
}

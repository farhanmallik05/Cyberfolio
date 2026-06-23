import { Callout } from "./Callout";
import Link from "next/link";
import Image from "next/image";

export const MDXComponents = {
    Callout,
    // Native overrides
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: (props: any) => <h1 className="text-3xl font-orbitron font-bold text-mech-white mt-12 mb-6" {...props} />,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: (props: any) => <h2 className="text-2xl font-orbitron font-bold text-mech-white mt-10 mb-4" {...props} />,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: (props: any) => <h3 className="text-xl font-orbitron font-bold text-mech-cyan mt-8 mb-4 border-l-2 border-mech-cyan pl-4" {...props} />,
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p: (props: any) => <p className="font-reajdhani text-lg text-mech-silver leading-relaxed mb-6" {...props} />,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ul: (props: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-mech-silver" {...props} />,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ol: (props: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-mech-silver" {...props} />,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
    li: (props: any) => <li className="font-rajdhani text-lg" {...props} />,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-mech-silver/20 pl-6 italic my-8 text-mech-silver/80" {...props} />
    ),
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code: (props: any) => (
        <code className="bg-mech-base/50 border border-mech-silver/10 px-1.5 py-0.5 rounded text-mech-cyan font-mono text-sm" {...props} />
    ),
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pre: (props: any) => (
        <pre className="bg-mech-base border border-mech-silver/10 p-4 rounded-sm my-8 overflow-x-auto" {...props} />
    ),
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
    a: (props: any) => (
        <Link className="text-mech-cyan hover:underline decoration-mech-cyan/30 underline-offset-4" {...props} />
    ),
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: (props: any) => (
        <div className="my-10">
            <Image 
                src={props.src} 
                alt={props.alt || ""} 
                width={800} 
                height={500} 
                className="rounded-sm border border-mech-silver/10"
            />
            {props.alt && (
                <p className="text-center text-xs font-rajdhani text-mech-silver/50 mt-2 uppercase tracking-widest">{props.alt}</p>
            )}
        </div>
    )
};

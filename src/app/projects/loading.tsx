export default function Loading() {
    return (
        <div className="min-h-[70vh] pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-primary font-orbitron animate-pulse uppercase tracking-widest text-xs">Accessing Databanks...</p>
        </div>
    );
}

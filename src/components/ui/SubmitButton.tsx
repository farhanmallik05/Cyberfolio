"use client";

import { useFormStatus } from "react-dom";
import { NeonButton, NeonButtonProps } from "./NeonButton";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends Omit<NeonButtonProps, 'children'> {
    children: React.ReactNode;
    loadingText?: string;
}

export function SubmitButton({ children, loadingText = "PROCESSING...", variant, className, ...props }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <NeonButton 
            variant={variant} 
            className={className} 
            disabled={pending || props.disabled}
            {...props}
        >
            {pending ? (
                <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {loadingText}
                </div>
            ) : (
                children
            )}
        </NeonButton>
    );
}

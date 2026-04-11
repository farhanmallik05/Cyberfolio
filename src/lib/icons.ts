import { 
    Github, 
    Linkedin, 
    Twitter, 
    Youtube, 
    Instagram, 
    MessageSquare, 
    Heart, 
    Coffee, 
    Globe, 
    Link as LinkIcon,
    Mail,
    Codepen,
    FileText,
    Pin,
    HelpCircle,
    LayoutGrid,
    Palette,
    Share2,
    Database,
    Cloud,
    CreditCard,
    DollarSign,
    Zap,
    LucideIcon
} from "lucide-react";

/**
 * Maps platform names or URLs to their corresponding Lucide icons for consistency across the site.
 */
export const getIconForPlatform = (title: string): LucideIcon => {
    const t = title.toLowerCase();
    
    // Developer & Coding
    if (t.includes("github")) return Github;
    if (t.includes("codepen")) return Codepen;
    if (t.includes("dev.to") || t.includes("devto")) return Zap;
    if (t.includes("hashnode")) return Database;
    if (t.includes("stack overflow")) return Database;
    
    // Professional & Social
    if (t.includes("linkedin")) return Linkedin;
    if (t.includes("twitter") || t.includes("x.com")) return Twitter;
    if (t.includes("instagram")) return Instagram;
    if (t.includes("threads")) return Share2;
    if (t.includes("mastodon")) return Share2;
    
    // Creative & Design
    if (t.includes("behance")) return LayoutGrid;
    if (t.includes("dribbble")) return Palette;
    if (t.includes("figma")) return Palette;
    if (t.includes("pinterest")) return Pin;
    
    // Content & Publishing
    if (t.includes("youtube")) return Youtube;
    if (t.includes("medium")) return FileText;
    if (t.includes("quora")) return HelpCircle;
    
    // Support & Finance
    if (t.includes("coffee") || t.includes("buymeacoffee")) return Coffee;
    if (t.includes("patreon") || t.includes("donate") || t.includes("ko-fi")) return Heart;
    if (t.includes("paypal")) return CreditCard;
    if (t.includes("stripe")) return DollarSign;
    
    // Communication & Web
    if (t.includes("discord")) return MessageSquare;
    if (t.includes("slack")) return MessageSquare;
    if (t.includes("mail") || t.includes("@")) return Mail;
    if (t.includes("globe") || t.includes("portfolio") || t.includes("website")) return Globe;
    if (t.includes("cloud")) return Cloud;
    
    return LinkIcon;
};

'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import styles from './BioVideoPulse.module.css';

interface BioVideoPulseProps {
    /** Path to .mp4 file or Loom share URL */
    src: string;
    /** Optional poster image */
    poster?: string;
    /** 'native' for .mp4, 'loom' for Loom embeds */
    type?: 'native' | 'loom';
}

export default function BioVideoPulse({ src, poster, type = 'native' }: BioVideoPulseProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // For Loom: convert share URL to embed URL
    const loomEmbedUrl = type === 'loom' 
        ? src.replace('loom.com/share/', 'loom.com/embed/')
        : '';

    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, []);

    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    }, []);

    const handleFullscreen = useCallback(() => {
        if (!videoRef.current) return;
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        }
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100);
            }
        };

        const handleEnd = () => setIsPlaying(false);

        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('ended', handleEnd);
        return () => {
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('ended', handleEnd);
        };
    }, []);

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current || !progressRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = ratio * videoRef.current.duration;
    };

    return (
        <div className="w-full space-y-4">
            {/* Section Header */}
            <h3 className="font-orbitron text-sm text-white flex items-center gap-3 tracking-[0.2em] uppercase">
                <span className="w-8 h-[1px] bg-mech-cyan/50" />
                Video_Transmission
                <span className="w-8 h-[1px] bg-mech-cyan/50" />
            </h3>

            {/* Video Container */}
            <div 
                className="relative rounded overflow-hidden border border-mech-silver/10 group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Animated Pulse Rings */}
                <div className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-700 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                    <div className={`absolute inset-0 border border-mech-cyan/20 animate-pulse rounded ${styles.pulseRing1}`} />
                    <div className={styles.pulseRing2} />
                </div>

                {/* Corner Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-mech-cyan/40 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-mech-cyan/40 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-mech-cyan/40 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-mech-cyan/40 z-20 pointer-events-none" />

                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[size:100%_4px] z-10 pointer-events-none" />

                {/* Status Dot */}
                <div className="absolute top-4 right-4 z-30 flex items-center gap-2 pointer-events-none">
                    <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-mech-silver/30'}`} />
                    <span className="font-mono text-[8px] text-mech-silver/40 tracking-widest uppercase">
                        {isPlaying ? 'LIVE' : 'STANDBY'}
                    </span>
                </div>

                {type === 'native' ? (
                    <>
                        <video
                            ref={videoRef}
                            src={src}
                            poster={poster}
                            muted={isMuted}
                            playsInline
                            className="w-full aspect-video object-cover"
                            onClick={togglePlay}
                        />

                        {/* Big Center Play Button (shown when paused) */}
                        {!isPlaying && (
                            <motion.button
                                onClick={togglePlay}
                                className="absolute inset-0 z-20 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                title="Play video"
                            >
                                <div className="w-16 h-16 rounded-full border-2 border-mech-cyan/60 bg-mech-base/80 flex items-center justify-center backdrop-blur-sm hover:border-mech-cyan hover:shadow-[0_0_30px_rgba(15,211,255,0.3)] transition-all">
                                    <Play className="w-6 h-6 text-mech-cyan ml-1" />
                                </div>
                            </motion.button>
                        )}

                        {/* Controls Bar */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 z-30 bg-mech-base/90 backdrop-blur-sm border-t border-mech-silver/10 px-4 py-2"
                            initial={false}
                            animate={{ opacity: isHovered || !isPlaying ? 1 : 0, y: isHovered || !isPlaying ? 0 : 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Progress Bar */}
                            <div 
                                ref={progressRef}
                                className="w-full h-1 bg-mech-silver/10 rounded-full cursor-pointer mb-2 group/progress"
                                onClick={handleProgressClick}
                            >
                                <div 
                                    className={styles.progressBar}
                                    /* eslint-disable-next-line react/no-inline-styles */
                                    style={{ 
                                        '--progress': `${progress}%`
                                    } as React.CSSProperties}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-mech-cyan shadow-[0_0_8px_rgba(15,211,255,0.8)] opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                                </div>
                            </div>

                            {/* Control Buttons */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={togglePlay} 
                                        className="text-mech-silver hover:text-mech-cyan transition-colors" 
                                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                                        title={isPlaying ? 'Pause' : 'Play'}
                                    >
                                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    </button>
                                    <button 
                                        onClick={toggleMute} 
                                        className="text-mech-silver hover:text-mech-cyan transition-colors" 
                                        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                                        title={isMuted ? 'Unmute' : 'Mute'}
                                    >
                                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                    </button>
                                </div>
                                <button 
                                    onClick={handleFullscreen} 
                                    className="text-mech-silver hover:text-mech-cyan transition-colors" 
                                    aria-label="Enter fullscreen"
                                    title="Fullscreen"
                                >
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                ) : (
                    /* Loom Embed */
                    <div className="aspect-video">
                        <iframe
                            src={loomEmbedUrl}
                            className="w-full h-full"
                            allowFullScreen
                            title="Video Introduction"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

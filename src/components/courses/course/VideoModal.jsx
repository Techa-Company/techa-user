'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, Volume2, VolumeX, Fullscreen, Clock, Gauge } from 'lucide-react'

const VideoModal = ({ isOpen, setIsOpen, videoUrl }) => {
    const videoRef = useRef(null)
    const containerRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(1)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isControlsVisible, setIsControlsVisible] = useState(true)
    const [isBuffering, setIsBuffering] = useState(false)

    // Video control functions
    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play()
            setIsPlaying(true)
        } else {
            videoRef.current.pause()
            setIsPlaying(false)
        }
    }

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime)
        setDuration(videoRef.current.duration)
    }

    const handleProgressClick = (e) => {
        const rect = e.target.getBoundingClientRect()
        const pos = (e.clientX - rect.left) / rect.width
        videoRef.current.currentTime = pos * duration
    }

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value
        videoRef.current.volume = newVolume
        setVolume(newVolume)
        setIsMuted(newVolume === 0)
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case ' ':
                    togglePlay()
                    break
                case 'ArrowRight':
                    videoRef.current.currentTime += 5
                    break
                case 'ArrowLeft':
                    videoRef.current.currentTime -= 5
                    break
                case 'ArrowUp':
                    setVolume(Math.min(volume + 0.1, 1))
                    break
                case 'ArrowDown':
                    setVolume(Math.max(volume - 0.1, 0))
                    break
                case 'Escape':
                    setIsOpen(false)
                    break
            }
        }

        document.addEventListener('keydown', handleKeyPress)
        return () => document.removeEventListener('keydown', handleKeyPress)
    }, [volume])

    // Time formatting
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    dir='ltr'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
                    ref={containerRef}
                    onMouseMove={() => setIsControlsVisible(true)}
                    onMouseLeave={() => setIsControlsVisible(false)}
                >
                    <div className="relative w-full max-w-6xl aspect-video group">
                        {/* Video element */}
                        <video
                            ref={videoRef}
                            autoPlay
                            controls={false}
                            onTimeUpdate={handleTimeUpdate}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onWaiting={() => setIsBuffering(true)}
                            onCanPlay={() => setIsBuffering(false)}
                            className="w-full h-full rounded-xl shadow-2xl"
                        >
                            <source src={videoUrl} type="video/mp4" />
                        </video>

                        {/* Loading spinner */}
                        <AnimatePresence>
                            {isBuffering && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/50"
                                >
                                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Custom controls */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isControlsVisible ? 1 : 0 }}
                            className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                        >
                            {/* Top controls */}
                            <div className="flex justify-between items-start">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-all"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>

                                <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-full">
                                    <Gauge className="w-5 h-5 text-white" />
                                    <select
                                        value={playbackRate}
                                        onChange={(e) => {
                                            videoRef.current.playbackRate = e.target.value
                                            setPlaybackRate(e.target.value)
                                        }}
                                        className="bg-transparent text-white outline-none"
                                    >
                                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                                            <option key={speed} value={speed}>
                                                {speed}x
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Bottom controls */}
                            <div className="space-y-4">
                                {/* Progress bar */}
                                <div
                                    className="h-2 bg-white/20 rounded-full cursor-pointer"
                                    onClick={handleProgressClick}
                                >
                                    <div
                                        className="h-full bg-emerald-500 rounded-full relative"
                                        style={{ width: `${(currentTime / duration) * 100}%` }}
                                    >
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full absolute -right-1.5 -top-0.5 shadow-lg" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    {/* Left controls */}
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={togglePlay}
                                            className="p-2 hover:bg-white/10 rounded-full"
                                        >
                                            {isPlaying ? (
                                                <Pause className="w-7 h-7 text-white fill-white" />
                                            ) : (
                                                <Play className="w-7 h-7 text-white fill-white" />
                                            )}
                                        </button>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    videoRef.current.muted = !isMuted
                                                    setIsMuted(!isMuted)
                                                }}
                                                className="p-1.5 hover:bg-white/10 rounded-full"
                                            >
                                                {isMuted ? (
                                                    <VolumeX className="w-5 h-5 text-white" />
                                                ) : (
                                                    <Volume2 className="w-5 h-5 text-white" />
                                                )}
                                            </button>

                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className="w-24 h-1 accent-emerald-500"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 text-white text-sm">
                                            <Clock className="w-4 h-4" />
                                            <span>
                                                {formatTime(currentTime)} / {formatTime(duration)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right controls */}
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={toggleFullscreen}
                                            className="p-1.5 hover:bg-white/10 rounded-full"
                                        >
                                            <Fullscreen className="w-5 h-5 text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default VideoModal